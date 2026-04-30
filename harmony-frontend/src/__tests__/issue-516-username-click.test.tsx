/**
 * issue-516-username-click.test.tsx
 *
 * Regression tests for issue #516: clicking on usernames in chat/members list
 * should open a user profile popover instead of doing nothing.
 */

// ─── Module-level mock variables ─────────────────────────────────────────────

const mockTrpcMutation = jest.fn();
const mockTrpcQuery = jest.fn();
const mockShowToast = jest.fn();
const mockPush = jest.fn();

// ─── Jest module mocks ────────────────────────────────────────────────────────

jest.mock('@/lib/api-client', () => ({
  apiClient: {
    trpcMutation: (...args: unknown[]) => mockTrpcMutation(...args),
    trpcQuery: (...args: unknown[]) => mockTrpcQuery(...args),
  },
}));

jest.mock('@/hooks/useToast', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/c/testserver/general',
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/app/actions/pinMessage', () => ({
  pinMessageAction: jest.fn(),
  unpinMessageAction: jest.fn(),
}));

jest.mock('@/app/actions/editMessage', () => ({
  editMessageAction: jest.fn(),
}));

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: () => Promise<{ default: React.ComponentType<unknown> }>) => {
    let ResolvedComponent: React.ComponentType<unknown> | null = null;
    const DynamicWrapper = (props: Record<string, unknown>) => {
      if (!ResolvedComponent) return null;
      return <ResolvedComponent {...props} />;
    };
    importFn().then(mod => { ResolvedComponent = mod.default; });
    return DynamicWrapper;
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt ?? ''} {...props} />
  ),
}));

// Stub UserProfilePopover so tests don't depend on apiClient fetching
jest.mock('@/components/shared/UserProfilePopover', () => ({
  UserProfilePopover: ({ userId, onClose }: { userId: string; onClose: () => void }) => (
    <div data-testid='user-profile-popover' data-userid={userId}>
      <button type='button' onClick={onClose} data-testid='close-popover'>
        Close
      </button>
    </div>
  ),
}));

jest.mock('@/components/channel/EmojiPickerPopover', () => ({
  EmojiPickerPopover: () => <div data-testid='emoji-picker' />,
}));

// ─── Imports ──────────────────────────────────────────────────────────────────

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageItem } from '@/components/message/MessageItem';
import { MembersSidebar } from '@/components/channel/MembersSidebar';
import type { Message } from '@/types';
import type { User } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mockUseAuth = jest.fn();

const baseMessage: Message = {
  id: 'msg-1',
  channelId: 'channel-1',
  authorId: 'user-2',
  author: {
    id: 'user-2',
    username: 'bob',
    displayName: 'Bob',
  },
  content: 'Hello world',
  timestamp: '2026-04-28T12:00:00.000Z',
};

const MEMBERS: User[] = [
  { id: 'user-1', username: 'alice', displayName: 'Alice', role: 'owner', status: 'online' },
  { id: 'user-2', username: 'bob', displayName: 'Bob', role: 'member', status: 'offline' },
];

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Issue #516 — username clicks open profile popover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 'user-1', username: 'alice' },
    });
  });

  describe('MessageItem — author name', () => {
    it('shows no popover before author name is clicked', () => {
      render(<MessageItem message={baseMessage} serverId='srv-1' />);
      expect(screen.queryByTestId('user-profile-popover')).not.toBeInTheDocument();
    });

    it('opens the profile popover when author name is clicked', () => {
      render(<MessageItem message={baseMessage} serverId='srv-1' />);

      const authorName = screen.getByText('Bob');
      fireEvent.click(authorName);

      const popover = screen.getByTestId('user-profile-popover');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('data-userid', 'user-2');
    });

    it('closes the popover when onClose is called', () => {
      render(<MessageItem message={baseMessage} serverId='srv-1' />);

      fireEvent.click(screen.getByText('Bob'));
      expect(screen.getByTestId('user-profile-popover')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('close-popover'));
      expect(screen.queryByTestId('user-profile-popover')).not.toBeInTheDocument();
    });

    it('author name element has button role for keyboard accessibility', () => {
      render(<MessageItem message={baseMessage} serverId='srv-1' />);
      const authorName = screen.getByRole('button', { name: 'Bob' });
      expect(authorName).toBeInTheDocument();
    });
  });

  describe('MembersSidebar — member row', () => {
    it('shows no popover before a member row is clicked', () => {
      render(<MembersSidebar members={MEMBERS} isOpen />);
      expect(screen.queryByTestId('user-profile-popover')).not.toBeInTheDocument();
    });

    it('opens the profile popover when a member row is clicked', () => {
      render(<MembersSidebar members={MEMBERS} isOpen />);

      // Click the Alice row (owner, online)
      const aliceRow = screen.getByRole('button', { name: /Alice/i });
      fireEvent.click(aliceRow);

      const popover = screen.getByTestId('user-profile-popover');
      expect(popover).toBeInTheDocument();
      expect(popover).toHaveAttribute('data-userid', 'user-1');
    });

    it('closes the popover when onClose is called', () => {
      render(<MembersSidebar members={MEMBERS} isOpen />);

      fireEvent.click(screen.getByRole('button', { name: /Alice/i }));
      expect(screen.getByTestId('user-profile-popover')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('close-popover'));
      expect(screen.queryByTestId('user-profile-popover')).not.toBeInTheDocument();
    });
  });
});
