/**
 * Channel Service (M2 — real API implementation)
 * Replaces mock in-memory store with backend API calls.
 * References: dev-spec-channel-visibility-toggle.md
 */

import { cache } from 'react';
import { ChannelVisibility, type Channel } from '@/types';
import { publicGet, trpcQuery, trpcMutate } from '@/lib/trpc-client';

// ─── Type adapters ────────────────────────────────────────────────────────────

/** Maps the backend Prisma Channel shape to the frontend Channel type. */
function toFrontendChannel(raw: Record<string, unknown>): Channel {
  // Warn on missing required fields to catch backend shape mismatches early.
  if (typeof raw.id !== 'string') console.warn('[toFrontendChannel] missing or non-string "id"', raw);
  if (typeof raw.serverId !== 'string') console.warn('[toFrontendChannel] missing or non-string "serverId"', raw);
  if (typeof raw.slug !== 'string') console.warn('[toFrontendChannel] missing or non-string "slug"', raw);
  if (typeof raw.createdAt !== 'string') console.warn('[toFrontendChannel] missing or non-string "createdAt"', raw);
  return {
    id: raw.id as string,
    serverId: raw.serverId as string,
    name: raw.name as string,
    slug: raw.slug as string,
    type: raw.type as Channel['type'],
    visibility: raw.visibility as ChannelVisibility,
    topic: (raw.topic as string | undefined) ?? undefined,
    position: (raw.position as number) ?? 0,
    description: raw.description as string | undefined,
    createdAt: raw.createdAt as string,
    updatedAt: raw.updatedAt as string | undefined,
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns all channels for a given server.
 * Uses tRPC authed endpoint for full channel list (including PRIVATE channels).
 * Errors propagate to the caller — callers that use the channel count (e.g.
 * createChannelAction position computation) must not silently receive [] on a
 * transient failure, which would corrupt channel ordering.
 */
export async function getChannels(serverId: string): Promise<Channel[]> {
  const data = await trpcQuery<Record<string, unknown>[]>('channel.getChannels', { serverId });
  return (data ?? []).map(toFrontendChannel);
}

/**
 * Returns a single channel by server slug + channel slug, or null if not found.
 * Uses the tRPC endpoint for full access.
 *
 * Note: makes two serial network calls — first to resolve the serverId via
 * `/api/public/servers/:slug`, then to `channel.getChannel`. The public GET is
 * also used by `getServer` which is React-cached, so when both run in the same
 * render pass the server fetch is typically served from the React cache.
 */
export const getChannel = cache(async (serverSlug: string, channelSlug: string): Promise<Channel | null> => {
  try {
    // Resolve serverId from slug (needed for tRPC channel.getChannel input).
    const serverData = await publicGet<Record<string, unknown>>(
      `/servers/${encodeURIComponent(serverSlug)}`,
    );
    if (!serverData) return null;

    const data = await trpcQuery<Record<string, unknown>>('channel.getChannel', {
      serverId: serverData.id as string,
      serverSlug,
      channelSlug,
    });
    if (!data) return null;
    return toFrontendChannel(data);
  } catch (error) {
    console.error(`[channelService.getChannel] API call failed for "${serverSlug}/${channelSlug}":`, error);
    return null;
  }
});

/**
 * Updates the visibility of a channel via tRPC.
 * Returns the visibility change result (not a full Channel object).
 */
export async function updateVisibility(
  channelId: string,
  visibility: ChannelVisibility,
  serverId?: string,
): Promise<void> {
  if (!serverId) {
    throw new Error('serverId is required for updateVisibility');
  }
  await trpcMutate('channel.setVisibility', {
    serverId,
    channelId,
    visibility,
  });
}

/**
 * Updates editable metadata (name, topic, description) of a channel via tRPC.
 */
export async function updateChannel(
  channelId: string,
  serverId: string,
  patch: Partial<Pick<Channel, 'name' | 'topic' | 'description'>>,
): Promise<Channel> {
  const data = await trpcMutate<Record<string, unknown>>('channel.updateChannel', {
    serverId,
    channelId,
    ...(patch.name !== undefined && { name: patch.name }),
    ...(patch.topic !== undefined && { topic: patch.topic }),
  });
  return toFrontendChannel(data);
}

/**
 * Creates a new channel via tRPC.
 */
export async function createChannel(
  channel: Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Channel> {
  const data = await trpcMutate<Record<string, unknown>>('channel.createChannel', {
    serverId: channel.serverId,
    name: channel.name,
    slug: channel.slug,
    type: channel.type,
    visibility: channel.visibility,
    topic: channel.topic,
    position: channel.position,
  });
  return toFrontendChannel(data);
}

/**
 * Deletes a channel by ID via tRPC. Returns true if deleted.
 */
export async function deleteChannel(channelId: string, serverId?: string): Promise<boolean> {
  if (!serverId) {
    throw new Error('serverId is required for deleteChannel');
  }
  await trpcMutate('channel.deleteChannel', { serverId, channelId });
  return true;
}

// Re-export ChannelVisibility for convenience
export { ChannelVisibility };
