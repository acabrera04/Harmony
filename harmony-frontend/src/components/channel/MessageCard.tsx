/**
 * Channel Component: MessageCard
 * Displays individual message with author info and timestamp
 * Based on dev spec C1.5 MessageCard
 */

import Image from "next/image";
import { formatRelativeTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";

interface MessageCardProps {
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

export function MessageCard({
  author,
  content,
  timestamp,
  attachments = [],
}: MessageCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt={author.username}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                {author.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Message content */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gray-900">{author.username}</span>
              <span className="text-xs text-gray-500">
                {formatRelativeTime(timestamp)}
              </span>
            </div>
            <p className="mt-1 text-gray-700">{content}</p>

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="text-sm text-blue-600">
                    📎 {attachment.url}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
