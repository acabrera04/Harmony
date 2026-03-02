'use server';

import { getChannel, ChannelVisibility } from '@/services/channelService';

/**
 * Returns true if the channel at the given slugs is publicly accessible to
 * unauthenticated users (PUBLIC_INDEXABLE or PUBLIC_NO_INDEX). Returns false
 * for PRIVATE channels and channels that don't exist.
 *
 * Deliberately does NOT expose the raw ChannelVisibility enum to avoid
 * channel-existence probing by iterating slug combinations.
 */
export async function isChannelGuestAccessible(
  serverSlug: string,
  channelSlug: string,
): Promise<boolean> {
  const channel = await getChannel(serverSlug, channelSlug);
  if (!channel) return false;
  return channel.visibility !== ChannelVisibility.PRIVATE;
}
