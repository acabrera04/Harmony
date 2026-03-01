'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Redirects authenticated users to the given route.
 * Used inside guest (/c/) views so that a returning authenticated user is
 * bounced to the equivalent authenticated (/channels/) route automatically.
 */
export function AuthRedirect({ to }: { to: string }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace(to);
  }, [isAuthenticated, router, to]);

  return null;
}
