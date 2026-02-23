"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types";
import * as authService from "@/services/authService";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Storage key ──────────────────────────────────────────────────────────────

const AUTH_STORAGE_KEY = "harmony_auth_user";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore persisted auth state on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
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

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const isAdmin = useCallback(() => {
    return user?.role === "owner" || user?.role === "admin";
  }, [user]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
