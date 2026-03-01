import { notFound } from 'next/navigation';
import { getServers, getServerMembers } from '@/services/serverService';
import { getChannels } from '@/services/channelService';
import { getMessages } from '@/services/messageService';
import { HarmonyShell } from '@/components/layout/HarmonyShell';
import { VisibilityGuard } from '@/components/channel/VisibilityGuard';
import { AuthRedirect } from '@/components/channel/AuthRedirect';
import { ChannelVisibility } from '@/types';

interface ChannelPageContentProps {
  serverSlug: string;
  channelSlug: string;
  /** When true, wraps content in VisibilityGuard to deny guest access to PRIVATE channels. */
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

  const serverChannels = await getChannels(server.id);
  const channel = serverChannels.find(c => c.slug === channelSlug);
  if (!channel) notFound();

  const channelsPath = `/channels/${serverSlug}/${channelSlug}`;

  // For PRIVATE channels in guest view, skip expensive fetches — VisibilityGuard
  // renders AccessDeniedPage for unauthenticated users, and AuthRedirect handles
  // the case where an authenticated user reaches this guest route.
  if (isGuestView && channel.visibility === ChannelVisibility.PRIVATE) {
    return (
      <>
        <AuthRedirect to={channelsPath} />
        <VisibilityGuard visibility={channel.visibility} isLoading={false}>
          <></>
        </VisibilityGuard>
      </>
    );
  }

  // Gather all channels across servers for cross-server navigation
  const allChannels = (
    await Promise.all(
      servers.map(s => (s.id === server.id ? Promise.resolve(serverChannels) : getChannels(s.id))),
    )
  ).flat();

  // Service returns newest-first; reverse for chronological display
  const { messages } = await getMessages(channel.id);
  const sortedMessages = [...messages].reverse();

  const members = await getServerMembers(server.id);

  const shell = (
    <HarmonyShell
      servers={servers}
      currentServer={server}
      channels={serverChannels}
      allChannels={allChannels}
      currentChannel={channel}
      messages={sortedMessages}
      members={members}
      basePath={isGuestView ? '/c' : '/channels'}
    />
  );

  if (isGuestView) {
    return (
      <>
        <AuthRedirect to={channelsPath} />
        <VisibilityGuard visibility={channel.visibility} isLoading={false}>
          {shell}
        </VisibilityGuard>
      </>
    );
  }

  return shell;
}
