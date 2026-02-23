import { redirect, notFound } from "next/navigation";
import { getServers } from "@/services/serverService";
import { getChannels } from "@/services/channelService";
import { ChannelType } from "@/types";

interface PageProps {
  params: Promise<{ serverSlug: string }>;
}

export default async function ServerPage({ params }: PageProps) {
  const { serverSlug } = await params;

  const servers = await getServers();
  const server = servers.find((s) => s.slug === serverSlug);
  if (!server) notFound();

  const channels = await getChannels(server.id);
  const firstChannel = channels
    .filter((c) => c.type === ChannelType.TEXT || c.type === ChannelType.ANNOUNCEMENT)
    .sort((a, b) => a.position - b.position)[0];
  if (!firstChannel) notFound();

  redirect(`/channels/${serverSlug}/${firstChannel.slug}`);
}
