import { notFound } from "next/navigation";
import { getServers, getServerMembers } from "@/services/serverService";
import { getChannels } from "@/services/channelService";
import { getMessages } from "@/services/messageService";
import { HarmonyShell } from "@/components/layout/HarmonyShell";
import { VisibilityGuard } from "@/components/channel/VisibilityGuard";

interface ChannelPageContentProps {
  serverSlug: string;
  channelSlug: string;
}

export async function ChannelPageContent({ serverSlug, channelSlug }: ChannelPageContentProps) {
  const servers = await getServers();
  const server = servers.find((s) => s.slug === serverSlug);
  if (!server) notFound();

  const serverChannels = await getChannels(server.id);
  const channel = serverChannels.find((c) => c.slug === channelSlug);
  if (!channel) notFound();

  // Gather all channels across servers for cross-server navigation
  const allChannels = (
    await Promise.all(servers.map((s) => getChannels(s.id)))
  ).flat();

  // Service returns newest-first; reverse for chronological display
  const { messages } = await getMessages(channel.id);
  const sortedMessages = [...messages].reverse();

  const members = await getServerMembers(server.id);

  return (
    <VisibilityGuard visibility={channel.visibility} isLoading={false}>
      <HarmonyShell
        servers={servers}
        currentServer={server}
        channels={serverChannels}
        allChannels={allChannels}
        currentChannel={channel}
        messages={sortedMessages}
        members={members}
      />
    </VisibilityGuard>
  );
}
