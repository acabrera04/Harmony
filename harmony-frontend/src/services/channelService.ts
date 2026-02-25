/**
 * Channel Service (M2 — mock implementation)
 * updateVisibility mutates in-memory state so changes persist during the session.
 * References: dev-spec-channel-visibility-toggle.md
 */

import { ChannelVisibility, type Channel } from "@/types";
import { mockChannels, mockServers } from "@/mocks";

// ─── In-memory store (mutated by write operations) ────────────────────────────
// Use globalThis so the array survives Next.js hot-reloads and Turbopack
// worker re-evaluations in dev mode — same pattern used by Prisma client in
// Next.js dev. In production the module is evaluated once and this is a no-op.
//
// TODO(database): Replace with real DB queries when persistence is introduced.
// Each service function (getChannels, updateChannel, etc.) maps 1:1 to a SQL
// query — the component layer won't need to change, only this service.
// Known limitation: in-memory state is not shared across multiple server
// processes (e.g. PM2 clusters, Kubernetes pods) and is lost on restart.
const g = globalThis as typeof globalThis & { __harmonyChannels?: Channel[] };
if (!g.__harmonyChannels) {
  g.__harmonyChannels = [...mockChannels];
}
const channels = g.__harmonyChannels;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns all channels for a given server.
 */
export async function getChannels(serverId: string): Promise<Channel[]> {
  return channels.filter((c) => c.serverId === serverId);
}

/**
 * Returns a single channel by server slug + channel slug, or null if not found.
 */
export async function getChannel(
  serverSlug: string,
  channelSlug: string
): Promise<Channel | null> {
  // #c36: mockServers is now a static import at module scope — no dynamic import needed
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
  const index = channels.findIndex((c) => c.id === channelId);
  if (index === -1) {
    throw new Error(`Channel not found: ${channelId}`);
  }
  // updatedAt is optional in Channel; mock data omits it initially.
  // We set it here on every mutation so callers always get a fresh timestamp.
  channels[index] = {
    ...channels[index],
    visibility,
    updatedAt: new Date().toISOString(),
  };
  return { ...channels[index] };
}

/**
 * Updates editable metadata (name, topic, description) of a channel in-memory.
 * slug is intentionally excluded — renaming the slug would break existing URLs.
 */
export async function updateChannel(
  channelId: string,
  patch: Partial<Pick<Channel, "name" | "topic" | "description">>
): Promise<Channel> {
  const index = channels.findIndex((c) => c.id === channelId);
  if (index === -1) {
    throw new Error(`Channel not found: ${channelId}`);
  }
  channels[index] = {
    ...channels[index],
    // Filter out undefined values so a Partial<> with absent keys doesn't
    // overwrite existing fields with undefined (standard PATCH semantics).
    ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)),
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
  const index = channels.findIndex((c) => c.id === channelId);
  if (index === -1) return false;
  channels.splice(index, 1);
  return true;
}

// Re-export ChannelVisibility for convenience
export { ChannelVisibility };
