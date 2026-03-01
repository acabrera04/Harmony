/**
 * Settings page — user settings (Issue #88).
 * Replaces the placeholder. Renders the full UserSettingsPage client component.
 */

import { UserSettingsPage } from '@/components/settings/UserSettingsPage';

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function SettingsPage({ searchParams }: PageProps) {
  const { returnTo } = await searchParams;
  return <UserSettingsPage returnTo={returnTo} />;
}
