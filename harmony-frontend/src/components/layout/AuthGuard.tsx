'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Client-side authentication guard for protected route layouts.
 *
 * Defense-in-depth layer that catches session expiration during an active
 * session — the Next.js middleware already handles the server-side check on
 * initial navigation. Redirects unauthenticated users to /auth/login with a
 * returnUrl so they land back where they were after signing in.
 */
export function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return null;
}
