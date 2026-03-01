/**
 * Server Service (M1 — mock implementation)
 * References: dev-spec-channel-visibility-toggle.md
 */

import type { Server, User, CreateServerInput } from '@/types';
import { mockServers, mockUsers } from '@/mocks';

// ─── In-memory store (mutated by write operations) ────────────────────────────

const g = globalThis as typeof globalThis & { __harmonyServers?: Server[] };
g.__harmonyServers ??= [...mockServers];
const servers: Server[] = g.__harmonyServers;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns all servers.
 */
export async function getServers(): Promise<Server[]> {
  return [...servers];
}

/**
 * Returns a single server by its slug, or null if not found.
 */
export async function getServer(slug: string): Promise<Server | null> {
  return servers.find(s => s.slug === slug) ?? null;
}

/**
 * Returns all members (users) of a server by server ID.
 * In the mock layer, all users belong to every server for simplicity.
 */
export async function getServerMembers(_serverId: string): Promise<User[]> {
  // Simulate membership — real API would filter by _serverId
  return [...mockUsers];
}

/**
 * Creates a new server and appends it to the in-memory store.
 */
export async function createServer(input: CreateServerInput): Promise<Server> {
  const slug = input.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const existing = servers.find(s => s.slug === slug);
  if (existing) {
    throw new Error('A server with this name already exists.');
  }

  const newServer: Server = {
    id: `server-${Date.now()}`,
    name: input.name.trim(),
    slug,
    ownerId: 'user-001',
    description: input.description?.trim() ?? '',
    memberCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  servers.push(newServer);
  return { ...newServer };
}
