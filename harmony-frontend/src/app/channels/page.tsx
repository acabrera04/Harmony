import { redirect } from 'next/navigation';
import { getServers } from '@/services/serverService';
import { EmptyShell } from '@/components/layout/EmptyShell';
import { NoServersContent } from '@/components/channel/NoServersContent';

export const dynamic = 'force-dynamic';

/**
 * /channels index — redirects to the user's first server, or renders the
 * empty shell with a "no servers" prompt if the user hasn't joined any.
 */
export default async function ChannelsPage() {
  let servers;
  try {
    servers = await getServers();
  } catch {
    // Backend rejected the auth token (expired or invalid) — send to login.
    redirect('/auth/login');
  }
  const first = servers[0];
  if (first) redirect(`/channels/${first.slug}`);

  return (
    <EmptyShell servers={[]} basePath='/channels'>
      <NoServersContent />
    </EmptyShell>
  );
}
