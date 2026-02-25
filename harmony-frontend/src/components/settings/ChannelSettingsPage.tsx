/**
 * Channel Settings Page (M1 Admin Dashboard — CL-C1.1 ChannelSettings)
 * Client component — handles sidebar nav, auth guard, and editable Overview section.
 * Ref: dev-spec-channel-visibility-toggle.md
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { Channel } from "@/types";

// ─── Discord colour tokens ────────────────────────────────────────────────────

const BG = {
  base: "bg-[#313338]",
  sidebar: "bg-[#2f3136]",
  active: "bg-[#3d4148]",
  input: "bg-[#1e1f22]",
};

// ─── Sidebar sections ─────────────────────────────────────────────────────────

type Section = "overview" | "permissions" | "visibility";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "permissions", label: "Permissions" },
  { id: "visibility", label: "Visibility" },
];

// ─── Overview section ─────────────────────────────────────────────────────────

function OverviewSection({ channel }: { channel: Channel }) {
  const [name, setName] = useState(channel.name);
  const [topic, setTopic] = useState(channel.topic ?? "");
  const [description, setDescription] = useState(channel.description ?? "");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-white">Channel Overview</h2>
      </div>

      {/* Channel Name */}
      <div>
        <label
          htmlFor="channel-name"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-300"
        >
          Channel Name
        </label>
        <input
          id="channel-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "w-full rounded px-3 py-2 text-sm text-white placeholder-gray-500 outline-none",
            "focus:ring-2 focus:ring-[#5865f2]",
            BG.input
          )}
        />
      </div>

      {/* Topic */}
      <div>
        <label
          htmlFor="channel-topic"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-300"
        >
          Channel Topic
        </label>
        <input
          id="channel-topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Let members know what this channel is about"
          className={cn(
            "w-full rounded px-3 py-2 text-sm text-white placeholder-gray-500 outline-none",
            "focus:ring-2 focus:ring-[#5865f2]",
            BG.input
          )}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="channel-description"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-300"
        >
          Description
        </label>
        <textarea
          id="channel-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Add a longer description for this channel"
          className={cn(
            "w-full resize-none rounded px-3 py-2 text-sm text-white placeholder-gray-500 outline-none",
            "focus:ring-2 focus:ring-[#5865f2]",
            BG.input
          )}
        />
      </div>

      {/* Save */}
      <div>
        <button
          type="button"
          onClick={handleSave}
          className={cn(
            "rounded px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2] transition-colors",
            saved ? "bg-[#3ba55c] hover:bg-[#2d8a4d]" : "bg-[#5865f2] hover:bg-[#4752c4]"
          )}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Coming-soon stub ─────────────────────────────────────────────────────────

function ComingSoonSection({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 text-4xl">🚧</div>
      <p className="text-lg font-semibold text-white">{label}</p>
      <p className="mt-1 text-sm text-gray-400">This section is coming soon.</p>
    </div>
  );
}

// ─── Loading spinner ──────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className={cn("flex h-screen items-center justify-center", BG.base)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#5865f2] border-t-transparent" />
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ChannelSettingsPageProps {
  channel: Channel;
  serverSlug: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChannelSettingsPage({ channel, serverSlug }: ChannelSettingsPageProps) {
  const { isAdmin, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("overview");

  const backHref = `/channels/${serverSlug}/${channel.slug}`;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !isAdmin()) {
      router.replace(backHref);
    }
  }, [isLoading, isAuthenticated, isAdmin, router, backHref]);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated || !isAdmin()) return <LoadingScreen />;

  return (
    <div className={cn("flex h-screen overflow-hidden", BG.base)}>
      {/* Settings sidebar */}
      <aside className={cn("flex w-60 flex-shrink-0 flex-col overflow-y-auto px-2 py-4", BG.sidebar)}>
        {/* Channel name heading */}
        <div className="mb-2 px-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            #{channel.name}
          </p>
        </div>

        {/* Nav items */}
        <nav aria-label="Settings sections">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={cn(
                "w-full rounded px-2 py-1.5 text-left text-sm transition-colors",
                activeSection === id
                  ? cn(BG.active, "font-medium text-white")
                  : "text-gray-400 hover:bg-[#393c43] hover:text-gray-200"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Top bar with back button */}
        <div className="flex h-12 flex-shrink-0 items-center border-b border-black/20 px-6">
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to #{channel.slug}
          </button>
        </div>

        {/* Section content */}
        <div className="px-10 py-8">
          {activeSection === "overview" && <OverviewSection channel={channel} />}
          {activeSection === "permissions" && <ComingSoonSection label="Permissions" />}
          {activeSection === "visibility" && <ComingSoonSection label="Visibility" />}
        </div>
      </main>
    </div>
  );
}
