/**
 * Server Component: ServerSidebar
 * Displays server info and list of other public channels for navigation
 * Based on dev spec C1.6 ServerSidebar
 */

import Link from "next/link";

interface Channel {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface ServerSidebarProps {
  serverInfo: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  };
  publicChannels: Channel[];
  currentChannelId?: string;
}

export function ServerSidebar({
  serverInfo,
  publicChannels,
  currentChannelId,
}: ServerSidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
      {/* Server header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{serverInfo.name}</h2>
        {serverInfo.description && (
          <p className="mt-1 text-sm text-gray-600">{serverInfo.description}</p>
        )}
      </div>

      {/* Public channels list */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Public Channels
        </h3>
        <nav className="space-y-1">
          {publicChannels.map((channel) => (
            <Link
              key={channel.id}
              href={`/c/${serverInfo.slug}/${channel.slug}`}
              className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
                channel.id === currentChannelId
                  ? "bg-blue-100 font-medium text-blue-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-gray-400">#</span>
              {channel.name}
            </Link>
          ))}
        </nav>

        {publicChannels.length === 0 && (
          <p className="text-sm text-gray-500">No public channels available</p>
        )}
      </div>
    </aside>
  );
}
