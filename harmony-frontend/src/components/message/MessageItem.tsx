/**
 * Component: MessageItem
 * Individual message row matching Discord's message style.
 * Supports a full variant (avatar + author + timestamp + content) and a
 * compact variant (no avatar/name) for grouped follow-up messages.
 */

"use client";

import { useEffect, useState } from "react";
import { formatMessageTimestamp, formatTimeOnly } from "@/lib/utils";
import type { Message, Reaction } from "@/types";

// ─── ReactionList ─────────────────────────────────────────────────────────────

function ReactionList({ reactions, messageId }: { reactions: Reaction[]; messageId: string }) {
  if (!reactions || reactions.length === 0) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {reactions.map((r) => (
        <button
          key={`${r.emoji}-${messageId}`}
          type="button"
          aria-label={`React with ${r.emoji} (${r.count} ${r.count !== 1 ? "reactions" : "reaction"})`}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300 hover:bg-white/10"
        >
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Hover action bar ─────────────────────────────────────────────────────────

/**
 * Placeholder action bar that appears on hover (or focus-within) at the
 * top-right of a message. Buttons are non-functional stubs — wire up handlers
 * when implementing reply, reactions, and message options in follow-on issues.
 *
 * Uses opacity/pointer-events toggling (not display:none) so buttons remain
 * in the DOM tab order and are reachable by keyboard users via focus-within.
 */
function ActionBar() {
  return (
    <div className="absolute -top-3 right-4 z-10 flex items-center rounded-md border border-white/10 bg-[#2f3136] shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
      {/* Reply */}
      <button
        type="button"
        aria-label="Reply"
        title="Reply"
        className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
        </svg>
      </button>

      {/* Add Reaction */}
      <button
        type="button"
        aria-label="Add Reaction"
        title="Add Reaction"
        className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm1.476 2.37a.75.75 0 0 0-1.06-1.06 4.5 4.5 0 0 1-6.832 0 .75.75 0 0 0-1.061 1.06 6 6 0 0 0 8.953 0z" />
        </svg>
      </button>

      {/* More */}
      <button
        type="button"
        aria-label="More actions"
        title="More"
        className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  );
}

// ─── MessageItem ──────────────────────────────────────────────────────────────

export function MessageItem({
  message,
  showHeader = true,
}: {
  message: Message;
  /** Set to false for grouped follow-up messages from the same author. Hides the avatar and author line. */
  showHeader?: boolean;
}) {
  const [avatarError, setAvatarError] = useState(false);

  // Reset error state when the avatar URL changes so a newly valid URL is retried.
  useEffect(() => {
    setAvatarError(false);
  }, [message.author.avatarUrl]);

  // Trim first to guard against empty-string usernames — || catches "" where ?? would not.
  const trimmedUsername = message.author.username?.trim();
  const authorInitial = trimmedUsername?.charAt(0)?.toUpperCase() || "?";

  // TODO: Author name role coloring
  // The Author type embedded in Message does not carry a role field —
  // role lives on the User entity. When real auth/user data is wired up,
  // pass the user's role here and map it to a colour:
  //   owner → #f0b132 (gold), admin → #ed4245 (red),
  //   moderator → #3ba55c (green), member/guest → text-white
  const authorNameClass = "cursor-pointer font-medium text-white hover:underline";

  if (!showHeader) {
    return (
      <div className="group relative flex gap-4 px-4 py-0.5 hover:bg-white/[0.02]">
        <ActionBar />
        {/* Spacer aligns content with the 40px avatar of the header row */}
        <div className="w-10 flex-shrink-0 text-right">
          <span className="invisible text-[10px] text-gray-500 group-hover:visible group-focus-within:visible">
            {formatTimeOnly(message.timestamp)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#dcddde]">
            {message.content}
            {message.editedAt && (
              <span className="ml-1 text-[10px] text-gray-500">(edited)</span>
            )}
          </p>
          <ReactionList reactions={message.reactions ?? []} messageId={message.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex gap-4 px-4 py-0.5 hover:bg-white/[0.02]">
      <ActionBar />
      {/* Avatar */}
      <div className="mt-0.5 flex-shrink-0">
        {message.author.avatarUrl && !avatarError ? (
          <img
            src={message.author.avatarUrl}
            alt={message.author.username}
            className="h-10 w-10 rounded-full"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865f2] text-sm font-bold text-white">
            {authorInitial}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={authorNameClass}>
            {message.author.displayName ?? message.author.username}
          </span>
          <span className="text-[11px] text-gray-400">
            {formatMessageTimestamp(message.timestamp)}
          </span>
          {message.editedAt && (
            <span className="text-[10px] text-gray-500">(edited)</span>
          )}
        </div>
        <p className="mt-0.5 whitespace-pre-line text-sm leading-relaxed text-[#dcddde]">{message.content}</p>
        <ReactionList reactions={message.reactions ?? []} messageId={message.id} />
      </div>
    </div>
  );
}
