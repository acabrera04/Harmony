/**
 * Channel Component: MessageList
 * Renders paginated list of messages with infinite scroll support
 * Based on dev spec C1.3 MessageListComponent
 */

import { MessageCard } from "./MessageCard";

interface Message {
  id: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  content: string;
  timestamp: Date | string;
  attachments?: Array<{
    id: string;
    url: string;
    type: string;
  }>;
}

interface MessageListProps {
  messages: Message[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

export function MessageList({
  messages,
  hasMore = false,
  onLoadMore,
  isLoading = false,
}: MessageListProps) {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          author={message.author}
          content={message.content}
          timestamp={message.timestamp}
          attachments={message.attachments}
        />
      ))}

      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load More Messages"}
          </button>
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="py-12 text-center text-gray-500">
          No messages yet. Be the first to start the conversation!
        </div>
      )}
    </div>
  );
}
