/**
 * useToast hook (Issue #35 — Toast Notification System)
 * Exposes showToast() from ToastContext to any component in the tree.
 */

import { useContext } from "react";
import { ToastContext } from "@/context/ToastContext";
import type { ToastContextValue } from "@/context/ToastContext";

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
