/**
 * Toast UI Components (Issue #35 — Toast Notification System)
 * ToastItem   — single toast with slide-in animation, type colour, X dismiss button
 * ToastContainer — fixed top-right stack rendered by ToastProvider consumers
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import type { Toast } from "@/context/ToastContext";

// Shared exit animation duration — must match the Tailwind `duration-300` class below.
const EXIT_ANIMATION_MS = 300;

// ─── Type colour map ──────────────────────────────────────────────────────────

const TYPE_STYLES: Record<Toast["type"], string> = {
  success: "bg-green-600 border-green-500",
  error:   "bg-red-600   border-red-500",
  info:    "bg-blue-600  border-blue-500",
  warning: "bg-yellow-500 border-yellow-400 text-gray-900",
};

const TYPE_ICON: Record<Toast["type"], string> = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
  warning: "⚠",
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const { cancelAutoDismiss } = useToast();
  // Drive the slide-in / slide-out animation via a mounted flag
  const [visible, setVisible] = useState(false);
  // Tracks the dismiss-delay timer so we can cancel it if the component unmounts early
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Slide in on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Slide out just before auto-dismiss fires, so the animation has time to play
  useEffect(() => {
    if (toast.duration <= 0) return;
    const slideOutDelay = toast.duration - EXIT_ANIMATION_MS;
    const timer = setTimeout(() => setVisible(false), slideOutDelay > 0 ? slideOutDelay : 0);
    return () => clearTimeout(timer);
  }, [toast.duration]);

  // Clear the dismiss delay timer on unmount to avoid calling into context after removal
  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, []);

  // Cancel the provider's auto-dismiss timer immediately (so it can't fire mid-animation),
  // animate out, then remove from context once the transition completes.
  const handleDismiss = () => {
    cancelAutoDismiss(toast.id);
    setVisible(false);
    dismissTimerRef.current = setTimeout(onDismiss, EXIT_ANIMATION_MS);
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 min-w-[280px] max-w-sm w-full",
        "rounded-md border px-4 py-3 shadow-lg text-white text-sm",
        "transition-all duration-300 ease-in-out",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        TYPE_STYLES[toast.type]
      )}
    >
      {/* Icon */}
      <span className="mt-0.5 shrink-0 font-bold text-base leading-none" aria-hidden="true">
        {TYPE_ICON[toast.type]}
      </span>

      {/* Message */}
      <p className="flex-1 leading-snug">{toast.message}</p>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 ml-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={() => dismissToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}
