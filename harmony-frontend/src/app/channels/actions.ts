'use server';

import { revalidatePath } from 'next/cache';
import { createServer } from '@/services/serverService';
import { createChannel } from '@/services/channelService';
import { ChannelType, ChannelVisibility } from '@/types';
import type { Server, Channel } from '@/types';

export async function createServerAction(
  name: string,
  description?: string,
): Promise<{ server: Server; defaultChannel: Channel }> {
  if (typeof name !== 'string') throw new Error('Invalid server name');
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Server name is required.');
  if (trimmed.length > 100) throw new Error('Server name must be 100 characters or fewer.');

  const server = await createServer({ name: trimmed, description });

  const defaultChannel = await createChannel({
    serverId: server.id,
    name: 'general',
    slug: 'general',
    type: ChannelType.TEXT,
    visibility: ChannelVisibility.PRIVATE,
    position: 0,
  });

  revalidatePath('/channels', 'layout');

  return { server, defaultChannel };
}
