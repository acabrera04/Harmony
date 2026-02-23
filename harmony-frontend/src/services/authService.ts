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
 * Any password is accepted for demo purposes.
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

/**
 * Simulates account creation — adds a new user to mock data and logs them in.
 * Rejects duplicate usernames.
 */
export async function register(
  username: string,
  displayName: string,
  _password: string
): Promise<User> {
  const exists = mockUsers.some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (exists) {
    throw new Error("Username already taken");
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    displayName,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    status: "online",
    role: "member",
  };

  mockUsers.push(newUser);
  currentUser = { ...newUser };
  return { ...currentUser };
}
