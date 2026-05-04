import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  appendUniqueReplies,
  mergeCreatedMessageIntoChannelMessages,
} from '@/lib/message-threading';
import { ThreadView } from '@/components/message/ThreadView';
import type { Message } from '@/types';

const mockGetThreadMessagesAction = jest.fn();
const mockCreateReplyAction = jest.fn();

jest.mock('@/app/actions/getThreadMessages', () => ({
  getThreadMessagesAction: (...args: unknown[]) => mockGetThreadMessagesAction(...args),
}));

jest.mock('@/app/actions/createReply', () => ({
  createReplyAction: (...args: unknown[]) => mockCreateReplyAction(...args),
}));

jest.mock('@/hooks/useToast', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

/* eslint-disable @next/next/no-img-element */
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt ?? ''} {...props} />
  ),
}));

const parentMessage: Message = {
  id: 'parent-1',
  channelId: 'channel-1',
  authorId: 'user-1',
  author: { id: 'user-1', username: 'alice' },
  content: 'Top-level message',
  timestamp: '2026-05-03T12:00:00.000Z',
  replyCount: 0,
};

const replyMessage: Message = {
  id: 'reply-1',
  channelId: 'channel-1',
  authorId: 'user-2',
  author: { id: 'user-2', username: 'bob' },
  content: 'Threaded response',
  timestamp: '2026-05-03T12:01:00.000Z',
  parentMessageId: parentMessage.id,
};

describe('Issue #503 — message threading frontend wiring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('increments the parent reply count when a created reply enters channel state', () => {
    const result = mergeCreatedMessageIntoChannelMessages([parentMessage], replyMessage);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: parentMessage.id, replyCount: 1 });
    expect(result[1]).toBe(replyMessage);
  });

  it('does not double-count duplicate reply responses from tRPC and SSE', () => {
    const firstMerge = mergeCreatedMessageIntoChannelMessages([parentMessage], replyMessage);
    const secondMerge = mergeCreatedMessageIntoChannelMessages(firstMerge, replyMessage);

    expect(secondMerge).toHaveLength(2);
    expect(secondMerge[0]).toMatchObject({ id: parentMessage.id, replyCount: 1 });
  });

  it('appends only replies that are not already loaded', () => {
    const duplicateReply = { ...replyMessage };
    const secondReply = { ...replyMessage, id: 'reply-2', content: 'Another threaded response' };

    expect(appendUniqueReplies([replyMessage], [duplicateReply, secondReply])).toEqual([
      replyMessage,
      secondReply,
    ]);
  });

  it('appends an incoming reply to an open thread without dropping loaded replies', async () => {
    mockGetThreadMessagesAction.mockResolvedValue({
      ok: true,
      replies: [],
      nextCursor: null,
      hasMore: false,
    });

    const { rerender } = render(
      <ThreadView parentMessage={parentMessage} channelId='channel-1' serverId='server-1' />,
    );

    await waitFor(() => expect(mockGetThreadMessagesAction).toHaveBeenCalledTimes(1));

    rerender(
      <ThreadView
        parentMessage={parentMessage}
        channelId='channel-1'
        serverId='server-1'
        incomingReply={replyMessage}
      />,
    );

    expect(await screen.findByText('Threaded response')).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
  });
});
