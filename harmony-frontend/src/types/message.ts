/**
 * Type Definitions: Message
 * Based on dev spec data schemas
 */

export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  author: Author;
  content: string;
  timestamp: Date | string;
  attachments?: Attachment[];
  editedAt?: Date | string;
}

export interface Author {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface Attachment {
  id: string;
  messageId: string;
  url: string;
  filename: string;
  type: string;
  size: number;
}

export interface MessageDTO {
  id: string;
  channelId: string;
  author: Author;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  editedAt?: string;
}
