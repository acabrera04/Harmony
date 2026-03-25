import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageItem } from '@/components/message/MessageItem';
import type { Message } from '@/types';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

jest.mock('@/lib/utils', () => ({
  formatMessageTimestamp: () => 'Today at 12:00 PM',
  formatTimeOnly: () => '12:00 PM',
}));

jest.mock('@/app/actions/pinMessage', () => ({
  pinMessageAction: jest.fn(),
  unpinMessageAction: jest.fn(),
}));

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const baseMessage: Message = {
  id: 'msg-1',
  channelId: 'ch-1',
  authorId: 'user-1',
  author: {
    id: 'user-1',
    username: 'testuser',
    displayName: 'Test User',
  },
  content: 'Hello world',
  timestamp: '2024-01-01T12:00:00Z',
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('MessageItem — pin button', () => {
  /**
   * Test 1: Non-admin users must not see the "More actions" button that
   * exposes Pin/Unpin. After fixing HarmonyShell to derive canPin from the
   * member's server-scoped role (MODERATOR+) rather than isAuthenticated,
   * non-admin users receive canPin={false} and the button must be absent.
   */
  it('does not render the pin button for a user without admin permission', () => {
    render(<MessageItem message={baseMessage} canPin={false} serverId='server-1' />);

    expect(screen.queryByRole('button', { name: /more actions/i })).not.toBeInTheDocument();
  });

  /**
   * Test 2: When the backend rejects a pin request with HTTP 403, the UI must
   * display a descriptive error popup so the user understands they lack
   * the required permission.
   */
  it('shows a descriptive 403 error popup when the pin action is forbidden', async () => {
    const { pinMessageAction } = jest.requireMock<typeof import('@/app/actions/pinMessage')>(
      '@/app/actions/pinMessage',
    );

    // Simulate the server returning 403 Forbidden.
    const forbiddenError = Object.assign(new Error('Forbidden'), { status: 403 });
    (pinMessageAction as jest.Mock).mockRejectedValueOnce(forbiddenError);

    render(<MessageItem message={baseMessage} canPin={true} serverId='server-1' />);

    // Open the "More actions" dropdown.
    fireEvent.click(screen.getByRole('button', { name: /more actions/i }));

    // Click "Pin Message" inside the dropdown.
    fireEvent.click(screen.getByRole('button', { name: /pin message/i }));

    // The error popup must describe the permission failure — not just "Failed".
    await waitFor(() => {
      expect(screen.getByText(/you don't have permission to pin messages/i)).toBeInTheDocument();
    });
  });
});
