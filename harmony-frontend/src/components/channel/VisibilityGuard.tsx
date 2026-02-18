/**
 * Channel Component: VisibilityGuard
 * Gates guest access based on channel visibility state.
 *
 * Visibility rules:
 *   PUBLIC_INDEXABLE  → render children
 *   PUBLIC_NO_INDEX   → render children (same guest experience)
 *   PRIVATE           → render AccessDeniedPage
 *
 * Ref: dev-spec-guest-public-channel-view.md — VisibilityGuard (C1.2)
 */

"use client";

import React from "react";
import Link from "next/link";
import { ChannelVisibility } from "@/types";

// ─── Loading state ────────────────────────────────────────────────────────────

function VisibilityLoading() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <svg
          className="h-8 w-8 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p className="text-sm">Checking access…</p>
      </div>
    </div>
  );
}

// ─── Error state (channel not found / fetch failed) ───────────────────────────

function VisibilityError({ message }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-7 w-7 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Channel not found</h2>
          <p className="mt-1 text-sm text-gray-500">
            {message ?? "This channel doesn't exist or could not be loaded."}
          </p>
        </div>

        <Link
          href="/"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

// ─── Access denied page (PRIVATE channel) ────────────────────────────────────

function AccessDeniedPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex max-w-sm flex-col items-center gap-5 text-center">
        {/* Lock icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-8 w-8 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Copy */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">This channel is private</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign up or log in to request access to this channel.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-2">
          <Link
            href="/auth/register"
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Create Account
          </Link>
          <Link
            href="/auth/login"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface VisibilityGuardProps {
  /** Current channel visibility state. Pass null while loading. */
  visibility: ChannelVisibility | null;
  /** Set to true while the channel is being fetched */
  isLoading?: boolean;
  /** Set to an error message if the channel fetch failed */
  error?: string | null;
  /** Content to render when the channel is accessible */
  children: React.ReactNode;
}

export function VisibilityGuard({
  visibility,
  isLoading,
  error,
  children,
}: VisibilityGuardProps) {
  if (isLoading) {
    return <VisibilityLoading />;
  }

  if (error || visibility === null) {
    return <VisibilityError message={error ?? undefined} />;
  }

  if (visibility === ChannelVisibility.PRIVATE) {
    return <AccessDeniedPage />;
  }

  // PUBLIC_INDEXABLE or PUBLIC_NO_INDEX — show content
  return <>{children}</>;
}
