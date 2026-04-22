/**
 * Admin meta-tag REST endpoints — Issue #353 (§9, §10)
 *
 * Routes:
 *   GET  /api/admin/channels/:channelId/meta-tags
 *   PUT  /api/admin/channels/:channelId/meta-tags
 *   POST /api/admin/channels/:channelId/meta-tags/jobs
 *   GET  /api/admin/channels/:channelId/meta-tags/jobs/:jobId
 *
 * Authorization: server admin only (ADMIN or OWNER role on the channel's server).
 */

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { requireAuth, type AuthenticatedRequest } from '../middleware/auth.middleware';
import { metaTagRepository } from '../repositories/metaTag.repository';
import { permissionService } from '../services/permission.service';
import { prisma } from '../db/prisma';
import { redis } from '../db/redis';
import { createLogger } from '../lib/logger';
import type { MetaTagPreview, MetaTagJobStatus } from '../services/metaTag/types';

const logger = createLogger({ component: 'admin-meta-tag-router' });

const BASE_URL = process.env.BASE_URL ?? 'https://harmony.chat';

// ─── Validation schemas ───────────────────────────────────────────────────────

const metaTagOverrideSchema = z.object({
  customTitle: z.string().max(70).optional().nullable(),
  customDescription: z.string().max(200).optional().nullable(),
  customOgImage: z.string().url().max(500).optional().nullable(),
});

// ─── Redis job helpers ────────────────────────────────────────────────────────

const JOB_TTL_SECONDS = 86400; // 24 hours
const IDEMPOTENCY_TTL_SECONDS = 60;

function jobKey(jobId: string): string {
  return `meta-tag:job:${jobId}`;
}

function idempotencyKey(channelId: string, key: string): string {
  return `meta-tag:idempotency:${channelId}:${key}`;
}

async function storeJob(job: MetaTagJobStatus): Promise<void> {
  await redis.set(jobKey(job.jobId), JSON.stringify(job), 'EX', JOB_TTL_SECONDS);
}

async function getJob(jobId: string): Promise<MetaTagJobStatus | null> {
  const raw = await redis.get(jobKey(jobId));
  if (!raw) return null;
  return JSON.parse(raw) as MetaTagJobStatus;
}

async function getIdempotentJobId(channelId: string, key: string): Promise<string | null> {
  return redis.get(idempotencyKey(channelId, key));
}

async function storeIdempotentJobId(channelId: string, key: string, jobId: string): Promise<void> {
  await redis.set(idempotencyKey(channelId, key), jobId, 'EX', IDEMPOTENCY_TTL_SECONDS);
}

// ─── Admin authorization middleware ──────────────────────────────────────────

/**
 * Verifies that the authenticated user is a server admin (ADMIN or OWNER role)
 * for the server that owns the requested channel.
 *
 * Attaches `req.serverId` to the request for downstream handlers.
 * Responds 404 if the channel does not exist; 403 if the user lacks the role.
 */
async function requireServerAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { channelId } = req.params;
  const userId = (req as AuthenticatedRequest).userId;

  try {
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      select: { id: true, serverId: true },
    });

    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
      return;
    }

    // channel:manage_visibility is held by ADMIN and OWNER roles only
    const allowed = await permissionService.checkPermission(
      userId,
      channel.serverId,
      'channel:manage_visibility',
    );

    if (!allowed) {
      res.status(403).json({ error: 'Server admin role required' });
      return;
    }

    (req as Request & { serverId: string }).serverId = channel.serverId;
    next();
  } catch (err) {
    logger.error({ err, channelId, userId }, 'Admin auth check failed');
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── Preview builder ──────────────────────────────────────────────────────────

function buildPreview(
  record: NonNullable<Awaited<ReturnType<typeof metaTagRepository.findByChannelId>>>,
): MetaTagPreview {
  const isCustom = Boolean(record.customTitle ?? record.customDescription ?? record.customOgImage);
  const title = record.customTitle ?? record.title;
  const description = record.customDescription ?? record.description;
  const ogTitle = record.customTitle ?? record.ogTitle;
  const ogDescription = record.customDescription ?? record.ogDescription;
  const ogImage = record.customOgImage ?? record.ogImage ?? '';
  const keywords = record.keywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    keywords,
    generatedAt: record.generatedAt.toISOString(),
    isCustom,
    searchPreview: { title, description, url: `${BASE_URL}/channels/${record.channelId}` },
    socialPreview: { title: ogTitle, description: ogDescription, image: ogImage },
  };
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const adminMetaTagRouter = Router();

// All routes require authentication
adminMetaTagRouter.use(requireAuth);

/**
 * GET /api/admin/channels/:channelId/meta-tags
 * Returns the current effective meta tags for the channel as a preview.
 */
adminMetaTagRouter.get(
  '/channels/:channelId/meta-tags',
  requireServerAdmin,
  async (req: Request, res: Response) => {
    try {
      const { channelId } = req.params;
      const record = await metaTagRepository.findByChannelId(channelId);

      if (!record) {
        res.status(404).json({ error: 'Meta tags not found for this channel' });
        return;
      }

      res.json(buildPreview(record));
    } catch (err) {
      logger.error({ err, channelId: req.params.channelId }, 'GET meta-tags failed');
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

/**
 * PUT /api/admin/channels/:channelId/meta-tags
 * Updates custom override fields. Validates lengths per AC-3.
 */
adminMetaTagRouter.put(
  '/channels/:channelId/meta-tags',
  requireServerAdmin,
  async (req: Request, res: Response) => {
    const { channelId } = req.params;

    const parsed = metaTagOverrideSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(422).json({
        error: 'Validation error',
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { customTitle, customDescription, customOgImage } = parsed.data;

    try {
      const existing = await metaTagRepository.findByChannelId(channelId);
      if (!existing) {
        res.status(404).json({ error: 'Meta tags not found for this channel' });
        return;
      }

      const updated = await metaTagRepository.updateCustomOverrides(channelId, {
        customTitle: customTitle ?? null,
        customDescription: customDescription ?? null,
        customOgImage: customOgImage ?? null,
      });

      res.json(buildPreview(updated));
    } catch (err) {
      logger.error({ err, channelId }, 'PUT meta-tags failed');
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

/**
 * POST /api/admin/channels/:channelId/meta-tags/jobs
 * Schedules an async regeneration job.
 * Supports idempotency via Idempotency-Key header (deduplicates within 60s).
 */
adminMetaTagRouter.post(
  '/channels/:channelId/meta-tags/jobs',
  requireServerAdmin,
  async (req: Request, res: Response) => {
    const { channelId } = req.params;
    const idempotencyHeader = req.headers['idempotency-key'] as string | undefined;

    try {
      // Idempotency deduplication (AC-6)
      if (idempotencyHeader) {
        const existingJobId = await getIdempotentJobId(channelId, idempotencyHeader);
        if (existingJobId) {
          const pollUrl = `${BASE_URL}/api/admin/channels/${channelId}/meta-tags/jobs/${existingJobId}`;
          res.status(202).json({
            jobId: existingJobId,
            status: 'deduplicated',
            idempotencyKey: idempotencyHeader,
            pollUrl,
          });
          return;
        }
      }

      const jobId = randomUUID();
      const now = new Date().toISOString();

      const job: MetaTagJobStatus = {
        jobId,
        channelId,
        status: 'queued',
        attempts: 0,
        startedAt: null,
        completedAt: null,
        errorCode: null,
        errorMessage: null,
      };

      await storeJob(job);

      if (idempotencyHeader) {
        await storeIdempotentJobId(channelId, idempotencyHeader, jobId);
      }

      logger.info({ jobId, channelId, idempotencyKey: idempotencyHeader }, 'Meta tag job queued');

      const pollUrl = `${BASE_URL}/api/admin/channels/${channelId}/meta-tags/jobs/${jobId}`;
      res.status(202).json({
        jobId,
        status: 'queued',
        idempotencyKey: idempotencyHeader ?? null,
        pollUrl,
        createdAt: now,
      });
    } catch (err) {
      logger.error({ err, channelId }, 'POST meta-tags jobs failed');
      res.status(500).json({ error: 'Failed to schedule regeneration job' });
    }
  },
);

/**
 * GET /api/admin/channels/:channelId/meta-tags/jobs/:jobId
 * Returns the current status of a regeneration job.
 */
adminMetaTagRouter.get(
  '/channels/:channelId/meta-tags/jobs/:jobId',
  requireServerAdmin,
  async (req: Request, res: Response) => {
    const { channelId, jobId } = req.params;

    try {
      const job = await getJob(jobId);

      if (!job || job.channelId !== channelId) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }

      res.json(job);
    } catch (err) {
      logger.error({ err, channelId, jobId }, 'GET meta-tag job status failed');
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);
