/**
 * Server Service (M1 — mock implementation)
 * References: dev-spec-channel-visibility-toggle.md
 */

import type { Server, User } from "@/types";
import { mockServers, mockUsers } from "@/mocks";

// ─── In-memory store (mutated by write operations) ────────────────────────────

const servers: Server[] = [...mockServers];

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
  return servers.find((s) => s.slug === slug) ?? null;
}

/**
 * Returns all members (users) of a server by server ID.
 * In the mock layer, all users belong to every server for simplicity.
 */
export async function getServerMembers(_serverId: string): Promise<User[]> {
  // Simulate membership — real API would filter by _serverId
  return [...mockUsers];
}
