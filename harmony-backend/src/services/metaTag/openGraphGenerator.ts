// CL-C2.4 OpenGraphGenerator — generates OG and Twitter Card tags
import type { ChannelContext, OpenGraphTags, TwitterCardTags, MetaTagSet, IMetaTagGenerator } from './types';

const DEFAULT_IMAGE = process.env.OG_DEFAULT_IMAGE ?? 'https://harmony.chat/og-default.png';
const SITE_NAME = 'Harmony';
const TWITTER_SITE = '@harmonychat';

export const OpenGraphGenerator: IMetaTagGenerator & {
  defaultImage: string;
  generateOGTags(channel: ChannelContext, title: string, description: string): OpenGraphTags;
  generateTwitterCard(channel: ChannelContext, title: string, description: string, image?: string): TwitterCardTags;
  selectPreviewImage(channel: ChannelContext): string;
} = {
  defaultImage: DEFAULT_IMAGE,

  generateOGTags(channel: ChannelContext, title: string, description: string): OpenGraphTags {
    return {
      ogTitle: title,
      ogDescription: description,
      ogImage: this.selectPreviewImage(channel),
      ogType: 'website',
      ogUrl: channel.canonicalUrl,
      ogSiteName: SITE_NAME,
    };
  },

  generateTwitterCard(
    channel: ChannelContext,
    title: string,
    description: string,
    image?: string,
  ): TwitterCardTags {
    const resolvedImage = image ?? this.selectPreviewImage(channel);
    const isCustomImage = resolvedImage !== DEFAULT_IMAGE;
    return {
      card: isCustomImage ? 'summary_large_image' : 'summary',
      title,
      description,
      image: resolvedImage,
      site: TWITTER_SITE,
    };
  },

  selectPreviewImage(_channel: ChannelContext): string {
    return DEFAULT_IMAGE;
  },

  // CL-I1 stubs — full generate/validate wired by M4
  generate(): MetaTagSet {
    throw new Error('OpenGraphGenerator.generate() not yet implemented — wired by M4');
  },
  validate(): boolean {
    throw new Error('OpenGraphGenerator.validate() not yet implemented — wired by M4');
  },
};
