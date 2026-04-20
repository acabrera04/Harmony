'use server';

/**
 * Auth note: `server.updateServer` and `server.deleteServer` tRPC procedures use
 * `authedProcedure` and verify ownership/membership server-side before any mutation
 * is applied. Unauthenticated requests are rejected by the backend with UNAUTHORIZED.
 * See: harmony-backend/src/trpc/routers/server.router.ts
 */

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  updateServer,
  deleteServer,
  getServerMembersWithRole,
  changeMemberRole,
  removeMember,
} from '@/services/serverService';
import type { Server, ServerMemberInfo } from '@/types';
import { requireServerSettingsAccess } from './settings-access';

type ServerSettingsPatch = Partial<Pick<Server, 'name' | 'description' | 'icon' | 'isPublic'>>;

function sanitizeName(name: unknown): string {
  if (typeof name !== 'string') throw new Error('Invalid server name');
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Server name cannot be empty');
  if (trimmed.length > 100) throw new Error('Server name must be 100 characters or fewer.');
  return trimmed;
}

function sanitizeTrimmedString(value: unknown, errorMessage: string): string {
  if (typeof value !== 'string') throw new Error(errorMessage);
  return value.trim();
}

function sanitizeServerSettingsPatch(patch: ServerSettingsPatch): ServerSettingsPatch {
  const sanitizedPatch: ServerSettingsPatch = {};

  if (patch.name !== undefined) {
    sanitizedPatch.name = sanitizeName(patch.name);
  }

  if (patch.description !== undefined) {
    sanitizedPatch.description = sanitizeTrimmedString(
      patch.description,
      'Invalid server description',
    );
  }

  if (patch.icon !== undefined) {
    sanitizedPatch.icon = sanitizeTrimmedString(patch.icon, 'Invalid server icon');
  }

  if (patch.isPublic !== undefined) {
    if (typeof patch.isPublic !== 'boolean') throw new Error('Invalid visibility');
    sanitizedPatch.isPublic = patch.isPublic;
  }

  return sanitizedPatch;
}

export async function saveServerSettings(
  serverSlug: string,
  patch: ServerSettingsPatch,
): Promise<void> {
  const server = await requireServerSettingsAccess(serverSlug, 'throw');
  const sanitizedPatch = sanitizeServerSettingsPatch(patch);

  // The backend updateServer takes the server ID, not slug
  await updateServer(server.id, sanitizedPatch);

  revalidatePath(`/channels/${serverSlug}`, 'layout');
  revalidatePath(`/c/${serverSlug}`, 'layout');
  revalidatePath(`/settings/${serverSlug}`, 'layout');
}

export async function deleteServerAction(serverSlug: string): Promise<void> {
  const server = await requireServerSettingsAccess(serverSlug, 'throw');

  // The backend deleteServer takes the server ID and handles cascade deletion
  await deleteServer(server.id);

  revalidatePath('/channels', 'layout');
  revalidatePath('/c', 'layout');

  // redirect() throws internally — must not be inside a try/catch.
  // Redirect to root; homepage handles routing to a valid server.
  redirect('/');
}

export async function getServerMembersAction(serverSlug: string): Promise<ServerMemberInfo[]> {
  const server = await requireServerSettingsAccess(serverSlug, 'throw');
  return getServerMembersWithRole(server.id);
}

export async function changeMemberRoleAction(
  serverSlug: string,
  targetUserId: string,
  newRole: 'ADMIN' | 'MODERATOR' | 'MEMBER',
): Promise<void> {
  const server = await requireServerSettingsAccess(serverSlug, 'throw');
  await changeMemberRole(server.id, targetUserId, newRole);
  revalidatePath(`/settings/${serverSlug}`);
}

export async function removeMemberAction(serverSlug: string, targetUserId: string): Promise<void> {
  const server = await requireServerSettingsAccess(serverSlug, 'throw');
  await removeMember(server.id, targetUserId);
  revalidatePath(`/settings/${serverSlug}`);
}
