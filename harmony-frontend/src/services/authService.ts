/**
 * Auth Service (M4 — mock implementation)
 * Maintains in-session auth state via an in-memory variable.
 */

import type { User } from "@/types";
import { mockCurrentUser } from "@/mocks";

// ─── In-memory auth state ─────────────────────────────────────────────────────

let currentUser: User | null = null;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns the current authenticated user, or null if not logged in.
 */
export async function getCurrentUser(): Promise<User | null> {
  return currentUser ? { ...currentUser } : null;
}

/**
 * Simulates login — returns the mock current user on success.
 * @param _username - Ignored in mock; any credentials succeed.
 * @param _password - Ignored in mock; any credentials succeed.
 */
export async function login(_username: string, _password: string): Promise<User> {
  currentUser = { ...mockCurrentUser };
  return { ...currentUser };
}

/**
 * Simulates logout — clears the in-memory session.
 */
export async function logout(): Promise<void> {
  currentUser = null;
}

/**
 * Returns true if a user is currently logged in.
 */
export async function isAuthenticated(): Promise<boolean> {
  return currentUser !== null;
}
