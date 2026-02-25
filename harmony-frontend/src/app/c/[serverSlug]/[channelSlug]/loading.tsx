/**
 * Route-level loading skeleton for /c/[serverSlug]/[channelSlug]
 * Shown by Next.js while ChannelPageContent RSC is fetching data.
 */

export default function Loading() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#36393f]">
      {/* Server rail */}
      <div className="flex w-[72px] flex-col items-center gap-2 bg-[#202225] py-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 w-12 animate-pulse rounded-full bg-[#40444b]" />
        ))}
      </div>

      {/* Channel sidebar */}
      <div className="flex w-60 flex-col bg-[#2f3136] px-2 py-4">
        <div className="mb-4 h-4 w-32 animate-pulse rounded bg-[#40444b]" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="mb-2 h-8 animate-pulse rounded bg-[#40444b]" />
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex h-12 items-center gap-3 border-b border-[#202225] bg-[#36393f] px-4">
          <div className="h-4 w-4 animate-pulse rounded bg-[#40444b]" />
          <div className="h-4 w-28 animate-pulse rounded bg-[#40444b]" />
        </div>

        {/* Message area */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-[#40444b]" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-[#40444b]" />
                  <div className="h-3 w-full animate-pulse rounded bg-[#40444b]" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-[#40444b]" />
                </div>
              </div>
            ))}
          </div>

          {/* Members sidebar */}
          <div className="hidden w-60 flex-col bg-[#2f3136] px-2 py-4 lg:flex">
            <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#40444b]" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-2 flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-[#40444b]" />
                <div className="h-3 w-20 animate-pulse rounded bg-[#40444b]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
