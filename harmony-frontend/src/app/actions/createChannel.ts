'use server';

/**
 * Server Action: createChannelAction (Issue #44 — Channel Creation Modal)
 * Validates input and delegates to channelService.createChannel().
 * Mirrors the guard pattern in actions.ts / updateVisibility.ts.
 */

import { ChannelType, ChannelVisibility, type Channel } from '@/types';
import { createChannel } from '@/services/channelService';

export interface CreateChannelInput {
  serverId: string;
  /** Normalised slug — must be [a-z0-9-], no leading/trailing hyphens. */
  slug: string;
  name: string;
  type: ChannelType;
  visibility: ChannelVisibility;
  topic?: string;
  position: number;
}

export async function createChannelAction(input: CreateChannelInput): Promise<Channel> {
  // Validate enum values — don't trust client-supplied strings.
  if (!Object.values(ChannelType).includes(input.type)) {
    throw new Error('Invalid channel type');
  }
  if (!Object.values(ChannelVisibility).includes(input.visibility)) {
    throw new Error('Invalid visibility value');
  }

  // Validate slug: non-empty, starts/ends with alphanumeric, only [a-z0-9-].
  const slug = input.slug;
  if (
    !slug ||
    !/^[a-z0-9]/.test(slug) ||
    !/[a-z0-9]$/.test(slug) ||
    /[^a-z0-9-]/.test(slug)
  ) {
    throw new Error('Invalid channel name');
  }

  // TODO (#71): add server-side auth check here before production.

  return createChannel({
    serverId: input.serverId,
    slug,
    name: slug, // display name == slug (matches existing mock convention)
    type: input.type,
    visibility: input.visibility,
    topic: input.topic,
    position: input.position,
  });
}
