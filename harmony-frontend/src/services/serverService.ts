/**
 * Server Service (M1 — mock implementation)
 * Simulates async API calls with 200–500ms delay.
 * References: dev-spec-channel-visibility-toggle.md
 */

import type { Server, User } from "@/types";
import { mockServers, mockUsers } from "@/mocks";

// ─── Simulated delay ──────────────────────────────────────────────────────────

function delay(ms?: number): Promise<void> {
  const wait = ms ?? Math.floor(Math.random() * 301) + 200; // 200–500ms
  return new Promise((resolve) => setTimeout(resolve, wait));
}

// ─── In-memory store (mutated by write operations) ────────────────────────────

const servers: Server[] = [...mockServers];

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns all servers.
 */
export async function getServers(): Promise<Server[]> {
  await delay();
  return [...servers];
}

/**
 * Returns a single server by its slug, or null if not found.
 */
export async function getServer(slug: string): Promise<Server | null> {
  await delay();
  return servers.find((s) => s.slug === slug) ?? null;
}

/**
 * Returns all members (users) of a server by server ID.
 * In the mock layer, all users belong to every server for simplicity.
 */
export async function getServerMembers(_serverId: string): Promise<User[]> {
  await delay();
  // Simulate membership — real API would filter by _serverId
  return [...mockUsers];
}
