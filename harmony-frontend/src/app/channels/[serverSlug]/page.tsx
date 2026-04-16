import { redirect } from 'next/navigation';
import { getServers } from '@/services/serverService';
import { getChannels } from '@/services/channelService';
import { publicGet } from '@/lib/trpc-client';
import { ChannelType, ChannelVisibility } from '@/types';
import { EmptyShell } from '@/components/layout/EmptyShell';
import { NoChannelsContent } from '@/components/channel/NoChannelsContent';

interface PageProps {
  params: Promise<{ serverSlug: string }>;
}

export default async function ServerPage({ params }: PageProps) {
  const { serverSlug } = await params;

  let servers;
  try {
    servers = await getServers();
  } catch {
    // Backend rejected the auth token (expired or invalid) — send to login.
    redirect('/auth/login');
  }
  const server = servers.find(s => s.slug === serverSlug);

  // Not in the user's member list — try the public channel view instead.
  if (!server) {
    const result = await publicGet<{ channels: { slug: string }[] }>(
      `/servers/${serverSlug}/channels`,
    );
    const firstPublic = result?.channels?.[0];
    if (firstPublic) redirect(`/c/${serverSlug}/${firstPublic.slug}`);
    // Server not found publicly either — fall back to channels index.
    redirect('/channels');
  }

  let channels;
  try {
    channels = await getChannels(server.id);
  } catch {
    // Not a member — fall back to public guest view.
    const result = await publicGet<{ channels: { slug: string }[] }>(
      `/servers/${serverSlug}/channels`,
    );
    const firstPublic = result?.channels?.[0];
    if (firstPublic) redirect(`/c/${serverSlug}/${firstPublic.slug}`);
    // No public channels either — fall back to channels index.
    redirect('/channels');
  }

  // Only route to non-PRIVATE text/announcement channels. PRIVATE channels require
  // an admin/owner role to read; routing a regular member there causes VisibilityGuard
  // to show a dead-end full-screen "no permission" page with no navigation. Admins
  // can still reach private channels by clicking them in the channel sidebar.
  const firstChannel = channels
    .filter(
      c =>
        (c.type === ChannelType.TEXT || c.type === ChannelType.ANNOUNCEMENT) &&
        c.visibility !== ChannelVisibility.PRIVATE,
    )
    .sort((a, b) => a.position - b.position)[0];

  if (firstChannel) {
    redirect(`/channels/${serverSlug}/${firstChannel.slug}`);
  }

  // No non-private navigable channel found. Fetch all channels across every server
  // so ServerRail can derive default channel slugs for navigation.
  const allChannels = (
    await Promise.all(
      servers.map(s =>
        s.id === server.id ? Promise.resolve(channels) : getChannels(s.id).catch(() => []),
      ),
    )
  ).flat();

  // Determine what to show in the main area:
  //   • Text/announcement channels exist but are all PRIVATE → user lacks permission
  //   • No channels at all → empty server
  //   • Only voice channels → user CAN access them; leave main blank so they can join
  const hasInaccessibleTextChannels = channels.some(
    c =>
      (c.type === ChannelType.TEXT || c.type === ChannelType.ANNOUNCEMENT) &&
      c.visibility === ChannelVisibility.PRIVATE,
  );
  const showNoAccessMessage = channels.length === 0 || hasInaccessibleTextChannels;

  return (
    <EmptyShell
      servers={servers}
      currentServer={server}
      channels={channels}
      allChannels={allChannels}
      basePath='/channels'
    >
      {showNoAccessMessage ? <NoChannelsContent /> : null}
    </EmptyShell>
  );
}
