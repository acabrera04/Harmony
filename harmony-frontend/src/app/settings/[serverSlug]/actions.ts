'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateServer, deleteServer, getServer } from '@/services/serverService';
import { getChannels, deleteChannel } from '@/services/channelService';
import type { Server } from '@/types';

export async function saveServerSettings(
  serverSlug: string,
  patch: Partial<Pick<Server, 'name' | 'description' | 'icon'>>,
): Promise<void> {
  // Resolve server by route param (don't trust a raw serverId from the client)
  const server = await getServer(serverSlug);
  if (!server) {
    throw new Error('Server not found');
  }
  // TODO (#71): This action has no server-side auth check. Anyone who can call
  // it can mutate server data. Enforce a server-verifiable session + role check
  // before this reaches production.

  // Build an explicit whitelist so callers cannot sneak in extra fields
  const sanitizedPatch: Partial<Pick<Server, 'name' | 'description' | 'icon'>> = {};

  if (patch.name !== undefined) {
    if (typeof patch.name !== 'string') throw new Error('Invalid server name');
    const trimmed = patch.name.trim();
    if (!trimmed) throw new Error('Server name cannot be empty');
    if (trimmed.length > 100) throw new Error('Server name must be 100 characters or fewer.');
    sanitizedPatch.name = trimmed;
  }
  if (patch.description !== undefined) {
    if (typeof patch.description !== 'string') throw new Error('Invalid server description');
    sanitizedPatch.description = patch.description.trim();
  }
  if (patch.icon !== undefined) {
    if (typeof patch.icon !== 'string') throw new Error('Invalid server icon');
    sanitizedPatch.icon = patch.icon.trim();
  }

  await updateServer(serverSlug, sanitizedPatch);

  revalidatePath(`/channels/${serverSlug}`, 'layout');
  revalidatePath(`/c/${serverSlug}`, 'layout');
  revalidatePath(`/settings/${serverSlug}`, 'layout');
}

export async function deleteServerAction(serverSlug: string): Promise<void> {
  // Resolve server first to confirm it exists
  const server = await getServer(serverSlug);
  if (!server) {
    throw new Error('Server not found');
  }
  // TODO (#71): No server-side auth check — add role enforcement before production.

  await deleteServer(serverSlug);

  // Cascade-delete all channels belonging to this server to avoid orphaned records
  const channels = await getChannels(server.id);
  await Promise.all(channels.map(c => deleteChannel(c.id)));

  revalidatePath('/channels', 'layout');
  revalidatePath('/c', 'layout');

  // redirect() throws internally — must not be inside a try/catch.
  // Redirect to root; homepage handles routing to a valid server.
  redirect('/');
}
