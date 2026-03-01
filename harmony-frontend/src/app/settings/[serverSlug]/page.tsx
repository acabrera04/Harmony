import { notFound } from 'next/navigation';
import { getServer } from '@/services/serverService';
import { ServerSettingsPage } from '@/components/settings/ServerSettingsPage';

interface PageProps {
  params: Promise<{ serverSlug: string }>;
}

export default async function ServerSettingsRoute({ params }: PageProps) {
  const { serverSlug } = await params;
  const server = await getServer(serverSlug);
  if (!server) notFound();

  return <ServerSettingsPage server={server} serverSlug={serverSlug} />;
}
