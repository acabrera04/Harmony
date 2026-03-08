import { TRPCError } from '@trpc/server';
import { prisma } from '../db/prisma';
import { cacheService, CacheTTL, sanitizeKeySegment } from './cache.service';
import { permissionService } from './permission.service';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GetMessagesInput {
  channelId: string;
  cursor?: string; // messageId to paginate from (exclusive)
  limit?: number;  // default 20
}

export interface SendMessageInput {
  channelId: string;
  authorId: string;
  content: string;
  attachments?: Array<{
    filename: string;
    url: string;
    contentType: string;
    sizeBytes: bigint;
  }>;
}

export interface EditMessageInput {
  messageId: string;
  authorId: string;
  content: string;
}

export interface DeleteMessageInput {
  messageId: string;
  actorId: string;
  serverId: string;
}

// Author fields embedded with every message response
const AUTHOR_SELECT = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} as const;

const ATTACHMENT_SELECT = {
  id: true,
  filename: true,
  url: true,
  contentType: true,
  sizeBytes: true,
} as const;

const MESSAGE_INCLUDE = {
  author: { select: AUTHOR_SELECT },
  attachments: { select: ATTACHMENT_SELECT },
} as const;

// Cache key for cursor-paginated message pages
function msgCacheKey(channelId: string, cursor: string | undefined, limit: number): string {
  const c = sanitizeKeySegment(cursor ?? 'start');
  return `channel:msgs:${sanitizeKeySegment(channelId)}:cursor:${c}:limit:${limit}`;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const messageService = {
  /**
   * Retrieve messages for a channel using cursor-based pagination.
   * Messages are returned in ascending chronological order (oldest first).
   * Pass the last returned message's id as `cursor` to get the next page.
   */
  async getMessages(input: GetMessagesInput) {
    const { channelId, cursor, limit = 20 } = input;
    const clampedLimit = Math.min(Math.max(1, limit), 100);

    const cacheKey = msgCacheKey(channelId, cursor, clampedLimit);

    return cacheService.getOrRevalidate(
      cacheKey,
      async () => {
        const messages = await prisma.message.findMany({
          where: { channelId, isDeleted: false },
          take: clampedLimit + 1, // fetch one extra to determine hasMore
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          orderBy: { createdAt: 'asc' },
          include: MESSAGE_INCLUDE,
        });

        const hasMore = messages.length > clampedLimit;
        const page = hasMore ? messages.slice(0, clampedLimit) : messages;
        const nextCursor = hasMore ? page[page.length - 1].id : null;

        return { messages: page, nextCursor, hasMore };
      },
      { ttl: CacheTTL.channelMessages },
    );
  },

  /**
   * Send a new message to a channel, optionally with attachment metadata.
   */
  async sendMessage(input: SendMessageInput) {
    const { channelId, authorId, content, attachments } = input;

    const channel = await prisma.channel.findUnique({ where: { id: channelId } });
    if (!channel) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Channel not found' });
    }

    const message = await prisma.message.create({
      data: {
        channelId,
        authorId,
        content,
        ...(attachments && attachments.length > 0 && {
          attachments: {
            create: attachments,
          },
        }),
      },
      include: MESSAGE_INCLUDE,
    });

    // Invalidate all cached pages for this channel (best-effort)
    cacheService.invalidatePattern(`channel:msgs:${sanitizeKeySegment(channelId)}:*`).catch(() => {});

    return message;
  },

  /**
   * Edit a message's content. Only the message author may edit.
   */
  async editMessage(input: EditMessageInput) {
    const { messageId, authorId, content } = input;

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.isDeleted) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Message not found' });
    }
    if (message.authorId !== authorId) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'You can only edit your own messages' });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { content, editedAt: new Date() },
      include: MESSAGE_INCLUDE,
    });

    cacheService.invalidatePattern(`channel:msgs:${sanitizeKeySegment(message.channelId)}:*`).catch(() => {});

    return updated;
  },

  /**
   * Soft-delete a message.
   * - Own messages: requires message:delete_own (checked via router RBAC).
   * - Other users' messages: additionally requires message:delete_any.
   */
  async deleteMessage(input: DeleteMessageInput) {
    const { messageId, actorId, serverId } = input;

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.isDeleted) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Message not found' });
    }

    if (message.authorId !== actorId) {
      // Not the author — requires elevated permission
      const canDeleteAny = await permissionService.checkPermission(actorId, serverId, 'message:delete_any');
      if (!canDeleteAny) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'You do not have permission to delete this message' });
      }
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { isDeleted: true },
    });

    cacheService.invalidatePattern(`channel:msgs:${sanitizeKeySegment(message.channelId)}:*`).catch(() => {});
  },

  /**
   * Pin a message. Requires message:pin (MODERATOR+), checked via router RBAC.
   */
  async pinMessage(messageId: string) {
    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.isDeleted) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Message not found' });
    }
    if (message.pinned) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Message is already pinned' });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { pinned: true, pinnedAt: new Date() },
      include: MESSAGE_INCLUDE,
    });

    cacheService.invalidatePattern(`channel:msgs:${sanitizeKeySegment(message.channelId)}:*`).catch(() => {});

    return updated;
  },

  /**
   * Unpin a message. Requires message:pin (MODERATOR+), checked via router RBAC.
   */
  async unpinMessage(messageId: string) {
    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.isDeleted) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Message not found' });
    }
    if (!message.pinned) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Message is not pinned' });
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { pinned: false, pinnedAt: null },
      include: MESSAGE_INCLUDE,
    });

    cacheService.invalidatePattern(`channel:msgs:${sanitizeKeySegment(message.channelId)}:*`).catch(() => {});

    return updated;
  },

  /**
   * Retrieve all pinned messages for a channel in pin order (pinnedAt DESC).
   */
  async getPinnedMessages(channelId: string) {
    return prisma.message.findMany({
      where: { channelId, pinned: true, isDeleted: false },
      orderBy: { pinnedAt: 'desc' },
      include: MESSAGE_INCLUDE,
    });
  },
};
