import { redirect } from 'next/navigation';
import { getServers } from '@/services/serverService';

export const dynamic = 'force-dynamic';

/**
 * /channels index — redirects to the user's first server,
 * or shows a placeholder if they haven't joined any.
 */
export default async function ChannelsPage() {
  const servers = await getServers();
  const first = servers[0];
  if (first) redirect(`/channels/${first.slug}`);

  return (
    <div className='flex h-screen items-center justify-center bg-discord-bg-primary text-center'>
      <div>
        <p className='text-xl font-bold text-white'>No servers yet</p>
        <p className='mt-2 text-sm text-discord-text-muted'>You haven&apos;t joined any servers.</p>
      </div>
    </div>
  );
}
