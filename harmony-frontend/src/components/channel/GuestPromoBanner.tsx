/**
 * Channel Component: GuestPromoBanner
 * Non-intrusive banner encouraging guests to join the community
 * Based on dev spec C1.4 GuestPromoBanner
 */

import { Button } from "@/components/ui/Button";

interface GuestPromoBannerProps {
  serverName: string;
  channelName: string;
  memberCount?: number;
  onJoinClick?: () => void;
  onDismiss?: () => void;
}

export function GuestPromoBanner({
  serverName,
  channelName,
  memberCount,
  onJoinClick,
  onDismiss,
}: GuestPromoBannerProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-blue-50 p-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            You&apos;re viewing #{channelName} as a guest
          </h3>
          <p className="text-sm text-gray-600">
            Join <span className="font-medium">{serverName}</span>
            {memberCount != null && memberCount > 0 && ` with ${memberCount.toLocaleString()} members`} to
            participate in the conversation.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" onClick={onJoinClick}>
            Join Server
          </Button>
          {onDismiss && (
            <Button variant="ghost" onClick={onDismiss}>
              ✕
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
