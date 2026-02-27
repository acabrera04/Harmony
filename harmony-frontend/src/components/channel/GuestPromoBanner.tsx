/**
 * Channel Component: GuestPromoBanner
 * Non-intrusive sticky bottom banner encouraging guests to join Harmony.
 * Dismiss state persists for the browser session via sessionStorage.
 * Based on dev spec C1.4 GuestPromoBanner
 */

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const DISMISS_KEY = 'harmony_guest_banner_dismissed';

function isDismissedInStorage(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === 'true';
  } catch {
    return false;
  }
}

export function GuestPromoBanner() {
  // Lazy initialiser reads sessionStorage once on first render (client only).
  // SSR returns true (hidden) so the banner never flashes during hydration.
  const [dismissed, setDismissed] = useState(() =>
    typeof window === 'undefined' ? true : isDismissedInStorage(),
  );

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — still dismiss in-memory
    }
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      className='sticky bottom-0 z-20 border-t border-[#2a2d31] bg-[#2f3136] px-4 py-3 shadow-lg'
    >
      <div className='mx-auto flex max-w-4xl items-center justify-between gap-4'>
        <p className='flex-1 text-sm text-gray-300'>
          Enjoying this conversation?{' '}
          <span className='font-semibold text-white'>Join Harmony</span> to participate, save
          messages, and access exclusive channels.
        </p>

        <div className='flex shrink-0 items-center gap-2'>
          <Link href='/signup' tabIndex={-1}>
            <Button variant='primary' size='sm'>
              Create Account
            </Button>
          </Link>
          <Link href='/login' tabIndex={-1}>
            <Button variant='secondary' size='sm'>
              Log In
            </Button>
          </Link>
          <button
            type='button'
            onClick={handleDismiss}
            className='ml-1 rounded p-1 text-gray-400 transition-colors hover:bg-[#40444b] hover:text-white'
            aria-label='Dismiss banner'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
              focusable='false'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
