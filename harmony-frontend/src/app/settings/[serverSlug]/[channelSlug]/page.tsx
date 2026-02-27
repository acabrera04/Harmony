import { notFound } from 'next/navigation';
import { getChannel } from '@/services/channelService';
import { ChannelSettingsPage } from '@/components/settings/ChannelSettingsPage';

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export default async function SettingsPage({ params }: PageProps) {
  const { serverSlug, channelSlug } = await params;

  const channel = await getChannel(serverSlug, channelSlug);
  if (!channel) notFound();

  return <ChannelSettingsPage channel={channel} serverSlug={serverSlug} />;
}
