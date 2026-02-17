/**
 * Type Definitions: Channel
 * Based on dev spec data schemas
 */

export interface Channel {
  id: string;
  serverId: string;
  name: string;
  slug: string;
  description?: string;
  visibility: ChannelVisibility;
  createdAt: string;
  updatedAt: string;
}

export enum ChannelVisibility {
  PUBLIC_INDEXABLE = "PUBLIC_INDEXABLE",
  PUBLIC_NO_INDEX = "PUBLIC_NO_INDEX",
  PRIVATE = "PRIVATE",
}

export interface ChannelDTO {
  id: string;
  serverId: string;
  name: string;
  slug: string;
  description?: string;
  visibility: ChannelVisibility;
  memberCount?: number;
}
