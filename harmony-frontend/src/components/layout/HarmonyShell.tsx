/**
 * Layout: HarmonyShell
 * Full Discord-like 3-column layout shell.
 * Wires together ServerList, ChannelSidebar, TopBar, MessageArea, MembersSidebar, SearchModal.
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { TopBar } from "@/components/channel/TopBar";
import { MembersSidebar } from "@/components/channel/MembersSidebar";
import { SearchModal } from "@/components/channel/SearchModal";
import { useAuth } from "@/hooks/useAuth";
import { ChannelVisibility, ChannelType } from "@/types";
import type { Server, Channel, Message, User } from "@/types";

// ─── Discord colour tokens ────────────────────────────────────────────────────

const BG = {
  tertiary: "bg-[#202225]",
  secondary: "bg-[#2f3136]",
  primary: "bg-[#36393f]",
  active: "bg-[#3d4148]",
};

// ─── Server List ──────────────────────────────────────────────────────────────

function ServerPill({
  server,
  defaultChannelSlug,
  isActive,
}: {
  server: Server;
  defaultChannelSlug: string;
  isActive: boolean;
}) {
  // #c17/#c22: filter empty words explicitly before taking initials
  const initials = server.name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/c/${server.slug}/${defaultChannelSlug}`}
      title={server.name}
      className="group relative flex items-center"
    >
      <span
        className={cn(
          "absolute -left-1 w-1 rounded-r-full bg-white transition-all",
          isActive ? "h-8" : "h-0 group-hover:h-4"
        )}
      />
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-[24px] transition-all duration-200 text-white font-bold text-sm",
          isActive
            ? "rounded-[16px] bg-[#5865f2]"
            : "bg-[#36393f] group-hover:rounded-[16px] group-hover:bg-[#5865f2]"
        )}
      >
        {initials}
      </div>
    </Link>
  );
}

function ServerList({
  servers,
  allChannels,
  currentServerId,
}: {
  servers: Server[];
  allChannels: Channel[];   // #c9: used to derive first text channel per server
  currentServerId: string;
}) {
  return (
    <nav
      aria-label="Servers"
      className={cn(
        "flex w-[72px] flex-shrink-0 flex-col items-center gap-2 overflow-y-auto py-3",
        BG.tertiary
      )}
    >
      <Link
        href="/c/harmony-hq/general"
        className="group relative mb-2 flex items-center"
        title="Home"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#5865f2] text-white transition-all duration-200 group-hover:rounded-[16px]">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
        </div>
      </Link>

      <div className="mx-auto h-0.5 w-8 rounded-full bg-[#36393f]" />

      {servers.map((server) => {
        // #c9: dynamically pick the first text/announcement channel for the server
        const defaultChannel = allChannels.find(
          (c) =>
            c.serverId === server.id &&
            (c.type === ChannelType.TEXT || c.type === ChannelType.ANNOUNCEMENT)
        );
        // #c26: "general" is an assumption — all current mock servers have this channel
        const defaultChannelSlug = defaultChannel?.slug ?? "general";

        return (
          <ServerPill
            key={server.id}
            server={server}
            defaultChannelSlug={defaultChannelSlug}
            isActive={server.id === currentServerId}
          />
        );
      })}
    </nav>
  );
}

// ─── Channel Sidebar ──────────────────────────────────────────────────────────

function ChannelIcon({ type }: { type: ChannelType }) {
  if (type === ChannelType.VOICE) {
    return (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29904L6 8.00204H3C2.45 8.00204 2 8.45204 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.707C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59704 11.757 3.23204 11.383 3.07904ZM14 5.00004V7.00004C16.757 7.00004 19 9.24304 19 12C19 14.757 16.757 17 14 17V19C17.86 19 21 15.86 21 12C21 8.14004 17.86 5.00004 14 5.00004ZM14 9.00004V11C14.552 11 15 11.45 15 12C15 12.55 14.552 13 14 13V15C15.654 15 17 13.654 17 12C17 10.346 15.654 9.00004 14 9.00004Z" />
      </svg>
    );
  }
  if (type === ChannelType.ANNOUNCEMENT) {
    return (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
        <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12ZM7 6H17V8H7V6Z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.871 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41001 9L8.35001 15H14.35L15.41 9H9.41001Z" />
    </svg>
  );
}

const VISIBILITY_BADGE: Record<ChannelVisibility, string | null> = {
  [ChannelVisibility.PRIVATE]: "🔒",
  [ChannelVisibility.PUBLIC_NO_INDEX]: "👁",
  [ChannelVisibility.PUBLIC_INDEXABLE]: null,
};

function ChannelSidebar({
  server,
  channels,
  currentChannelId,
  currentUser,
  isOpen,
  onClose,
}: {
  server: Server;
  channels: Channel[];
  currentChannelId: string;
  currentUser: User;
  /** #c33: controls mobile visibility — desktop is always visible */
  isOpen: boolean;
  onClose: () => void;
}) {
  const textChannels = channels.filter(
    (c) => c.type === ChannelType.TEXT || c.type === ChannelType.ANNOUNCEMENT
  );
  const voiceChannels = channels.filter((c) => c.type === ChannelType.VOICE);

  // #c3: safe initial for empty usernames
  const userInitial = currentUser.username?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        aria-label="Channels"
        className={cn(
          "flex w-60 flex-shrink-0 flex-col overflow-hidden",
          BG.secondary,
          // Desktop: always visible in layout flow
          // Mobile: hidden by default, fixed overlay from left when open
          "hidden sm:flex",
          isOpen && "fixed inset-y-0 left-[72px] z-30 flex sm:static sm:z-auto"
        )}
      >
      <div className="flex h-12 flex-shrink-0 items-center border-b border-black/20 px-4 font-semibold text-white shadow-sm">
        <span className="truncate">{server.name}</span>
        <svg className="ml-auto h-4 w-4 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {textChannels.length > 0 && (
          <div className="mb-2">
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Text Channels
            </p>
            {textChannels.map((channel) => {
              const isActive = channel.id === currentChannelId;
              const badge = VISIBILITY_BADGE[channel.visibility];
              return (
                <Link
                  key={channel.id}
                  href={`/c/${server.slug}/${channel.slug}`}
                  className={cn(
                    "group flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors",
                    isActive
                      ? cn(BG.active, "text-white")
                      : "text-gray-400 hover:bg-[#393c43] hover:text-gray-200"
                  )}
                >
                  <ChannelIcon type={channel.type} />
                  <span className="flex-1 truncate">{channel.name}</span>
                  {badge && <span className="text-xs opacity-60">{badge}</span>}
                </Link>
              );
            })}
          </div>
        )}

        {voiceChannels.length > 0 && (
          <div className="mb-2">
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Voice Channels
            </p>
            {voiceChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex cursor-default items-center gap-1.5 rounded px-2 py-1 text-sm text-gray-400 opacity-60"
              >
                <ChannelIcon type={channel.type} />
                <span className="truncate">{channel.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={cn("flex h-14 flex-shrink-0 items-center gap-2 px-2", "bg-[#292b2f]")}>
        <div className="relative flex-shrink-0">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.username} className="h-8 w-8 rounded-full" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865f2] text-sm font-bold text-white">
              {userInitial}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#292b2f]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {currentUser.displayName ?? currentUser.username}
          </p>
          <p className="truncate text-xs text-gray-400">#{currentUser.username}</p>
        </div>
      </div>
    </nav>
    </>
  );
}

// ─── Message area ─────────────────────────────────────────────────────────────

// #c5: showHeader=false hides avatar+author line for grouped messages
function MessageBubble({ message, showHeader = true }: { message: Message; showHeader?: boolean }) {
  // #c4: safe initial for empty usernames
  const authorInitial = message.author.username?.charAt(0)?.toUpperCase() ?? "?";

  if (!showHeader) {
    // Compact follow-up line — no avatar, no author name
    return (
      <div className="group flex gap-4 px-4 py-0.5 hover:bg-white/[0.02]">
        {/* Spacer aligns with the 40px avatar of the header row */}
        <div className="w-10 flex-shrink-0 text-right">
          <span className="invisible text-[10px] text-gray-500 group-hover:visible">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-[#dcddde]">{message.content}</p>
          {message.reactions && message.reactions.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {/* #c38: use stable emoji+id key instead of array index */}
              {message.reactions.map((r) => (
                <button key={`${r.emoji}-${message.id}`} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 hover:bg-white/10">
                  <span>{r.emoji}</span>
                  <span>{r.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-4 px-4 py-0.5 hover:bg-white/[0.02]">
      <div className="mt-0.5 flex-shrink-0">
        {message.author.avatarUrl ? (
          <img src={message.author.avatarUrl} alt={message.author.username} className="h-10 w-10 rounded-full" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865f2] text-sm font-bold text-white">
            {authorInitial}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="cursor-pointer font-medium text-white hover:underline">
            {message.author.displayName ?? message.author.username}
          </span>
          <span className="text-[11px] text-gray-400">{formatRelativeTime(message.timestamp)}</span>
        </div>
        <p className="mt-0.5 text-sm leading-relaxed text-[#dcddde]">{message.content}</p>
        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {/* #c39: use stable emoji+id key instead of array index */}
            {message.reactions.map((r) => (
              <button key={`${r.emoji}-${message.id}`} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 hover:bg-white/10">
                <span>{r.emoji}</span>
                <span>{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function groupMessages(messages: Message[]) {
  type Group = { messages: Message[] };
  const groups: Group[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const prev = messages[i - 1];
    const sameAuthor = prev && prev.author.id === msg.author.id;
    // #c31: guard against invalid timestamps — NaN comparisons always return false,
    // which would silently break grouping; we treat NaN as "not within time".
    const msgTime = new Date(msg.timestamp).getTime();
    const prevTime = prev ? new Date(prev.timestamp).getTime() : NaN;
    const withinTime =
      prev &&
      !isNaN(msgTime) &&
      !isNaN(prevTime) &&
      msgTime - prevTime < 5 * 60 * 1000;

    if (sameAuthor && withinTime) {
      groups[groups.length - 1].messages.push(msg);
    } else {
      groups.push({ messages: [msg] });
    }
  }

  return groups;
}

function MessageArea({ channel, messages }: { channel: Channel; messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // #c7: only auto-scroll when already near the bottom
  const isNearBottomRef = useRef(true);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom <= 100;
  }, []);

  useEffect(() => {
    if (isNearBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const groups = groupMessages(messages);

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", BG.primary)}>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto py-4"
        onScroll={handleScroll}
      >
        {/* Channel intro header */}
        <div className="px-4 pb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#40444b]">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.871 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41001 9L8.35001 15H14.35L15.41 9H9.41001Z" />
            </svg>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-white">Welcome to #{channel.name}!</h2>
          {channel.topic && <p className="mt-1 text-sm text-gray-400">{channel.topic}</p>}
          <div className="mt-1 text-xs text-gray-500">
            {channel.visibility === ChannelVisibility.PUBLIC_INDEXABLE && "🌐 Public · Indexed by search engines"}
            {channel.visibility === ChannelVisibility.PUBLIC_NO_INDEX && "👁 Public · Not indexed"}
            {channel.visibility === ChannelVisibility.PRIVATE && "🔒 Private channel"}
          </div>
        </div>

        {/* Messages — #c5: pass showHeader=false for grouped follow-ups */}
        <div className="space-y-4">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.messages.map((msg, mi) => (
                <MessageBubble key={msg.id} message={msg} showHeader={mi === 0} />
              ))}
            </div>
          ))}
        </div>

        {messages.length === 0 && (
          <p className="px-4 text-sm text-gray-500">No messages yet — be the first to say something!</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Message input — #c2: read-only demo indicator */}
      <div className="flex-shrink-0 px-4 pb-6 pt-2">
        <div className="flex items-center gap-2 rounded-lg bg-[#40444b] px-4 py-3">
          {/* #c28/#c41: disabled prevents focus and form submission, which is
               correct for a non-functional demo input */}
          <input
            type="text"
            placeholder={`Message #${channel.name} (read-only demo)`}
            title="Sending messages is disabled in this demo"
            aria-disabled="true"
            className="flex-1 cursor-not-allowed bg-transparent text-sm text-[#dcddde] placeholder-gray-500 outline-none opacity-70"
            disabled
          />
          <button className="flex-shrink-0 text-gray-400 hover:text-gray-200" title="Emoji">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M8 13s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Shell ───────────────────────────────────────────────────────────────

export interface HarmonyShellProps {
  servers: Server[];
  currentServer: Server;
  /** Channels belonging to the current server — used by ChannelSidebar */
  channels: Channel[];
  /**
   * All channels across every server — used by ServerList to derive the
   * correct default channel slug when navigating to another server.
   * #c32: passing only serverChannels here caused other server icons to link
   * to a non-existent route because their channels weren't in the list.
   */
  allChannels: Channel[];
  currentChannel: Channel;
  messages: Message[];
  members: User[];
}

export function HarmonyShell({
  servers,
  currentServer,
  channels,
  allChannels,
  currentChannel,
  messages,
  members,
}: HarmonyShellProps) {
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // #c25: track mobile channel-sidebar state so aria-expanded on hamburger reflects reality
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user: authUser } = useAuth();

  // Fallback for guest/unauthenticated view
  const currentUser: User = authUser ?? {
    id: "guest",
    username: "Guest",
    displayName: "Guest",
    status: "online",
    role: "guest",
  };

  // #c10/#c23: single global Ctrl+K / Cmd+K handler — SearchModal no longer needs its own
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#202225] font-sans">
      {/* 1. Server list — uses allChannels (full set) to derive default slug per server */}
      <ServerList
        servers={servers}
        allChannels={allChannels}
        currentServerId={currentServer.id}
      />

      {/* 2. Channel sidebar — mobile overlay when isMenuOpen, always visible on desktop */}
      <ChannelSidebar
        server={currentServer}
        channels={channels}
        currentChannelId={currentChannel.id}
        currentUser={currentUser}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 3. Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          channel={currentChannel}
          serverSlug={currentServer.slug}
          userRole={currentUser.role}
          isMembersOpen={isMembersOpen}
          onMembersToggle={() => setIsMembersOpen((v) => !v)}
          onSearchOpen={() => setIsSearchOpen(true)}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((v) => !v)}
        />

        <div className="flex flex-1 overflow-hidden">
          <MessageArea channel={currentChannel} messages={messages} />
          <MembersSidebar
            members={members}
            isOpen={isMembersOpen}
            onClose={() => setIsMembersOpen(false)}
          />
        </div>
      </div>

      <SearchModal
        messages={messages}
        channelName={currentChannel.name}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
