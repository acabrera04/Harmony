import { ChannelPageContent } from '@/components/channel/ChannelPageContent';

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export default async function ChannelPage({ params }: PageProps) {
  const { serverSlug, channelSlug } = await params;
  return <ChannelPageContent serverSlug={serverSlug} channelSlug={channelSlug} isGuestView />;
}
