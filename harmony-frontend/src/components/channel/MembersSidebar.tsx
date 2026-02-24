/**
 * Channel Component: MembersSidebar
 * Right-side panel listing server members grouped by role with status indicators.
 * Toggleable from TopBar; renders as an overlay on mobile.
 * Ref: dev-spec-guest-public-channel-view.md — C1.7 MembersSidebar
 */

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { User, UserRole, UserStatus } from "@/types";

// ─── Status dot ───────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<UserStatus, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-400",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

function StatusDot({ status }: { status: UserStatus }) {
  return (
    <span
      className={cn("block h-2.5 w-2.5 rounded-full ring-2 ring-[#2f3136]", STATUS_COLOR[status])}
      aria-label={status}
    />
  );
}

// ─── Role ordering and labels ─────────────────────────────────────────────────

const ROLE_ORDER: UserRole[] = ["owner", "admin", "moderator", "member", "guest"];

const ROLE_LABEL: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  moderator: "Moderator",
  member: "Members",
  guest: "Guests",
};

// ─── Group members by role, online-first within each group ───────────────────

function groupMembers(members: User[]): { role: UserRole; users: User[] }[] {
  const map = new Map<UserRole, User[]>();

  for (const user of members) {
    const group = map.get(user.role) ?? [];
    group.push(user);
    map.set(user.role, group);
  }

  // Within each group: online/idle/dnd first, offline last
  const ONLINE_STATUSES: UserStatus[] = ["online", "idle", "dnd"];
  for (const [role, users] of map) {
    map.set(
      role,
      users.sort((a, b) => {
        const aOnline = ONLINE_STATUSES.includes(a.status) ? 0 : 1;
        const bOnline = ONLINE_STATUSES.includes(b.status) ? 0 : 1;
        return aOnline - bOnline;
      })
    );
  }

  return ROLE_ORDER.filter((r) => map.has(r)).map((role) => ({
    role,
    users: map.get(role)!,
  }));
}

// ─── Member row ───────────────────────────────────────────────────────────────

function MemberRow({ user }: { user: User }) {
  const isOffline = user.status === "offline";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded px-2 py-1.5 transition-colors hover:bg-white/10 cursor-pointer",
        isOffline && "opacity-40"
      )}
    >
      {/* Avatar + status dot */}
      <div className="relative flex-shrink-0">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865f2] text-sm font-semibold text-white">
            {user.username.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5">
          <StatusDot status={user.status} />
        </span>
      </div>

      {/* Name */}
      <span className="truncate text-sm font-medium text-gray-300">
        {user.displayName ?? user.username}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface MembersSidebarProps {
  /** List of server members to display */
  members: User[];
  /** Whether the sidebar is visible */
  isOpen: boolean;
  /** Callback to close the sidebar (used by mobile overlay close button) */
  onClose?: () => void;
}

export function MembersSidebar({ members, isOpen, onClose }: MembersSidebarProps) {
  const groups = groupMembers(members);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        aria-label="Members list"
        className={cn(
          "flex w-60 flex-col bg-[#2f3136]",
          // Hidden when closed, visible when open
          !isOpen && "hidden",
          // Mobile: fixed overlay from right; desktop: static in layout flow
          isOpen && "fixed inset-y-0 right-0 z-30 flex sm:static sm:z-auto"
        )}
      >
        {/* Close button — mobile only */}
        <div className="flex items-center justify-between border-b border-black/20 px-4 py-3 sm:hidden">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Members</h2>
          <button
            onClick={onClose}
            aria-label="Close members list"
            className="rounded p-1 text-gray-400 hover:bg-white/10 hover:text-gray-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Member groups */}
        <div className="flex-1 overflow-y-auto p-3">
          {groups.map(({ role, users }) => (
            <div key={role} className="mb-4">
              <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {ROLE_LABEL[role]} — {users.length}
              </p>
              <div className="space-y-0.5">
                {users.map((user) => (
                  <MemberRow key={user.id} user={user} />
                ))}
              </div>
            </div>
          ))}

          {members.length === 0 && (
            <p className="px-2 text-sm text-gray-500">No members found.</p>
          )}
        </div>
      </aside>
    </>
  );
}
