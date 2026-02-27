/**
 * useToast hook (Issue #35 — Toast Notification System)
 * Exposes stable action callbacks from ToastActionsContext.
 * Components that only call showToast will NOT re-render when the toast stack changes.
 */

import { useContext } from "react";
import { ToastActionsContext, ToastStateContext } from "@/context/ToastContext";
import type { ToastActionsContextValue, ToastStateContextValue } from "@/context/ToastContext";

/** Returns stable action callbacks: showToast, dismissToast, cancelAutoDismiss. */
export function useToast(): ToastActionsContextValue {
  const context = useContext(ToastActionsContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/** Returns the live toasts array. Only use in components that render toasts (e.g. ToastContainer). */
export function useToastState(): ToastStateContextValue {
  const context = useContext(ToastStateContext);
  if (!context) {
    throw new Error("useToastState must be used within a ToastProvider");
  }
  return context;
}
