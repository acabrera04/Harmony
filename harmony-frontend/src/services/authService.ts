/**
 * Auth Service (M4 — mock implementation)
 * Simulates async API calls with 200–500ms delay.
 * Maintains in-session auth state via an in-memory variable.
 */

import type { User } from "@/types";
import { mockCurrentUser } from "@/mocks";

// ─── Simulated delay ──────────────────────────────────────────────────────────

function delay(ms?: number): Promise<void> {
  const wait = ms ?? Math.floor(Math.random() * 301) + 200; // 200–500ms
  return new Promise((resolve) => setTimeout(resolve, wait));
}

// ─── In-memory auth state ─────────────────────────────────────────────────────

let currentUser: User | null = null;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns the current authenticated user, or null if not logged in.
 */
export async function getCurrentUser(): Promise<User | null> {
  await delay();
  return currentUser ? { ...currentUser } : null;
}

/**
 * Simulates login — returns the mock current user on success.
 * @param _username - Ignored in mock; any credentials succeed.
 * @param _password - Ignored in mock; any credentials succeed.
 */
export async function login(_username: string, _password: string): Promise<User> {
  await delay();
  currentUser = { ...mockCurrentUser };
  return { ...currentUser };
}

/**
 * Simulates logout — clears the in-memory session.
 */
export async function logout(): Promise<void> {
  await delay();
  currentUser = null;
}

/**
 * Returns true if a user is currently logged in.
 */
export async function isAuthenticated(): Promise<boolean> {
  await delay();
  return currentUser !== null;
}
