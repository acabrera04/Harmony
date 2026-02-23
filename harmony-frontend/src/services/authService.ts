/**
 * Auth Service (M4 — mock implementation)
 * Maintains in-session auth state via an in-memory variable.
 */

import type { User } from "@/types";
import { mockUsers } from "@/mocks";

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
 * Simulates login — validates username against mock users.
 * Accepts any password (mock) but requires a valid username.
 */
export async function login(username: string, _password: string): Promise<User> {
  const matched = mockUsers.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (!matched) {
    throw new Error("Invalid username");
  }
  currentUser = { ...matched };
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
