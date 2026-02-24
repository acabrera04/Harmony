/**
 * Layout: HarmonyShell
 * Full Discord-like 3-column layout shell.
 * Wires together ServerRail, ChannelSidebar, TopBar, MessageArea, MembersSidebar, SearchModal.
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { TopBar } from "@/components/channel/TopBar";
import { MembersSidebar } from "@/components/channel/MembersSidebar";
import { SearchModal } from "@/components/channel/SearchModal";
import { ChannelSidebar } from "@/components/channel/ChannelSidebar";
import { MessageInput } from "@/components/channel/MessageInput";
import { ServerRail } from "@/components/server-rail/ServerRail";
import { useAuth } from "@/hooks/useAuth";
import { ChannelVisibility } from "@/types";
import type { Server, Channel, Message, User } from "@/types";

// ─── Discord colour tokens ────────────────────────────────────────────────────

const BG = {
  tertiary: "bg-[#202225]",
  primary: "bg-[#36393f]",
};

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
          <Image src={message.author.avatarUrl} alt={message.author.username} width={40} height={40} unoptimized className="h-10 w-10 rounded-full" />
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

function MessageArea({
  channel,
  messages,
  isReadOnly,
  onSendMessage,
}: {
  channel: Channel;
  messages: Message[];
  isReadOnly: boolean;
  onSendMessage: (msg: Message) => void;
}) {
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

      <MessageInput
        channelId={channel.id}
        channelName={channel.name}
        isReadOnly={isReadOnly}
        onMessageSent={onSendMessage}
      />
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
   * All channels across every server — used by ServerRail to derive the
   * correct default channel slug when navigating to another server.
   * #c32: passing only serverChannels here caused other server icons to link
   * to a non-existent route because their channels weren't in the list.
   */
  allChannels: Channel[];
  currentChannel: Channel;
  messages: Message[];
  members: User[];
  /** Base path for navigation links. Use "/c" for public guest routes, "/channels" for authenticated routes. */
  basePath?: string;
}

export function HarmonyShell({
  servers,
  currentServer,
  channels,
  allChannels,
  currentChannel,
  messages,
  members,
  basePath = "/c",
}: HarmonyShellProps) {
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // #c25: track mobile channel-sidebar state so aria-expanded on hamburger reflects reality
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Local message state so sent messages appear immediately without a page reload
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const { user: authUser, logout, isAuthenticated } = useAuth();

  // Fallback for guest/unauthenticated view
  const currentUser: User = authUser ?? {
    id: "guest",
    username: "Guest",
    displayName: "Guest",
    status: "online",
    role: "guest",
  };

  // Sync local messages whenever the channel changes so stale messages from
  // the previous channel are never shown (useState init only runs on mount)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalMessages(messages);
  }, [messages, currentChannel.id]);

  const handleMessageSent = useCallback((msg: Message) => {
    setLocalMessages((prev) => [...prev, msg]);
  }, []);

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
      {/* 1. Server rail — uses allChannels (full set) to derive default slug per server */}
      <ServerRail
        servers={servers}
        allChannels={allChannels}
        currentServerId={currentServer.id}
        basePath={basePath}
      />

      {/* 2. Channel sidebar — mobile overlay when isMenuOpen, always visible on desktop */}
      <ChannelSidebar
        server={currentServer}
        channels={channels}
        currentChannelId={currentChannel.id}
        currentUser={currentUser}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        basePath={basePath}
        isAuthenticated={isAuthenticated}
        onLogout={async () => {
          await logout();
        }}
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
          <MessageArea
            channel={currentChannel}
            messages={localMessages}
            isReadOnly={currentUser.role === "guest"}
            onSendMessage={handleMessageSent}
          />
          <MembersSidebar
            members={members}
            isOpen={isMembersOpen}
            onClose={() => setIsMembersOpen(false)}
          />
        </div>
      </div>

      <SearchModal
        messages={localMessages}
        channelName={currentChannel.name}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
