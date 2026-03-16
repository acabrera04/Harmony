/**
 * useServerEvents — Issue #185 / #186
 *
 * Subscribes to real-time SSE events for a server.
 * Handles channel list updates (created/updated/deleted) and member list
 * updates (joined/left) over the single /api/events/server/:serverId endpoint.
 *
 * Uses the native EventSource API (no library needed).
 *
 * Usage:
 *   useServerEvents({
 *     serverId,
 *     onChannelCreated: (ch) => setChannels(prev => [...prev, ch]),
 *     onChannelUpdated: (ch) => setChannels(prev => prev.map(c => c.id === ch.id ? ch : c)),
 *     onChannelDeleted: (id) => setChannels(prev => prev.filter(c => c.id !== id)),
 *     onMemberJoined: (user) => setMembers(prev => [...prev, user]),
 *     onMemberLeft: (userId) => setMembers(prev => prev.filter(m => m.id !== userId)),
 *   });
 */

'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import type { Channel } from '@/types/channel';
import type { User } from '@/types/user';
import { getAccessToken } from '@/lib/api-client';

export interface UseServerEventsOptions {
  serverId: string;
  onChannelCreated: (channel: Channel) => void;
  onChannelUpdated: (channel: Channel) => void;
  onChannelDeleted: (channelId: string) => void;
  /** Called when a member joins the server. Optional. */
  onMemberJoined?: (user: User) => void;
  /** Called with the userId when a member leaves or is kicked. Optional. */
  onMemberLeft?: (userId: string) => void;
  /** Set to false to disable the connection (e.g. for unauthenticated guests). Defaults to true. */
  enabled?: boolean;
}

export function useServerEvents({
  serverId,
  onChannelCreated,
  onChannelUpdated,
  onChannelDeleted,
  onMemberJoined,
  onMemberLeft,
  enabled = true,
}: UseServerEventsOptions): void {
  // Keep stable references to callbacks so the effect doesn't re-run on every render.
  const onCreatedRef = useRef(onChannelCreated);
  const onUpdatedRef = useRef(onChannelUpdated);
  const onDeletedRef = useRef(onChannelDeleted);
  const onMemberJoinedRef = useRef(onMemberJoined);
  const onMemberLeftRef = useRef(onMemberLeft);

  useLayoutEffect(() => {
    onCreatedRef.current = onChannelCreated;
    onUpdatedRef.current = onChannelUpdated;
    onDeletedRef.current = onChannelDeleted;
    onMemberJoinedRef.current = onMemberJoined;
    onMemberLeftRef.current = onMemberLeft;
  });

  useEffect(() => {
    if (!enabled || !serverId) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    const token = getAccessToken();
    if (!token) return;

    const url = `${apiUrl}/api/events/server/${serverId}?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    const handleCreated = (event: MessageEvent<string>) => {
      try {
        const channel = JSON.parse(event.data) as Channel;
        onCreatedRef.current(channel);
      } catch {
        // Ignore malformed payloads
      }
    };

    const handleUpdated = (event: MessageEvent<string>) => {
      try {
        const channel = JSON.parse(event.data) as Channel;
        onUpdatedRef.current(channel);
      } catch {
        // Ignore malformed payloads
      }
    };

    const handleDeleted = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as { channelId: string };
        onDeletedRef.current(payload.channelId);
      } catch {
        // Ignore malformed payloads
      }
    };

    const handleMemberJoined = (event: MessageEvent<string>) => {
      try {
        const user = JSON.parse(event.data) as User;
        onMemberJoinedRef.current?.(user);
      } catch {
        // Ignore malformed payloads
      }
    };

    const handleMemberLeft = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as { userId: string };
        onMemberLeftRef.current?.(payload.userId);
      } catch {
        // Ignore malformed payloads
      }
    };

    es.addEventListener('channel:created', handleCreated);
    es.addEventListener('channel:updated', handleUpdated);
    es.addEventListener('channel:deleted', handleDeleted);
    es.addEventListener('member:joined', handleMemberJoined);
    es.addEventListener('member:left', handleMemberLeft);

    let everOpened = false;

    es.onopen = () => {
      everOpened = true;
    };
    es.onerror = () => {
      if (!everOpened) {
        // Never successfully opened — likely 401/403. Stop retrying.
        es.close();
      }
    };

    return () => {
      es.removeEventListener('channel:created', handleCreated);
      es.removeEventListener('channel:updated', handleUpdated);
      es.removeEventListener('channel:deleted', handleDeleted);
      es.removeEventListener('member:joined', handleMemberJoined);
      es.removeEventListener('member:left', handleMemberLeft);
      es.close();
    };
  }, [serverId, enabled]);
}
