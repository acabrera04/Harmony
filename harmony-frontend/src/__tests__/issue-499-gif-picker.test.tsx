const mockSendMessageAction = jest.fn();

jest.mock('@/app/actions/sendMessage', () => ({
  sendMessageAction: mockSendMessageAction,
}));

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: () => Promise<{ default: React.ComponentType<unknown> }>) => {
    let ResolvedComponent: React.ComponentType<unknown> | null = null;

    const DynamicWrapper = (props: Record<string, unknown>) => {
      if (!ResolvedComponent) {
        throw new Error('Dynamic component not resolved — use mockResolvedValue in beforeEach');
      }
      return <ResolvedComponent {...props} />;
    };

    importFn().then(mod => {
      ResolvedComponent = mod.default;
    });

    return DynamicWrapper;
  },
}));

jest.mock('@/components/channel/EmojiPickerPopover', () => ({
  EmojiPickerPopover: () => null,
}));

jest.mock('@/components/channel/GifPickerPopover', () => ({
  GifPickerPopover: ({
    onGifSelect,
  }: {
    onGifSelect: (gif: {
      url: string;
      title: string;
      previewUrl: string;
      filename: string;
      contentType: string;
      sizeBytes: number;
    }) => void;
  }) => (
    <button
      type='button'
      data-testid='gif-option'
      onClick={() =>
        onGifSelect({
          url: 'https://cdn.pixabay.com/video/demo_tiny.mp4',
          title: 'demo animation',
          previewUrl: 'https://cdn.pixabay.com/video/demo_tiny.jpg',
          filename: 'demo-animation.mp4',
          contentType: 'video/mp4',
          sizeBytes: 12345,
        })
      }
    >
      demo animation
    </button>
  ),
}));

import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageInput } from '../components/channel/MessageInput';

describe('Issue #499 — MessageInput: Pixabay picker attachments', () => {
  const defaultProps = {
    channelId: 'ch-1',
    channelName: 'general',
    serverId: 'srv-1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds a selected Pixabay animation as a pending attachment instead of inserting a raw URL', async () => {
    mockSendMessageAction.mockResolvedValue({
      id: 'msg-1',
      channelId: 'ch-1',
      authorId: 'user-1',
      author: { id: 'user-1', username: 'alice' },
      content: '',
      timestamp: '2026-04-29T00:00:00.000Z',
      attachments: [],
    });

    render(<MessageInput {...defaultProps} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /gif picker/i }));
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('gif-option'));
    });

    expect(screen.getByLabelText('Pending attachments')).toHaveTextContent('demo-animation.mp4');
    expect(screen.getByRole('textbox', { name: 'Message #general' })).toHaveValue('');

    await act(async () => {
      fireEvent.keyDown(screen.getByRole('textbox', { name: 'Message #general' }), {
        key: 'Enter',
        code: 'Enter',
      });
    });

    await waitFor(() => {
      expect(mockSendMessageAction).toHaveBeenCalledWith(
        'ch-1',
        '',
        'srv-1',
        [
          {
            url: 'https://cdn.pixabay.com/video/demo_tiny.mp4',
            filename: 'demo-animation.mp4',
            contentType: 'video/mp4',
            sizeBytes: 12345,
          },
        ],
      );
    });
  });
});
