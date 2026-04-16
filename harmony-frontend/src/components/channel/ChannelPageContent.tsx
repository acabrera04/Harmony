import { notFound, redirect } from 'next/navigation';
import { getServers, getServerMembers } from '@/services/serverService';
import { getChannels } from '@/services/channelService';
import { getMessages } from '@/services/messageService';
import { HarmonyShell } from '@/components/layout/HarmonyShell';
import { PrivateChannelLockedPane } from '@/components/channel/PrivateChannelLockedPane';
import { getSessionUser } from '@/lib/trpc-client';
import { ChannelVisibility } from '@/types';

interface ChannelPageContentProps {
  serverSlug: string;
  channelSlug: string;
  /** When true, uses the /c basePath so sidebar links stay on the guest route. */
  isGuestView?: boolean;
}

export async function ChannelPageContent({
  serverSlug,
  channelSlug,
  isGuestView = false,
}: ChannelPageContentProps) {
  const servers = await getServers();
  const server = servers.find(s => s.slug === serverSlug);
  if (!server) notFound();

  let serverChannels;
  try {
    serverChannels = await getChannels(server.id);
  } catch {
    redirect(`/c/${serverSlug}/${channelSlug}`);
  }
  const channel = serverChannels.find(c => c.slug === channelSlug);
  if (!channel) notFound();

  const allChannels = (
    await Promise.all(
      servers.map(s =>
        s.id === server.id ? Promise.resolve(serverChannels) : getChannels(s.id).catch(() => []),
      ),
    )
  ).flat();

  const [members, sessionUser] = await Promise.all([
    getServerMembers(server.id),
    getSessionUser(),
  ]);

  const currentMember = sessionUser ? members.find(m => m.id === sessionUser.id) : undefined;
  const isServerAdmin =
    sessionUser?.isSystemAdmin ||
    currentMember?.role === 'admin' ||
    currentMember?.role === 'owner';
  const isLockedPrivateChannel = channel.visibility === ChannelVisibility.PRIVATE && !isServerAdmin;
  const sortedMessages = isLockedPrivateChannel
    ? []
    : [...(await getMessages(channel.id, 1, { serverId: server.id })).messages].reverse();

  return (
    <HarmonyShell
      servers={servers}
      currentServer={server}
      channels={serverChannels}
      allChannels={allChannels}
      currentChannel={channel}
      messages={sortedMessages}
      members={members}
      basePath={isGuestView ? '/c' : '/channels'}
      lockedMessagePane={
        isLockedPrivateChannel ? (
          <PrivateChannelLockedPane mode={sessionUser ? 'member' : 'guest'} />
        ) : undefined
      }
    />
  );
}
