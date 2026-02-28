'use server';

/**
 * Server Action: updateChannelVisibility (Issue #30 — VisibilityToggle)
 * Resolves channel by route params, updates visibility in-memory, and
 * revalidates all affected routes so guests and admins see fresh data.
 * Mirrors the pattern from actions.ts (saveChannelSettings).
 */

import { revalidatePath } from 'next/cache';
import { ChannelVisibility } from '@/types';
import { updateVisibility, getChannel } from '@/services/channelService';

export async function updateChannelVisibility(
  serverSlug: string,
  channelSlug: string,
  visibility: ChannelVisibility,
): Promise<void> {
  // Validate the incoming enum value — don't trust client-supplied strings.
  if (!Object.values(ChannelVisibility).includes(visibility)) {
    throw new Error('Invalid visibility value');
  }

  // Resolve channel by slug so the client cannot target an arbitrary ID.
  const channel = await getChannel(serverSlug, channelSlug);
  if (!channel) {
    throw new Error('Channel not found');
  }

  // TODO (#71): Add server-side admin auth check before reaching production.

  await updateVisibility(channel.id, visibility);

  // Invalidate all route segments that render channel visibility data.
  revalidatePath(`/c/${serverSlug}`, 'layout');
  revalidatePath(`/channels/${serverSlug}`, 'layout');
  revalidatePath(`/settings/${serverSlug}`, 'layout');
}
