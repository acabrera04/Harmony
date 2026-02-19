import { notFound } from "next/navigation";
import { mockServers } from "@/mocks/servers";
import { mockChannels } from "@/mocks/channels";
import { mockMessages } from "@/mocks/messages";
import { mockUsers } from "@/mocks/users";
import { HarmonyShell } from "@/components/layout/HarmonyShell";
import { VisibilityGuard } from "@/components/channel/VisibilityGuard";

interface PageProps {
  params: Promise<{ serverSlug: string; channelSlug: string }>;
}

export default async function ChannelPage({ params }: PageProps) {
  const { serverSlug, channelSlug } = await params;

  const server = mockServers.find((s) => s.slug === serverSlug);
  if (!server) notFound();

  const serverChannels = mockChannels.filter((c) => c.serverId === server.id);
  const channel = serverChannels.find((c) => c.slug === channelSlug);
  if (!channel) notFound();

  const messages = mockMessages
    .filter((m) => m.channelId === channel.id)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // #c30: isLoading is hardcoded false because mock data is resolved synchronously.
  // When real async service calls are introduced, pass a proper loading/error state here.
  return (
    <VisibilityGuard visibility={channel.visibility} isLoading={false}>
      <HarmonyShell
        servers={mockServers}
        currentServer={server}
        channels={serverChannels}
        currentChannel={channel}
        messages={messages}
        members={mockUsers}
      />
    </VisibilityGuard>
  );
}
