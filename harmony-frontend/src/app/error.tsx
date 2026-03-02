'use client';

/**
 * ErrorPage — generic client-side error boundary
 * Next.js App Router automatically renders this when an unhandled error is
 * thrown inside a route segment. Must be a Client Component.
 * Issue #36 — Build 404 and error pages
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error reporting service in the future
    console.error('[ErrorPage]', error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] px-4 text-center'>
      <p className='text-6xl font-black text-[#AAFF00] select-none'>:(</p>

      <h1 className='mt-4 text-2xl font-bold text-white'>Something went wrong.</h1>

      <p className='mt-2 max-w-sm text-sm text-[#666666]'>
        An unexpected error occurred. You can try again, or head back home if the problem persists.
      </p>

      <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row'>
        <button
          onClick={reset}
          className='rounded bg-[#AAFF00] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#88CC00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]'
        >
          Try again
        </button>

        <Link
          href='/'
          className='text-sm font-medium text-[#666666] underline-offset-4 hover:text-white hover:underline transition-colors'
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
