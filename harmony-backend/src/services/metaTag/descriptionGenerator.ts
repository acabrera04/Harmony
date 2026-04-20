// CL-C2.3 DescriptionGenerator — generates meta descriptions (AC-2: 50-160 chars)
import type { MessageContext, ChannelContext } from './types';

const MAX_LENGTH = 160;
const MIN_LENGTH = 50;

export const DescriptionGenerator = {
  maxLength: MAX_LENGTH,
  minLength: MIN_LENGTH,

  generateFromMessages(messages: MessageContext[], channel: ChannelContext): string {
    const summary = this.summarizeThread(messages, channel);
    return this.enforceLength(summary);
  },

  extractKeyPhrases(messages: MessageContext[]): string[] {
    const combined = messages.map((m) => m.content).join(' ');
    const words = combined
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3);

    const freq = new Map<string, number>();
    for (const word of words) {
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }

    return [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  },

  sanitizeText(text: string): string {
    return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  },

  summarizeThread(messages: MessageContext[], channel: ChannelContext): string {
    const serverName = this.sanitizeText(channel.serverName);
    const channelName = this.sanitizeText(channel.name);
    const suffix = ` — Join the discussion on ${serverName}.`;

    if (messages.length === 0) {
      const base = `Discussions in #${channelName} on ${serverName}. Join today.`;
      return this.enforceLength(base);
    }

    const first = this.sanitizeText(messages[0].content);
    const prefix = `${serverName} › #${channelName}: `;
    let text = prefix + first;

    if (text.length < MIN_LENGTH) {
      text = text + suffix;
    }

    return this.enforceLength(text);
  },

  enforceLength(text: string): string {
    let result = text;

    if (result.length < MIN_LENGTH) {
      const additions = [
        ' Join the discussion.',
        ' Explore the latest updates.',
        ' Connect with the community.',
      ];
      let i = 0;
      while (result.length < MIN_LENGTH) {
        result += additions[i % additions.length];
        i++;
      }
    }

    if (result.length > MAX_LENGTH) {
      return result.slice(0, MAX_LENGTH - 1).trimEnd() + '…';
    }
    return result;
  },
};
