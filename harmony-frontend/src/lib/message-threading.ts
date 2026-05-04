import type { Message } from '@/types';

export function mergeCreatedMessageIntoChannelMessages(prev: Message[], msg: Message): Message[] {
  const alreadyExists = prev.some(m => m.id === msg.id);
  const withParentReplyCount =
    msg.parentMessageId && !alreadyExists
      ? prev.map(m =>
          m.id === msg.parentMessageId ? { ...m, replyCount: (m.replyCount ?? 0) + 1 } : m,
        )
      : prev;

  return alreadyExists ? withParentReplyCount : [...withParentReplyCount, msg];
}

export function appendUniqueReplies(base: Message[], incoming: Message[]): Message[] {
  const seen = new Set(base.map(reply => reply.id));
  return [...base, ...incoming.filter(reply => !seen.has(reply.id))];
}
