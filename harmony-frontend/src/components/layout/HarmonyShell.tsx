/**
 * Layout: HarmonyShell
 * Full Discord-like 3-column layout shell.
 * Wires together ServerRail, ChannelSidebar, TopBar, MessageList, MembersSidebar, SearchModal.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TopBar } from '@/components/channel/TopBar';
import { MembersSidebar } from '@/components/channel/MembersSidebar';
import { SearchModal } from '@/components/channel/SearchModal';
import { ChannelSidebar } from '@/components/channel/ChannelSidebar';
import { MessageInput } from '@/components/channel/MessageInput';
import { MessageList } from '@/components/channel/MessageList';
import { ServerRail } from '@/components/server-rail/ServerRail';
import { GuestPromoBanner } from '@/components/channel/GuestPromoBanner';
import { useAuth } from '@/hooks/useAuth';
import type { Server, Channel, Message, User } from '@/types';

// ─── Discord colour tokens ────────────────────────────────────────────────────

const BG = {
  tertiary: 'bg-[#202225]',
  primary: 'bg-[#36393f]',
};

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
  basePath = '/c',
}: HarmonyShellProps) {
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // #c25: track mobile channel-sidebar state so aria-expanded on hamburger reflects reality
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Local message state so sent messages appear immediately without a page reload
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  // Track previous channel so we can reset localMessages synchronously on channel
  // switch — avoids a one-render flash where old messages show under the new channel header.
  const [prevChannelId, setPrevChannelId] = useState(currentChannel.id);
  if (prevChannelId !== currentChannel.id) {
    setPrevChannelId(currentChannel.id);
    setLocalMessages(messages);
  }

  const { user: authUser, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Fallback for guest/unauthenticated view
  const currentUser: User = authUser ?? {
    id: 'guest',
    username: 'Guest',
    displayName: 'Guest',
    status: 'online',
    role: 'guest',
  };

  const handleMessageSent = useCallback((msg: Message) => {
    setLocalMessages(prev => [...prev, msg]);
  }, []);

  // #c10/#c23: single global Ctrl+K / Cmd+K handler — SearchModal no longer needs its own
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(v => !v);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='flex h-screen overflow-hidden bg-[#202225] font-sans'>
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
      />

      {/* 3. Main column */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        <TopBar
          channel={currentChannel}
          serverSlug={currentServer.slug}
          userRole={currentUser.role}
          isMembersOpen={isMembersOpen}
          onMembersToggle={() => setIsMembersOpen(v => !v)}
          onSearchOpen={() => setIsSearchOpen(true)}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(v => !v)}
        />

        <div className='flex flex-1 overflow-hidden'>
          <div className={cn('flex flex-1 flex-col overflow-hidden', BG.primary)}>
            <MessageList
              key={currentChannel.id}
              channel={currentChannel}
              messages={localMessages}
            />
            <MessageInput
              channelId={currentChannel.id}
              channelName={currentChannel.name}
              isReadOnly={currentUser.role === 'guest'}
              onMessageSent={handleMessageSent}
            />
            {!isAuthLoading && !isAuthenticated && <GuestPromoBanner />}
          </div>
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
