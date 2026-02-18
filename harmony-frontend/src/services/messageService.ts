/**
 * Message Service (M3 — mock implementation)
 * Simulates async API calls with 200–500ms delay.
 * References: dev-spec-guest-public-channel-view.md
 */

import type { Message } from "@/types";
import { mockMessages, mockCurrentUser } from "@/mocks";

// ─── Simulated delay ──────────────────────────────────────────────────────────

function delay(ms?: number): Promise<void> {
  const wait = ms ?? Math.floor(Math.random() * 301) + 200; // 200–500ms
  return new Promise((resolve) => setTimeout(resolve, wait));
}

// ─── In-memory store ──────────────────────────────────────────────────────────

const messages: Message[] = [...mockMessages];
const PAGE_SIZE = 20;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns a page of messages for a channel, sorted newest-first.
 * @param channelId - The channel to query.
 * @param page - 1-based page number (default: 1).
 */
export async function getMessages(
  channelId: string,
  page = 1
): Promise<{ messages: Message[]; hasMore: boolean }> {
  await delay();
  const channelMessages = messages
    .filter((m) => m.channelId === channelId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = channelMessages.slice(start, end);

  return {
    messages: slice,
    hasMore: end < channelMessages.length,
  };
}

/**
 * Appends a new message to the in-memory store and returns it.
 */
export async function sendMessage(
  channelId: string,
  content: string
): Promise<Message> {
  await delay();
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    channelId,
    authorId: mockCurrentUser.id,
    author: {
      id: mockCurrentUser.id,
      username: mockCurrentUser.username,
      displayName: mockCurrentUser.displayName,
      avatarUrl: mockCurrentUser.avatar,
    },
    content,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  return { ...newMessage };
}

/**
 * Deletes a message by ID. Returns true if deleted, false if not found.
 */
export async function deleteMessage(id: string): Promise<boolean> {
  await delay();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return false;
  messages.splice(index, 1);
  return true;
}
