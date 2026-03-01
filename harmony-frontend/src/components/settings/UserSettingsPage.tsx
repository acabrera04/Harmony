/**
 * User Settings Page (Issue #88)
 * Client component — Discord-style sidebar settings for the current user.
 * Sections: My Account (view + edit profile), Danger Zone (logout).
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import type { UserStatus } from '@/types';

// ─── Discord colour tokens ────────────────────────────────────────────────────

const BG = {
  base: 'bg-[#313338]',
  sidebar: 'bg-[#2f3136]',
  active: 'bg-[#3d4148]',
  input: 'bg-[#1e1f22]',
};

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_COLOR: Record<UserStatus, string> = {
  online: 'bg-green-500',
  idle: 'bg-yellow-400',
  dnd: 'bg-red-500',
  offline: 'bg-gray-400',
};

const STATUS_LABEL: Record<UserStatus, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

const ALL_STATUSES: UserStatus[] = ['online', 'idle', 'dnd', 'offline'];

// ─── Sidebar sections ─────────────────────────────────────────────────────────

type Section = 'account' | 'logout';

const SECTIONS: { id: Section; label: string; danger?: boolean }[] = [
  { id: 'account', label: 'My Account' },
  { id: 'logout', label: 'Log Out', danger: true },
];

// ─── My Account section ───────────────────────────────────────────────────────

function AccountSection() {
  const { user, updateUser } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [status, setStatus] = useState<UserStatus>(user?.status ?? 'online');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync when user prop changes (e.g., context update)
  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    setDisplayName(user?.displayName ?? '');
    setStatus(user?.status ?? 'online');
    setIsDirty(false);
  }

  if (!user) return null;

  const userInitial = user.username?.[0]?.toUpperCase() ?? '?';

  function handleDisplayNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value);
    setIsDirty(true);
    setSaved(false);
    setSaveError(null);
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value as UserStatus);
    setIsDirty(true);
    setSaved(false);
    setSaveError(null);
  }

  function handleReset() {
    setDisplayName(user!.displayName ?? '');
    setStatus(user!.status);
    setIsDirty(false);
    setSaveError(null);
  }

  async function handleSave() {
    if (saving) return;
    setSaving(true);
    setSaveError(null);
    try {
      await updateUser({ displayName: displayName.trim() || undefined, status });
      setIsDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-semibold text-white'>My Account</h2>

      {/* Profile card */}
      <div className='rounded-lg bg-[#1e1f22] p-4'>
        {/* Banner + avatar row */}
        <div className='relative mb-12 h-16 rounded-t-lg bg-[#5865f2]'>
          <div className='absolute -bottom-10 left-4'>
            <div className='relative'>
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={80}
                  height={80}
                  className='h-20 w-20 rounded-full ring-4 ring-[#1e1f22]'
                  unoptimized
                />
              ) : (
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[#5865f2] text-2xl font-bold text-white ring-4 ring-[#1e1f22]'>
                  {userInitial}
                </div>
              )}
              <span
                className={cn(
                  'absolute bottom-1 right-1 h-4 w-4 rounded-full ring-2 ring-[#1e1f22]',
                  STATUS_COLOR[user.status],
                )}
                title={STATUS_LABEL[user.status]}
              />
            </div>
          </div>
        </div>

        {/* Username + role */}
        <div className='mb-4 px-1'>
          <p className='text-lg font-bold text-white'>
            {user.displayName ?? user.username}
          </p>
          <p className='text-sm text-gray-400'>#{user.username}</p>
          <span className='mt-1 inline-block rounded bg-[#3d4148] px-2 py-0.5 text-xs font-medium text-gray-300 capitalize'>
            {user.role}
          </span>
        </div>
      </div>

      {/* Editable fields */}
      <div className='flex flex-col gap-4 rounded-lg bg-[#2b2d31] p-4'>
        <h3 className='text-xs font-bold uppercase tracking-wide text-gray-400'>
          Profile
        </h3>

        {/* Display name */}
        <div>
          <label
            htmlFor='displayName'
            className='mb-1.5 block text-xs font-bold uppercase text-gray-400'
          >
            Display Name
          </label>
          <input
            id='displayName'
            type='text'
            value={displayName}
            onChange={handleDisplayNameChange}
            maxLength={32}
            className='w-full max-w-sm rounded bg-[#1e1f22] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#5865f2]'
            placeholder={user.username}
          />
          <p className='mt-1 text-xs text-gray-500'>
            This is how others see you. Leave blank to use your username.
          </p>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor='status'
            className='mb-1.5 block text-xs font-bold uppercase text-gray-400'
          >
            Status
          </label>
          <div className='flex items-center gap-2'>
            <span
              className={cn('h-3 w-3 flex-shrink-0 rounded-full', STATUS_COLOR[status])}
              aria-hidden='true'
            />
            <select
              id='status'
              value={status}
              onChange={handleStatusChange}
              className='rounded bg-[#1e1f22] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#5865f2]'
            >
              {ALL_STATUSES.map(s => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Username (read-only) */}
        <div>
          <label className='mb-1.5 block text-xs font-bold uppercase text-gray-400'>
            Username
          </label>
          <p className='text-sm text-gray-300'>#{user.username}</p>
          <p className='mt-0.5 text-xs text-gray-500'>Username cannot be changed.</p>
        </div>
      </div>

      {/* Save / reset bar */}
      {isDirty && (
        <div className='flex items-center gap-3'>
          <button
            onClick={handleSave}
            disabled={saving}
            className='rounded bg-[#248046] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a6035] disabled:opacity-50'
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={handleReset}
            disabled={saving}
            className='text-sm text-gray-400 transition-colors hover:text-gray-200 disabled:opacity-50'
          >
            Reset
          </button>
        </div>
      )}

      {saved && (
        <p className='text-sm text-green-400' role='status'>
          ✓ Profile updated
        </p>
      )}
      {saveError && (
        <p className='text-sm text-red-400' role='alert'>
          {saveError}
        </p>
      )}
    </div>
  );
}

// ─── Logout section ───────────────────────────────────────────────────────────

function LogoutSection() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      router.replace('/auth/login');
    } catch {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-semibold text-white'>Log Out</h2>
      <div className='rounded-lg border border-red-500/30 bg-red-950/20 p-4'>
        <p className='mb-4 text-sm text-gray-300'>
          You will be signed out of Harmony. Your session data will be cleared.
        </p>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50'
        >
          {isLoggingOut ? 'Signing out…' : 'Log Out'}
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function UserSettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('account');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#313338]'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-[#5865f2] border-t-transparent' />
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  return (
    <div className={cn('flex min-h-screen', BG.base)}>
      {/* Sidebar */}
      <nav
        className={cn('flex w-60 flex-shrink-0 flex-col p-4', BG.sidebar)}
        aria-label='Settings navigation'
      >
        <p className='mb-2 px-2 text-xs font-bold uppercase tracking-wide text-gray-400'>
          User Settings
        </p>
        <ul>
          {SECTIONS.map(section => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full rounded px-2 py-1.5 text-left text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? cn(BG.active, 'text-white')
                    : section.danger
                      ? 'text-red-400 hover:bg-[#3d4148] hover:text-red-300'
                      : 'text-gray-300 hover:bg-[#3d4148] hover:text-white',
                )}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        <div className='mt-auto pt-4'>
          <button
            onClick={() => router.push('/c/harmony-hq/general')}
            className='w-full rounded px-2 py-1.5 text-left text-sm text-gray-400 transition-colors hover:bg-[#3d4148] hover:text-white'
          >
            ← Back to Harmony
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className='flex-1 overflow-y-auto p-8' aria-label='Settings content'>
        <div className='mx-auto max-w-xl'>
          {activeSection === 'account' && <AccountSection />}
          {activeSection === 'logout' && <LogoutSection />}
        </div>
      </main>
    </div>
  );
}
