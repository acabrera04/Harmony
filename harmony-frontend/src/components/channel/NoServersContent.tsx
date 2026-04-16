'use client';

/**
 * NoServersContent — empty-state content rendered inside EmptyShell when the
 * user has no server memberships. Offers paths to browse public servers or
 * create a new one.
 *
 * Designed to be mounted as children of EmptyShell, which provides the outer
 * 3-column layout (ServerRail + empty main area).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateServerModal } from '@/components/server-rail/CreateServerModal';
import { BrowseServersModal } from '@/components/server-rail/BrowseServersModal';
import type { Server, Channel } from '@/types';

export function NoServersContent() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  function handleCreated(server: Server, defaultChannel: Channel) {
    router.push(`/channels/${server.slug}/${defaultChannel.slug}`);
  }

  return (
    <div className='text-center'>
      <p className='text-xl font-bold text-white'>No servers yet</p>
      <p className='mt-2 text-sm text-gray-400'>
        You haven&apos;t joined any servers. Find a community or create your own.
      </p>

      <div className='mt-6 flex justify-center gap-3'>
        <button
          type='button'
          onClick={() => setIsBrowseOpen(true)}
          className='rounded bg-[#3ba55c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2d7d46]'
        >
          Browse Servers
        </button>
        <button
          type='button'
          onClick={() => setIsCreateOpen(true)}
          className='rounded bg-[#5865f2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4752c4]'
        >
          Create a Server
        </button>
      </div>

      <CreateServerModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreated}
      />

      {/* User has no servers yet, so all public servers will show "Join". */}
      <BrowseServersModal
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        joinedServerIds={new Set()}
        defaultChannelByServerId={new Map()}
        basePath='/channels'
      />
    </div>
  );
}
