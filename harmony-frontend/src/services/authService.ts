/**
 * Auth Service (M4 — mock implementation)
 * Maintains in-session auth state via an in-memory variable.
 */

import type { User } from '@/types';
import { mockUsers } from '@/mocks';

// ─── In-memory auth state ─────────────────────────────────────────────────────

let currentUser: User | null = null;

// ─── Registered users persistence ─────────────────────────────────────────────

const REGISTERED_USERS_KEY = 'harmony_registered_users';

const VALID_STATUSES = ['online', 'idle', 'dnd', 'offline'];
const VALID_ROLES = ['owner', 'admin', 'moderator', 'member', 'guest'];

/** Runtime check that parsed JSON has the required User shape and valid enum values. */
function isValidUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.status === 'string' &&
    VALID_STATUSES.includes(obj.status) &&
    typeof obj.role === 'string' &&
    VALID_ROLES.includes(obj.role)
  );
}

function loadRegisteredUsers(): void {
  try {
    const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
    if (stored) {
      const parsed: unknown[] = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;
      for (const u of parsed) {
        if (isValidUser(u) && !mockUsers.some(m => m.id === u.id)) {
          mockUsers.push(u);
        }
      }
    }
  } catch {
    sessionStorage.removeItem(REGISTERED_USERS_KEY);
  }
}

function saveRegisteredUser(user: User): void {
  try {
    const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
    const users: User[] = stored ? JSON.parse(stored) : [];
    users.push(user);
    sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch {
    // Storage full or unavailable — user won't persist across refresh
  }
}

// Restore registered users on module load
if (typeof window !== 'undefined') {
  loadRegisteredUsers();
}

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
  const matched = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!matched) {
    throw new Error('Invalid username');
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
 * Applies a partial update to the current user's profile fields.
 * Syncs the change to mockUsers and registered-users sessionStorage so
 * the update survives logout → login within the same session.
 * Returns the updated user, or throws if no user is logged in.
 */
export async function updateCurrentUser(
  patch: Partial<Pick<User, 'displayName' | 'status'>>,
): Promise<User> {
  if (!currentUser) throw new Error('Not authenticated');
  currentUser = { ...currentUser, ...patch };

  // Sync to mockUsers array so login() picks up the change
  const idx = mockUsers.findIndex(u => u.id === currentUser!.id);
  if (idx !== -1) {
    mockUsers[idx] = { ...mockUsers[idx], ...patch };
  }

  // Sync to registered-users sessionStorage (for accounts created this session)
  try {
    const stored = sessionStorage.getItem(REGISTERED_USERS_KEY);
    if (stored) {
      const users: User[] = JSON.parse(stored);
      const regIdx = users.findIndex(u => u.id === currentUser!.id);
      if (regIdx !== -1) {
        users[regIdx] = { ...users[regIdx], ...patch };
        sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
      }
    }
  } catch {
    // sessionStorage unavailable — in-memory update is still applied
  }

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

/**
 * Simulates account creation — adds a new user to mock data and logs them in.
 * Rejects duplicate usernames.
 */
export async function register(
  username: string,
  displayName: string,
  _password: string,
): Promise<User> {
  const exists = mockUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    throw new Error('Username already taken');
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    displayName,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    status: 'online',
    role: 'member',
  };

  mockUsers.push(newUser);
  saveRegisteredUser(newUser);
  currentUser = { ...newUser };
  return { ...currentUser };
}
