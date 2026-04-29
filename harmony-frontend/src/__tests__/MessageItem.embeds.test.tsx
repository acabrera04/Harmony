import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageItem } from '@/components/message/MessageItem';
import type { Message } from '@/types';

const mockUseAuth = jest.fn();

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/hooks/useToast', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/c/test67/general',
  useRouter: () => ({ push: jest.fn() }),
}));

const baseMessage: Message = {
  id: 'msg-embed-1',
  channelId: 'channel-1',
  authorId: 'user-1',
  author: {
    id: 'user-1',
    username: 'alice',
    displayName: 'Alice',
  },
  content: 'https://cdn.pixabay.com/video/2026/04/17/347325_tiny.mp4',
  timestamp: '2026-04-29T18:24:00.000Z',
  attachments: [],
};

describe('MessageItem media embeds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 'user-2' },
    });
  });

  it('renders a standalone Pixabay MP4 message as an inline looping video', () => {
    render(<MessageItem message={baseMessage} />);

    const video = document.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('src', baseMessage.content);
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect((video as HTMLVideoElement).muted).toBe(true);
    expect(screen.queryByText(baseMessage.content)).not.toBeInTheDocument();
  });

  it('keeps surrounding text visible and still embeds the Pixabay MP4', () => {
    const message = {
      ...baseMessage,
      content: `look at this ${baseMessage.content}`,
    };

    render(<MessageItem message={message} />);

    expect(screen.getByText('look at this')).toBeInTheDocument();
    const video = document.querySelector('video');
    expect(video).toHaveAttribute('src', baseMessage.content);
  });

  it('renders a video attachment inline without relying on content URL parsing', () => {
    const message = {
      ...baseMessage,
      content: '',
      attachments: [
        {
          id: 'att-1',
          messageId: 'msg-embed-1',
          url: 'https://cdn.pixabay.com/video/2026/04/17/347325_tiny.mp4',
          filename: '347325_tiny.mp4',
          type: 'video/mp4',
          size: 12345,
        },
      ],
    };

    render(<MessageItem message={message} />);

    const video = document.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('src', 'https://cdn.pixabay.com/video/2026/04/17/347325_tiny.mp4');
  });
});
