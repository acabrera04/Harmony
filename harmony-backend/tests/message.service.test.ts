/**
 * Message service tests — Issue #101
 *
 * Covers happy-path operations: send, getMessages (cursor pagination),
 * editMessage, deleteMessage (soft delete), and message pinning.
 * Requires DATABASE_URL pointing at a running Postgres instance.
 */

import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { messageService } from '../src/services/message.service';

const prisma = new PrismaClient();

let serverId: string;
let channelId: string;
let authorId: string;

beforeAll(async () => {
  // Create a server, a channel, and an author user for all tests
  const user = await prisma.user.create({
    data: {
      email: `msg-test-${Date.now()}@example.com`,
      username: `msgtest${Date.now()}`,
      passwordHash: await bcrypt.hash('password', 10),
      displayName: 'Message Tester',
    },
  });
  authorId = user.id;

  const server = await prisma.server.create({
    data: {
      name: 'Message Test Server',
      slug: `msg-test-${Date.now()}`,
      isPublic: false,
    },
  });
  serverId = server.id;

  const channel = await prisma.channel.create({
    data: {
      serverId,
      name: 'general',
      slug: 'general',
      type: 'TEXT',
      visibility: 'PRIVATE',
    },
  });
  channelId = channel.id;

  // Add the user as a MEMBER of the server (required for permission checks)
  await prisma.serverMember.create({
    data: { userId: authorId, serverId, role: 'MEMBER' },
  });
});

afterAll(async () => {
  if (serverId) {
    await prisma.server.delete({ where: { id: serverId } }).catch(() => {});
  }
  if (authorId) {
    await prisma.user.delete({ where: { id: authorId } }).catch(() => {});
  }
  await prisma.$disconnect();
});

// ─── sendMessage ──────────────────────────────────────────────────────────────

describe('messageService.sendMessage', () => {
  it('creates a message with author snapshot', async () => {
    const msg = await messageService.sendMessage({
      channelId,
      authorId,
      content: 'Hello, world!',
    });

    expect(msg.id).toBeTruthy();
    expect(msg.content).toBe('Hello, world!');
    expect(msg.channelId).toBe(channelId);
    expect(msg.authorId).toBe(authorId);
    expect(msg.isDeleted).toBe(false);
    expect(msg.pinned).toBe(false);
    // Author snapshot
    expect(msg.author.id).toBe(authorId);
    expect(msg.author.username).toBeTruthy();
    expect(msg.author.displayName).toBe('Message Tester');
    // Attachments
    expect(Array.isArray(msg.attachments)).toBe(true);
  });

  it('creates a message with attachment metadata', async () => {
    const msg = await messageService.sendMessage({
      channelId,
      authorId,
      content: 'Check this file',
      attachments: [
        {
          filename: 'test.png',
          url: 'https://example.com/test.png',
          contentType: 'image/png',
          sizeBytes: BigInt(1024),
        },
      ],
    });

    expect(msg.attachments).toHaveLength(1);
    expect(msg.attachments[0].filename).toBe('test.png');
    expect(msg.attachments[0].contentType).toBe('image/png');
  });

  it('throws NOT_FOUND for unknown channelId', async () => {
    await expect(
      messageService.sendMessage({
        channelId: '00000000-0000-0000-0000-000000000000',
        authorId,
        content: 'ghost',
      }),
    ).rejects.toThrow(TRPCError);
  });
});

// ─── getMessages ──────────────────────────────────────────────────────────────

describe('messageService.getMessages', () => {
  beforeAll(async () => {
    // Seed 5 messages in a fresh channel
    const ch = await prisma.channel.create({
      data: {
        serverId,
        name: 'pagination',
        slug: `pagination-${Date.now()}`,
        type: 'TEXT',
        visibility: 'PRIVATE',
      },
    });
    channelId = ch.id;

    for (let i = 0; i < 5; i++) {
      await messageService.sendMessage({ channelId, authorId, content: `Message ${i}` });
    }
  });

  it('returns messages with author snapshots', async () => {
    const result = await messageService.getMessages({ channelId });
    expect(Array.isArray(result.messages)).toBe(true);
    expect(result.messages.length).toBeGreaterThanOrEqual(1);
    expect(result.messages[0].author).toHaveProperty('username');
    expect(result.messages[0].author).toHaveProperty('displayName');
  });

  it('returns up to the default limit', async () => {
    const result = await messageService.getMessages({ channelId, limit: 3 });
    expect(result.messages.length).toBeLessThanOrEqual(3);
  });

  it('paginates using cursor', async () => {
    const page1 = await messageService.getMessages({ channelId, limit: 2 });
    expect(page1.messages.length).toBe(2);
    expect(page1.hasMore).toBe(true);
    expect(page1.nextCursor).toBeTruthy();

    const page2 = await messageService.getMessages({ channelId, cursor: page1.nextCursor! });
    // Should not include messages already seen on page 1
    const page1Ids = new Set(page1.messages.map((m) => m.id));
    page2.messages.forEach((m) => expect(page1Ids.has(m.id)).toBe(false));
  });

  it('excludes soft-deleted messages', async () => {
    const msg = await messageService.sendMessage({ channelId, authorId, content: 'to be deleted' });
    await messageService.deleteMessage({ messageId: msg.id, actorId: authorId, serverId });

    const result = await messageService.getMessages({ channelId });
    const ids = result.messages.map((m) => m.id);
    expect(ids).not.toContain(msg.id);
  });
});

// ─── editMessage ──────────────────────────────────────────────────────────────

describe('messageService.editMessage', () => {
  let messageId: string;

  beforeAll(async () => {
    const msg = await messageService.sendMessage({
      channelId,
      authorId,
      content: 'original content',
    });
    messageId = msg.id;
  });

  it('updates content and sets editedAt', async () => {
    const updated = await messageService.editMessage({
      messageId,
      authorId,
      content: 'edited content',
    });

    expect(updated.content).toBe('edited content');
    expect(updated.editedAt).toBeTruthy();
  });

  it('throws FORBIDDEN when a different user tries to edit', async () => {
    await expect(
      messageService.editMessage({
        messageId,
        authorId: '00000000-0000-0000-0000-000000000001',
        content: 'hijacked',
      }),
    ).rejects.toThrow(TRPCError);
  });

  it('throws NOT_FOUND for unknown messageId', async () => {
    await expect(
      messageService.editMessage({
        messageId: '00000000-0000-0000-0000-000000000000',
        authorId,
        content: 'x',
      }),
    ).rejects.toThrow(TRPCError);
  });
});

// ─── deleteMessage ────────────────────────────────────────────────────────────

describe('messageService.deleteMessage', () => {
  it('soft-deletes own message', async () => {
    const msg = await messageService.sendMessage({ channelId, authorId, content: 'delete me' });

    await messageService.deleteMessage({ messageId: msg.id, actorId: authorId, serverId });

    const found = await prisma.message.findUnique({ where: { id: msg.id } });
    expect(found?.isDeleted).toBe(true);
  });

  it("throws FORBIDDEN when a MEMBER tries to delete another user's message", async () => {
    const msg = await messageService.sendMessage({ channelId, authorId, content: 'protected' });

    // A different user who is a MEMBER (no delete_any)
    const other = await prisma.user.create({
      data: {
        email: `other-${Date.now()}@example.com`,
        username: `other${Date.now()}`,
        passwordHash: await bcrypt.hash('pw', 10),
        displayName: 'Other',
      },
    });
    await prisma.serverMember.create({ data: { userId: other.id, serverId, role: 'MEMBER' } });

    await expect(
      messageService.deleteMessage({ messageId: msg.id, actorId: other.id, serverId }),
    ).rejects.toThrow(TRPCError);

    // Cleanup
    await prisma.user.delete({ where: { id: other.id } }).catch(() => {});
    await messageService.deleteMessage({ messageId: msg.id, actorId: authorId, serverId });
  });

  it('throws NOT_FOUND for unknown messageId', async () => {
    await expect(
      messageService.deleteMessage({
        messageId: '00000000-0000-0000-0000-000000000000',
        actorId: authorId,
        serverId,
      }),
    ).rejects.toThrow(TRPCError);
  });
});

// ─── pinMessage / unpinMessage ────────────────────────────────────────────────

describe('messageService.pinMessage / unpinMessage', () => {
  let messageId: string;

  beforeAll(async () => {
    const msg = await messageService.sendMessage({ channelId, authorId, content: 'pin me' });
    messageId = msg.id;
  });

  it('pins a message and sets pinnedAt', async () => {
    const pinned = await messageService.pinMessage(messageId);
    expect(pinned.pinned).toBe(true);
    expect(pinned.pinnedAt).toBeTruthy();
  });

  it('throws CONFLICT when trying to pin an already-pinned message', async () => {
    await expect(messageService.pinMessage(messageId)).rejects.toThrow(TRPCError);
  });

  it('unpins a message and clears pinnedAt', async () => {
    const unpinned = await messageService.unpinMessage(messageId);
    expect(unpinned.pinned).toBe(false);
    expect(unpinned.pinnedAt).toBeNull();
  });

  it('throws CONFLICT when trying to unpin a message that is not pinned', async () => {
    await expect(messageService.unpinMessage(messageId)).rejects.toThrow(TRPCError);
  });
});

// ─── getPinnedMessages ────────────────────────────────────────────────────────

describe('messageService.getPinnedMessages', () => {
  it('returns only pinned messages for a channel', async () => {
    const msg1 = await messageService.sendMessage({ channelId, authorId, content: 'pinned 1' });
    const msg2 = await messageService.sendMessage({ channelId, authorId, content: 'not pinned' });
    const msg3 = await messageService.sendMessage({ channelId, authorId, content: 'pinned 2' });

    await messageService.pinMessage(msg1.id);
    await messageService.pinMessage(msg3.id);

    const pinned = await messageService.getPinnedMessages(channelId);
    const pinnedIds = pinned.map((m) => m.id);

    expect(pinnedIds).toContain(msg1.id);
    expect(pinnedIds).toContain(msg3.id);
    expect(pinnedIds).not.toContain(msg2.id);
    expect(pinned.every((m) => m.pinned)).toBe(true);
  });
});
