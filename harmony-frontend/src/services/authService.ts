/**
 * Auth Service (M4 — mock implementation)
 * Maintains in-session auth state via an in-memory variable.
 */

import type { User } from "@/types";
import { mockUsers } from "@/mocks";

// ─── In-memory auth state ─────────────────────────────────────────────────────

let currentUser: User | null = null;

const MOCK_PASSWORD = "password";

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Returns the current authenticated user, or null if not logged in.
 */
export async function getCurrentUser(): Promise<User | null> {
  return currentUser ? { ...currentUser } : null;
}

/**
 * Simulates login — validates username against mock users.
 * Accepts the mock password "password" for any valid user.
 */
export async function login(username: string, password: string): Promise<User> {
  const matched = mockUsers.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (!matched || password !== MOCK_PASSWORD) {
    throw new Error("Invalid username or password");
  }
  currentUser = { ...matched };
  return { ...currentUser };
}

/**
 * Restores the in-memory auth state (used after sessionStorage restore).
 */
export function setCurrentUser(user: User | null): void {
  currentUser = user ? { ...user } : null;
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
