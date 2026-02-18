/**
 * Type Definitions: Channel
 * Based on dev spec data schemas
 */

export enum ChannelType {
  TEXT = "TEXT",
  VOICE = "VOICE",
  ANNOUNCEMENT = "ANNOUNCEMENT",
}

export interface Channel {
  id: string;
  serverId: string;
  name: string;
  slug: string;
  type: ChannelType;
  visibility: ChannelVisibility;
  topic?: string;
  position: number;
  description?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
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
