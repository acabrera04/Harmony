'use server';

import type { Message } from '@/types';
import { trpcQuery } from '@/lib/trpc-client';

/**
 * Server action to fetch pinned messages for a channel.
 * Wraps the tRPC getPinnedMessages query (server-only, requires next/headers).
 */
export async function getPinnedMessagesAction(
  channelId: string,
  serverId: string,
): Promise<Message[]> {
  return trpcQuery<Message[]>('message.getPinnedMessages', { channelId, serverId });
}
