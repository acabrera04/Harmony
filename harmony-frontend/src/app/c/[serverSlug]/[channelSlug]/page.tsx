import type { Metadata } from 'next';
import { GuestChannelView } from '@/components/channel/GuestChannelView';
import { getServer } from '@/services/serverService';
import { getChannels } from '@/services/channelService';
import { ChannelVisibility } from '@/types';

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serverSlug, channelSlug } = await params;
  const server = await getServer(serverSlug);
  const channel = server
    ? (await getChannels(server.id)).find(c => c.slug === channelSlug)
    : undefined;

  const channelName = channel?.name ?? channelSlug;
  const serverName = server?.name ?? serverSlug;
  const isIndexable = channel?.visibility === ChannelVisibility.PUBLIC_INDEXABLE;

  return {
    title: `${channelName} - ${serverName} | Harmony`,
    robots: { index: isIndexable, follow: true },
  };
}

export default async function GuestChannelPage({ params }: PageProps) {
  const { serverSlug, channelSlug } = await params;
  return <GuestChannelView serverSlug={serverSlug} channelSlug={channelSlug} />;
}
