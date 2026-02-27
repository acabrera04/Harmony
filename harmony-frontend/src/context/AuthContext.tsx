'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';
import * as authService from '@/services/authService';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, displayName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AUTH_STORAGE_KEY = 'harmony_auth_user';

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

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore persisted auth state on mount and sync authService
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isValidUser(parsed)) {
          setUser(parsed);
          authService.setCurrentUser(parsed);
        } else {
          sessionStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
  }, []);

  const register = useCallback(async (username: string, displayName: string, password: string) => {
    const newUser = await authService.register(username, displayName, password);
    setUser(newUser);
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const isAdmin = useCallback(() => {
    return user?.role === 'owner' || user?.role === 'admin';
  }, [user]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
