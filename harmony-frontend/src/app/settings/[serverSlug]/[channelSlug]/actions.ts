"use server";

import { revalidatePath } from "next/cache";
import { updateChannel, getChannel } from "@/services/channelService";
import type { Channel } from "@/types";

export async function saveChannelSettings(
  serverSlug: string,
  channelSlug: string,
  patch: Partial<Pick<Channel, "name" | "topic" | "description">>
): Promise<void> {
  // Resolve channel by route params (don't trust a raw channelId from the client)
  const channel = await getChannel(serverSlug, channelSlug);
  if (!channel) {
    throw new Error("Channel not found");
  }
  // Validate name: required, non-empty after trimming
  if (patch.name !== undefined) {
    const trimmed = patch.name.trim();
    if (!trimmed) throw new Error("Channel name cannot be empty");
    patch = { ...patch, name: trimmed };
  }
  await updateChannel(channel.id, patch);

  // Invalidate all routes that render channel data so they re-fetch on next visit
  revalidatePath(`/channels/${serverSlug}/${channelSlug}`);
  revalidatePath(`/c/${serverSlug}/${channelSlug}`);
  revalidatePath(`/settings/${serverSlug}/${channelSlug}`);
}
