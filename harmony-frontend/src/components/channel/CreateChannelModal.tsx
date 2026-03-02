/**
 * Channel Component: CreateChannelModal (Issue #44)
 * Modal form for creating a new channel within a server.
 * Triggered by the "+" icon next to category headers in ChannelSidebar (admins only).
 */

'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';
import { ChannelType, ChannelVisibility, type Channel } from '@/types';
import { createChannelAction } from '@/app/actions/createChannel';

// ─── Name normalisation ───────────────────────────────────────────────────────

/** Converts user-typed text into a valid channel slug. */
function toSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, '-')        // spaces → hyphens
    .replace(/[^a-z0-9-]/g, '')  // strip non-slug chars
    .replace(/^-+|-+$/g, '')     // strip leading/trailing hyphens
    .slice(0, 80);
}

function validateSlug(slug: string, existingSlugs: string[]): string | null {
  if (!slug) return 'Channel name is required.';
  if (existingSlugs.includes(slug)) return 'A channel with this name already exists.';
  return null;
}

// ─── Inline icons ─────────────────────────────────────────────────────────────

function HashIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false'>
      <path d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.871 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41001 9L8.35001 15H14.35L15.41 9H9.41001Z' />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' focusable='false'>
      <path d='M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29904L6 8.00204H3C2.45 8.00204 2 8.45204 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.707C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59704 11.757 3.23204 11.383 3.07904ZM14 5.00004V7.00004C16.757 7.00004 19 9.24304 19 12C19 14.757 16.757 17 14 17V19C17.86 19 21 15.86 21 12C21 8.14004 17.86 5.00004 14 5.00004ZM14 9.00004V11C14.552 11 15 11.45 15 12C15 12.55 14.552 13 14 13V15C15.654 15 17 13.654 17 12C17 10.346 15.654 9.00004 14 9.00004Z' />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
      <circle cx='12' cy='12' r='10' />
      <path d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
      <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
      <path d='M7 11V7a5 5 0 0 1 10 0v4' />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2.5} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className='h-4 w-4 animate-spin shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} aria-hidden='true' focusable='false'>
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
}

// ─── Visibility options (mirrors VisibilityToggle.tsx) ────────────────────────

const VISIBILITY_OPTIONS = [
  {
    value: ChannelVisibility.PRIVATE,
    label: 'Private',
    description: 'Only server members can access this channel.',
    icon: <LockIcon />,
  },
  {
    value: ChannelVisibility.PUBLIC_NO_INDEX,
    label: 'Public (Not Indexed)',
    description: 'Anyone with the link can view; not indexed by search engines.',
    icon: <EyeIcon />,
  },
  {
    value: ChannelVisibility.PUBLIC_INDEXABLE,
    label: 'Public (Search Indexed)',
    description: 'Visible to search engines and anyone with the link.',
    icon: <GlobeIcon />,
  },
] as const;

// ─── Channel type options ─────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  { value: ChannelType.TEXT, label: 'Text', icon: <HashIcon /> },
  { value: ChannelType.VOICE, label: 'Voice', icon: <SpeakerIcon /> },
] as const;

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CreateChannelModalProps {
  serverId: string;
  /** Channels already in this server — used for duplicate-slug detection. */
  existingChannels: Channel[];
  /** Pre-select a channel type when opening from a specific category header. */
  defaultType?: ChannelType;
  onCreated: (channel: Channel) => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreateChannelModal({
  serverId,
  existingChannels,
  defaultType = ChannelType.TEXT,
  onCreated,
  onClose,
}: CreateChannelModalProps) {
  const titleId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [rawName, setRawName] = useState('');
  const [type, setType] = useState<ChannelType>(defaultType);
  const [visibility, setVisibility] = useState<ChannelVisibility>(ChannelVisibility.PRIVATE);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();

  const slug = toSlug(rawName);
  const existingSlugs = existingChannels
    .filter(c => c.serverId === serverId)
    .map(c => c.slug);

  // Auto-focus name input on open.
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Focus trap + Escape-to-close.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // Guard: if focus has left the browser window and returned (e.g. Alt+Tab),
      // activeElement may be document.body — force focus back into the modal first.
      if (!container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateSlug(slug, existingSlugs);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const newChannel = await createChannelAction({
        serverId,
        slug,
        type,
        visibility,
        topic: topic.trim() || undefined,
      });
      showToast({ message: `#${slug} created successfully.`, type: 'success' });
      onCreated(newChannel);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create channel.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        className='w-full max-w-md rounded-lg bg-[#36393f] shadow-xl'
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-black/20 px-6 py-4'>
          <div>
            <h2 id={titleId} className='text-lg font-semibold text-white'>
              Create Channel
            </h2>
            <p className='mt-0.5 text-xs text-gray-400'>in this server</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close dialog'
            className='rounded p-1.5 text-gray-400 transition-colors hover:bg-[#40444b] hover:text-gray-200'
          >
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
              <path d='M18 6 6 18M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5 p-6'>

          {/* Channel type */}
          <div>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
              Channel Type
            </p>
            <div className='flex gap-2' role='group' aria-label='Channel type'>
              {TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type='button'
                  aria-pressed={type === opt.value}
                  onClick={() => {
                    setType(opt.value);
                    // PUBLIC_INDEXABLE is unavailable for voice — reset to the nearest valid option.
                    if (opt.value === ChannelType.VOICE && visibility === ChannelVisibility.PUBLIC_INDEXABLE) {
                      setVisibility(ChannelVisibility.PUBLIC_NO_INDEX);
                    }
                  }}
                  disabled={isLoading}
                  className={cn(
                    'flex flex-1 items-center gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]',
                    type === opt.value
                      ? 'border-[#5865f2] bg-[#5865f2]/20 text-white'
                      : 'border-[#40444b] bg-[#2f3136] text-gray-400 hover:border-[#5865f2]/50 hover:text-gray-200',
                    isLoading && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Channel name */}
          <div>
            <label
              htmlFor='ccm-name'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400'
            >
              Channel Name
            </label>
            {/* Prefix "#" is decorative — the real label is above */}
            <div
              className={cn(
                'flex items-center rounded-md bg-[#202225] px-3 py-2 ring-1 transition-all',
                error ? 'ring-red-500' : 'ring-[#40444b] focus-within:ring-[#5865f2]',
              )}
            >
              <span className='mr-1.5 text-gray-400 select-none' aria-hidden='true'>#</span>
              <input
                ref={nameInputRef}
                id='ccm-name'
                type='text'
                value={rawName}
                onChange={e => {
                  setRawName(e.target.value);
                  setError(null);
                }}
                placeholder='new-channel'
                maxLength={80}
                disabled={isLoading}
                autoComplete='off'
                className='flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none disabled:opacity-50'
              />
            </div>

            {/* Live slug preview */}
            {slug && (
              <p className='mt-1.5 text-xs text-gray-500'>
                Slug: <span className='text-gray-300'>#{slug}</span>
              </p>
            )}

            {/* Validation error */}
            {error && (
              <p role='alert' className='mt-1.5 text-xs text-red-400'>
                {error}
              </p>
            )}
          </div>

          {/* Topic (optional) */}
          <div>
            <label
              htmlFor='ccm-topic'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400'
            >
              Topic{' '}
              <span className='font-normal normal-case tracking-normal text-gray-500'>
                (optional)
              </span>
            </label>
            <input
              id='ccm-topic'
              type='text'
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder='What is this channel about?'
              maxLength={1024}
              disabled={isLoading}
              className='w-full rounded-md bg-[#202225] px-3 py-2 text-sm text-white placeholder-gray-500 ring-1 ring-[#40444b] transition-all focus:outline-none focus:ring-[#5865f2] disabled:opacity-50'
            />
          </div>

          {/* Visibility */}
          <div>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
              Visibility
            </p>
            <div role='radiogroup' aria-label='Channel visibility' className='space-y-2'>
              {VISIBILITY_OPTIONS.filter(opt =>
                // Voice channels have no text content to index, so PUBLIC_INDEXABLE is not applicable.
                type !== ChannelType.VOICE || opt.value !== ChannelVisibility.PUBLIC_INDEXABLE,
              ).map(opt => {
                const isSelected = visibility === opt.value;
                return (
                  <button
                    key={opt.value}
                    type='button'
                    role='radio'
                    aria-checked={isSelected}
                    onClick={() => setVisibility(opt.value)}
                    disabled={isLoading}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5865f2]',
                      isSelected
                        ? 'border-[#5865f2] bg-[#5865f2]/20 text-white'
                        : 'border-[#40444b] bg-[#2f3136] text-gray-300 hover:border-[#5865f2]/50 hover:bg-[#36393f]',
                      isLoading && 'cursor-not-allowed opacity-50',
                    )}
                  >
                    <span
                      className={cn('mt-0.5 shrink-0', isSelected ? 'text-[#5865f2]' : 'text-gray-400')}
                    >
                      {opt.icon}
                    </span>
                    <span className='flex-1'>
                      <span className='block font-medium'>{opt.label}</span>
                      <span className='text-xs text-gray-400'>{opt.description}</span>
                    </span>
                    {isSelected && (
                      <span className='mt-0.5 shrink-0 text-[#5865f2]'>
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {type === ChannelType.VOICE && (
              <p className='mt-2 text-xs text-gray-500'>
                Voice channels don&apos;t have text content, so search engine indexing isn&apos;t available.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className='flex justify-end gap-3 border-t border-black/20 pt-4'>
            <button
              type='button'
              onClick={onClose}
              disabled={isLoading}
              className='rounded px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#40444b] disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading || !slug}
              className='flex items-center gap-2 rounded bg-[#5865f2] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4752c4] disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isLoading && <SpinnerIcon />}
              {isLoading ? 'Creating…' : 'Create Channel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
