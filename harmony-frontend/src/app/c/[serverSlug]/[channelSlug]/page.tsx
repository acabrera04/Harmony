import type { Metadata } from 'next';
import { GuestChannelView } from '@/components/channel/GuestChannelView';
import { getServer } from '@/services/serverService';
import { getChannel, ChannelVisibility } from '@/services/channelService';

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serverSlug, channelSlug } = await params;
  const [server, channel] = await Promise.all([
    getServer(serverSlug),
    getChannel(serverSlug, channelSlug),
  ]);

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
