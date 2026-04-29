import { prisma } from '../db/prisma';
import { eventBus, EventChannels } from '../events/eventBus';
import { createLogger } from '../lib/logger';

const logger = createLogger({ component: 'mention-service' });

/** Regex matching @username tokens — one or more non-whitespace word chars. */
const MENTION_RE = /@([\w]{1,32})/g;

/**
 * Parse @username tokens from message content and return unique usernames.
 */
export function extractMentionedUsernames(content: string): string[] {
  const names = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = MENTION_RE.exec(content)) !== null) {
    names.add(m[1].toLowerCase());
  }
  return [...names];
}

/**
 * After a message is created, resolve mentioned usernames to server members,
 * persist MessageMention + Notification records, and fire USER_MENTIONED events.
 * Failures are logged but never thrown — mention creation is best-effort.
 */
export async function processMentions(params: {
  messageId: string;
  channelId: string;
  serverId: string;
  authorId: string;
  authorUsername: string;
  content: string;
}): Promise<void> {
  const { messageId, channelId, serverId, authorId, authorUsername, content } = params;

  const usernames = extractMentionedUsernames(content);
  if (usernames.length === 0) return;

  try {
    // Resolve usernames to users who are also members of this server.
    // Skip the author — no self-mention notifications.
    const members = await prisma.serverMember.findMany({
      where: {
        serverId,
        user: {
          username: { in: usernames, mode: 'insensitive' },
          id: { not: authorId },
        },
      },
      select: {
        userId: true,
        user: { select: { username: true } },
      },
    });

    if (members.length === 0) return;

    const now = new Date();

    // Upsert mentions (idempotent on re-save/edit)
    await prisma.messageMention.createMany({
      data: members.map((m) => ({ messageId, userId: m.userId })),
      skipDuplicates: true,
    });

    // Create one notification per newly mentioned user
    const notifications = await prisma.$transaction(
      members.map((m) =>
        prisma.notification.create({
          data: {
            userId: m.userId,
            type: 'mention',
            messageId,
            channelId,
            serverId,
            createdAt: now,
          },
        }),
      ),
    );

    // Fire real-time events — fire-and-forget
    for (const notif of notifications) {
      eventBus
        .publish(EventChannels.USER_MENTIONED, {
          notificationId: notif.id,
          userId: notif.userId,
          messageId,
          channelId,
          serverId,
          authorId,
          authorUsername,
          timestamp: now.toISOString(),
        })
        .catch((err) =>
          logger.warn({ err, userId: notif.userId, messageId }, 'Failed to publish USER_MENTIONED'),
        );
    }
  } catch (err) {
    logger.warn({ err, messageId, serverId }, 'Failed to process mentions');
  }
}
