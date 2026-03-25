/**
 * MessageItem.test.tsx — Issue #236
 *
 * Verifies the two fixes introduced for issue #236.
 *
 * Fix 1 — Visibility:
 *   HarmonyShell.tsx now derives canPin from the current user's server-scoped role
 *   in localMembers (MODERATOR+) instead of `isAuthenticated`. This means
 *   restricted roles (MEMBER, GUEST) receive canPin=false and must not see the
 *   ⋯ More actions button. These tests verify MessageItem correctly hides the
 *   button when canPin=false.
 *
 * Fix 2 — Error message:
 *   handlePinToggle's catch block now inspects the thrown error. A FORBIDDEN
 *   rejection must surface "You don't have permission to pin messages." instead
 *   of the previous generic "Failed" label.
 *
 * Input:      User roles — member, guest (restricted) and moderator, admin, owner (elevated)
 * Comparator: Exact DOM text / exact button presence check
 * Oracle:     MEMBER/GUEST must NOT see the More actions button (canPin=false);
 *             MODERATOR+ must see it (canPin=true);
 *             a FORBIDDEN error must show "You don't have permission to pin messages."
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageItem } from '../components/message/MessageItem';
import type { Message } from '../types';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const mockPinMessageAction = jest.fn();

jest.mock('../app/actions/pinMessage', () => ({
  pinMessageAction: (...args: unknown[]) => mockPinMessageAction(...args),
  unpinMessageAction: jest.fn(),
}));

jest.mock('../lib/utils', () => ({
  formatMessageTimestamp: () => 'Jan 1, 2025',
  formatTimeOnly: () => '12:00',
}));

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const BASE_MESSAGE: Message = {
  id: 'msg-1',
  channelId: 'channel-1',
  authorId: 'user-1',
  author: { id: 'user-1', username: 'testuser' },
  content: 'Hello world',
  timestamp: new Date().toISOString(),
};

/**
 * Maps each server role to the canPin value HarmonyShell now derives.
 * Fix 1: canPin is true only for MODERATOR, ADMIN, and OWNER.
 */
const ROLE_CAN_PIN: Record<string, boolean> = {
  owner:     true,
  admin:     true,
  moderator: true,
  member:    false,
  guest:     false,
};

const RESTRICTED_ROLES = ['member', 'guest'];
const ELEVATED_ROLES   = ['moderator', 'admin', 'owner'];

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Fix 1: pin button visibility correctly gated by role ─────────────────────

describe('MessageItem — pin button hidden for restricted roles (Fix #236)', () => {
  /**
   * After the fix, HarmonyShell passes canPin=false for MEMBER and GUEST.
   * MessageItem must not render the More actions button in that case.
   */
  RESTRICTED_ROLES.forEach(role => {
    it(`${role} does NOT see the More actions button (canPin=false)`, () => {
      render(<MessageItem message={BASE_MESSAGE} canPin={ROLE_CAN_PIN[role]} serverId='server-1' />);
      expect(screen.queryByRole('button', { name: 'More actions' })).not.toBeInTheDocument();
    });
  });
});

describe('MessageItem — pin button visible for elevated roles (Fix #236)', () => {
  /**
   * After the fix, HarmonyShell passes canPin=true for MODERATOR, ADMIN, OWNER.
   * MessageItem must render the More actions button for these roles.
   */
  ELEVATED_ROLES.forEach(role => {
    it(`${role} sees the More actions button (canPin=true)`, () => {
      render(<MessageItem message={BASE_MESSAGE} canPin={ROLE_CAN_PIN[role]} serverId='server-1' />);
      expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
    });
  });
});

// ─── Fix 2: FORBIDDEN error surfaces a permission message ─────────────────────

describe('MessageItem — FORBIDDEN pin error shows permission message (Fix #236)', () => {
  /**
   * After the fix, handlePinToggle inspects the caught error. A FORBIDDEN
   * rejection must display "You don't have permission to pin messages." exactly,
   * replacing the previous generic "Failed" label.
   */
  RESTRICTED_ROLES.forEach(role => {
    it(`FORBIDDEN error shows permission message for ${role}`, async () => {
      mockPinMessageAction.mockRejectedValue(
        new Error("FORBIDDEN: You do not have permission to perform 'message:pin'"),
      );

      // canPin=true simulates the edge case where a restricted user somehow clicks
      // Pin (e.g. stale UI before the fix was deployed); the error path must still
      // return a clear permission message regardless.
      render(<MessageItem message={BASE_MESSAGE} canPin={true} serverId='server-1' />);

      fireEvent.click(screen.getByRole('button', { name: 'More actions' }));

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /pin message/i }));
      });

      expect(
        screen.getByText("You don't have permission to pin messages."),
      ).toBeInTheDocument();
    });
  });

  it('generic failure shows retry message', async () => {
    mockPinMessageAction.mockRejectedValue(new Error('Network error'));

    render(<MessageItem message={BASE_MESSAGE} canPin={true} serverId='server-1' />);

    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /pin message/i }));
    });

    expect(
      screen.getByText('Failed to pin message. Please try again.'),
    ).toBeInTheDocument();
  });
});
