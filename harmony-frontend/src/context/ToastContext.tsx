/**
 * Toast Context (Issue #35 — Toast Notification System)
 * Manages a stack of toasts with auto-dismiss and manual dismiss.
 * Ref: docs/dev-spec-channel-visibility-toggle.md (consumer: CL-C1.2 VisibilityToggle)
 *
 * Context is split into two to prevent unnecessary re-renders:
 *  - ToastActionsContext: stable callbacks (never changes) — used by most consumers
 *  - ToastStateContext:   toasts array (changes on every push/pop) — used only by ToastContainer
 */

"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

export interface ShowToastOptions {
  message: string;
  type: ToastType;
  /** Auto-dismiss delay in ms. Default: 3000. Pass 0 for no auto-dismiss. */
  duration?: number;
}

export interface ToastActionsContextValue {
  showToast: (options: ShowToastOptions) => void;
  dismissToast: (id: string) => void;
  /** Cancels the auto-dismiss timer for a toast without removing it from state. */
  cancelAutoDismiss: (id: string) => void;
}

export interface ToastStateContextValue {
  toasts: Toast[];
}

// ─── Contexts ─────────────────────────────────────────────────────────────────

export const ToastActionsContext = createContext<ToastActionsContextValue | null>(null);
export const ToastStateContext = createContext<ToastStateContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Track active timers so we can clear them on manual dismiss
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clear all pending timers on unmount to prevent setState-after-unmount warnings
  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cancels the auto-dismiss timer without removing the toast — used by ToastItem
  // to prevent the provider timer from firing during the manual dismiss animation.
  const cancelAutoDismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    ({ message, type, duration = 3000 }: ShowToastOptions) => {
      // Normalize duration: coerce to a finite number, clamp to >= 0, default to 3000ms.
      // Guards against NaN / Infinity / negative values that would leave the toast stuck.
      let normalizedDuration =
        typeof duration === "number" && Number.isFinite(duration) ? duration : 3000;
      if (normalizedDuration < 0) normalizedDuration = 0;

      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const toast: Toast = { id, message, type, duration: normalizedDuration };

      setToasts((prev) => [...prev, toast]);

      // Only schedule auto-dismiss when duration is positive.
      if (normalizedDuration > 0) {
        const timer = setTimeout(() => dismissToast(id), normalizedDuration);
        timers.current.set(id, timer);
      }
    },
    [dismissToast]
  );

  // Memoize so the actions context value reference stays stable across re-renders
  // caused by toasts state changes — fulfilling the "no unnecessary re-renders" goal.
  const actionsValue = useMemo(
    () => ({ showToast, dismissToast, cancelAutoDismiss }),
    [showToast, dismissToast, cancelAutoDismiss]
  );

  return (
    <ToastActionsContext.Provider value={actionsValue}>
      <ToastStateContext.Provider value={{ toasts }}>
        {children}
      </ToastStateContext.Provider>
    </ToastActionsContext.Provider>
  );
}
