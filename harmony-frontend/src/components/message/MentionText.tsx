'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface MentionTextProps {
  content: string;
  /** Current user's username, used to highlight self-mentions differently. */
  currentUsername?: string;
}

/**
 * Renders message content with @username tokens styled as inline mention pills.
 * Self-mentions receive an accent background; other mentions are styled dimly.
 */
export function MentionText({ content, currentUsername }: MentionTextProps) {
  if (!content.includes('@')) {
    return <>{content}</>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  // Create a fresh regex per call so shared lastIndex state never bleeds between renders.
  const re = /@([\w]{1,32})/g;
  while ((match = re.exec(content)) !== null) {
    const [full, username] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(content.slice(lastIndex, start));
    }

    const isSelf =
      currentUsername && username.toLowerCase() === currentUsername.toLowerCase();

    parts.push(
      <span
        key={key++}
        className={
          isSelf
            ? 'rounded px-0.5 font-semibold text-white bg-indigo-500/70 hover:bg-indigo-500 cursor-default'
            : 'rounded px-0.5 font-semibold text-indigo-300 bg-indigo-500/20 hover:bg-indigo-500/40 cursor-default'
        }
        title={`@${username}`}
      >
        {full}
      </span>,
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <>{parts}</>;
}

/** Hook-aware wrapper that auto-reads the current user's username. */
export function MentionTextWithSelf({ content }: { content: string }) {
  let currentUsername: string | undefined;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();
    currentUsername = user?.username;
  } catch {
    // outside auth context — no self-highlighting
  }
  return <MentionText content={content} currentUsername={currentUsername} />;
}
