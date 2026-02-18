/**
 * Channel Service (M2 — mock implementation)
 * Simulates async API calls with 200–500ms delay.
 * updateVisibility mutates in-memory state so changes persist during the session.
 * References: dev-spec-channel-visibility-toggle.md
 */

import { ChannelVisibility, type Channel } from "@/types";
import { mockChannels } from "@/mocks";

// ─── Simulated delay ──────────────────────────────────────────────────────────

function delay(ms?: number): Promise<void> {
  const wait = ms ?? Math.floor(Math.random() * 301) + 200; // 200–500ms
  return new Promise((resolve) => setTimeout(resolve, wait));
}

// ─── In-memory store (mutated by write operations) ────────────────────────────

const channels: Channel[] = [...mockChannels];

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns all channels for a given server.
 */
export async function getChannels(serverId: string): Promise<Channel[]> {
  await delay();
  return channels.filter((c) => c.serverId === serverId);
}

/**
 * Returns a single channel by server slug + channel slug, or null if not found.
 */
export async function getChannel(
  serverSlug: string,
  channelSlug: string
): Promise<Channel | null> {
  await delay();
  const { mockServers } = await import("@/mocks");
  const server = mockServers.find((s) => s.slug === serverSlug);
  if (!server) return null;
  return (
    channels.find(
      (c) => c.serverId === server.id && c.slug === channelSlug
    ) ?? null
  );
}

/**
 * Updates the visibility of a channel in-memory so it persists for the session.
 * Emits VISIBILITY_CHANGED semantics (canonical enum: PUBLIC_INDEXABLE | PUBLIC_NO_INDEX | PRIVATE).
 */
export async function updateVisibility(
  channelId: string,
  visibility: ChannelVisibility
): Promise<Channel> {
  await delay();
  const index = channels.findIndex((c) => c.id === channelId);
  if (index === -1) {
    throw new Error(`Channel not found: ${channelId}`);
  }
  channels[index] = {
    ...channels[index],
    visibility,
    updatedAt: new Date().toISOString(),
  };
  return { ...channels[index] };
}

/**
 * Creates a new channel and appends it to the in-memory store.
 */
export async function createChannel(
  channel: Omit<Channel, "id" | "createdAt" | "updatedAt">
): Promise<Channel> {
  await delay();
  const newChannel: Channel = {
    ...channel,
    id: `channel-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  channels.push(newChannel);
  return { ...newChannel };
}

/**
 * Deletes a channel by ID. Returns true if deleted, false if not found.
 */
export async function deleteChannel(channelId: string): Promise<boolean> {
  await delay();
  const index = channels.findIndex((c) => c.id === channelId);
  if (index === -1) return false;
  channels.splice(index, 1);
  return true;
}

// Re-export ChannelVisibility for convenience
export { ChannelVisibility };
