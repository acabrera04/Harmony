import { NextFunction, Router, Request, Response } from 'express';
import { UserStatus } from '@prisma/client';
import { z } from 'zod';
import { authService } from '../services/auth.service';
import { presenceService } from '../services/presence.service';

export const presenceRouter = Router();

const PresenceStatusSchema = z.enum([UserStatus.ONLINE, UserStatus.IDLE]);
const PresenceBodySchema = z.object({ status: PresenceStatusSchema });
type ActivePresenceStatus = z.infer<typeof PresenceStatusSchema>;

function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

function verifyToken(token: string): string | null {
  try {
    return authService.verifyAccessToken(token).sub;
  } catch {
    return null;
  }
}

async function updatePresence(
  userId: string,
  status: ActivePresenceStatus,
  res: Response,
): Promise<void> {
  await presenceService.renewLease(userId, status);
  res.status(204).send();
}

presenceRouter.post('/status', async (req: Request, res: Response, next: NextFunction) => {
  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const userId = verifyToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired access token' });
    return;
  }

  const parsed = PresenceBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    return;
  }

  try {
    await updatePresence(userId, parsed.data.status, res);
  } catch (err) {
    next(err);
  }
});
