/**
 * Reaction service tests — Issue #152
 *
 * Covers: addReaction (success + duplicate), removeReaction (success + non-owner),
 * and getMessageReactions (shape).
 * Requires DATABASE_URL pointing at a running Postgres instance.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { reactionService } from '../src/services/reaction.service';

const prisma = new PrismaClient();

let serverId: string;
let channelId: string;
let authorId: string;
let otherUserId: string;
let messageId: string;

beforeAll(async () => {
  const ts = Date.now();

  const user = await prisma.user.create({
    data: {
      email: `reaction-test-${ts}@example.com`,
      username: `rxntest${ts}`,
      passwordHash: await bcrypt.hash('password', 10),
      displayName: 'Reaction Tester',
    },
  });
  authorId = user.id;

  const other = await prisma.user.create({
    data: {
      email: `reaction-other-${ts}@example.com`,
      username: `rxnother${ts}`,
      passwordHash: await bcrypt.hash('password', 10),
      displayName: 'Other User',
    },
  });
  otherUserId = other.id;

  const server = await prisma.server.create({
    data: {
      name: 'Reaction Test Server',
      slug: `rxn-test-${ts}`,
      isPublic: false,
      ownerId: authorId,
    },
  });
  serverId = server.id;

  const channel = await prisma.channel.create({
    data: {
      serverId,
      name: 'reactions',
      slug: 'reactions',
      type: 'TEXT',
      visibility: 'PRIVATE',
    },
  });
  channelId = channel.id;

  await prisma.serverMember.create({
    data: { userId: authorId, serverId, role: 'MEMBER' },
  });
  await prisma.serverMember.create({
    data: { userId: otherUserId, serverId, role: 'MEMBER' },
  });

  const message = await prisma.message.create({
    data: { channelId, authorId, content: 'React to me!' },
  });
  messageId = message.id;
});

afterAll(async () => {
  if (serverId) {
    await prisma.server.delete({ where: { id: serverId } }).catch(() => {});
  }
  if (authorId) {
    await prisma.user.delete({ where: { id: authorId } }).catch(() => {});
  }
  if (otherUserId) {
    await prisma.user.delete({ where: { id: otherUserId } }).catch(() => {});
  }
  await prisma.$disconnect();
});

// ─── addReaction ──────────────────────────────────────────────────────────────

describe('reactionService.addReaction', () => {
  it('adds a reaction successfully', async () => {
    const reaction = await reactionService.addReaction({
      messageId,
      channelId,
      userId: authorId,
      emoji: '👍',
      serverId,
    });

    expect(reaction.id).toBeTruthy();
    expect(reaction.messageId).toBe(messageId);
    expect(reaction.userId).toBe(authorId);
    expect(reaction.emoji).toBe('👍');
  });

  it('throws CONFLICT on duplicate reaction (same user + emoji)', async () => {
    await expect(
      reactionService.addReaction({
        messageId,
        channelId,
        userId: authorId,
        emoji: '👍',
        serverId,
      }),
    ).rejects.toMatchObject({ code: 'CONFLICT' });
  });
});

// ─── removeReaction ───────────────────────────────────────────────────────────

describe('reactionService.removeReaction', () => {
  beforeAll(async () => {
    // Ensure the other user has a reaction to remove
    await reactionService.addReaction({
      messageId,
      channelId,
      userId: otherUserId,
      emoji: '❤️',
      serverId,
    });
  });

  it('removes a reaction successfully', async () => {
    await expect(
      reactionService.removeReaction({
        messageId,
        channelId,
        userId: otherUserId,
        emoji: '❤️',
        serverId,
      }),
    ).resolves.toBeUndefined();

    // Verify it's gone from the DB
    const gone = await prisma.messageReaction.findUnique({
      where: {
        messageId_userId_emoji: { messageId, userId: otherUserId, emoji: '❤️' },
      },
    });
    expect(gone).toBeNull();
  });

  it('throws FORBIDDEN when a non-owner tries to remove a reaction that belongs to someone else', async () => {
    // authorId has a 👍 reaction (added in the addReaction tests above).
    // otherUserId does NOT have a 👍 reaction on this message.
    // When otherUserId attempts to remove '👍', the service should detect that
    // a 👍 reaction exists on this message (owned by authorId) and throw FORBIDDEN.
    await expect(
      reactionService.removeReaction({
        messageId,
        channelId,
        userId: otherUserId, // does NOT own the 👍 reaction
        emoji: '👍',
        serverId,
      }),
    ).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });
});

// ─── getMessageReactions ──────────────────────────────────────────────────────

describe('reactionService.getMessageReactions', () => {
  it('returns reactions grouped by emoji with correct shape', async () => {
    // At this point authorId has 👍 on the message.
    // Add a second unique reaction to verify grouping.
    await reactionService.addReaction({
      messageId,
      channelId,
      userId: otherUserId,
      emoji: '👍',
      serverId,
    });

    const groups = await reactionService.getMessageReactions({ messageId, channelId, serverId });

    expect(Array.isArray(groups)).toBe(true);

    const thumbsUp = groups.find((g) => g.emoji === '👍');
    expect(thumbsUp).toBeDefined();
    expect(thumbsUp!.count).toBe(2);
    expect(thumbsUp!.userIds).toContain(authorId);
    expect(thumbsUp!.userIds).toContain(otherUserId);

    // Every group must match the expected shape
    for (const group of groups) {
      expect(typeof group.emoji).toBe('string');
      expect(typeof group.count).toBe('number');
      expect(Array.isArray(group.userIds)).toBe(true);
      expect(group.count).toBe(group.userIds.length);
    }
  });
});
