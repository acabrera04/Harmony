/**
 * Type Definitions: Server
 * Based on dev spec data schemas
 */

export interface Server {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  bannerUrl?: string;
  memberCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ServerDTO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  bannerUrl?: string;
  memberCount: number;
  publicChannelCount?: number;
}
