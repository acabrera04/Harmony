import type { ReactNode } from 'react';
import { AuthGuard } from '@/components/layout/AuthGuard';

/** Wraps all /settings/* authenticated routes. */
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthGuard />
      {children}
    </>
  );
}
