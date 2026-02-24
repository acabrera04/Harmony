/**
 * Settings page — placeholder for user settings.
 * Linked from UserStatusBar gear icon (Issue #28).
 */

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#36393f]">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">User Settings</h1>
        <p className="mb-6 text-gray-400">
          Settings are not available yet. This page is a placeholder.
        </p>
        <Link
          href="/c/harmony-hq/general"
          className="inline-block rounded bg-[#5865f2] px-4 py-2 text-sm font-medium text-white hover:bg-[#4752c4]"
        >
          Back to Harmony
        </Link>
      </div>
    </div>
  );
}
