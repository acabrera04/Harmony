/**
 * Next.js API route: Pixabay GIF proxy
 * Keeps PIXABAY_API_KEY server-side; exposes ?q= (search) or no params (popular).
 * Requires an authenticated session (auth_token cookie) to prevent anonymous
 * API-key exhaustion. Returns { id, title, url, previewUrl }[].
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PIXABAY_BASE = 'https://pixabay.com/api/videos/';
const RESULTS_LIMIT = 24;

interface PixabayVideoRendition {
  url: string;
  thumbnail: string;
  size?: number;
}

interface PixabayHit {
  id: number;
  tags: string;
  videos: {
    tiny?: PixabayVideoRendition;
    small?: PixabayVideoRendition;
    medium?: PixabayVideoRendition;
    large?: PixabayVideoRendition;
  };
}

export interface GifResult {
  id: string;
  title: string;
  /** Playable Pixabay animation URL inserted into the message */
  url: string;
  /** Poster thumbnail shown in the picker grid */
  previewUrl: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
}

interface PixabayResponse {
  hits: PixabayHit[];
}

function pickVideo(hit: PixabayHit): PixabayVideoRendition | null {
  const renditions = [hit.videos.tiny, hit.videos.small, hit.videos.medium, hit.videos.large];
  return renditions.find(rendition => Boolean(rendition?.url)) ?? null;
}

function mapHit(hit: PixabayHit): GifResult | null {
  const rendition = pickVideo(hit);
  if (!rendition?.url) {
    return null;
  }

  return {
    id: String(hit.id),
    title: hit.tags,
    url: rendition.url,
    previewUrl: rendition.thumbnail || '',
    filename: `${hit.id}.${rendition.url.split('.').pop()?.split('?')[0] || 'mp4'}`,
    contentType: 'video/mp4',
    sizeBytes: rendition.size && rendition.size > 0 ? rendition.size : 1,
  };
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore.get('auth_token')?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GIF search is not configured' }, { status: 503 });
  }

  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q')?.trim();

  const params = new URLSearchParams({
    key: apiKey,
    video_type: 'animation',
    safesearch: 'true',
    per_page: String(RESULTS_LIMIT),
  });

  if (query) {
    params.set('q', query);
  } else {
    params.set('editors_choice', 'true');
  }

  const endpoint = `${PIXABAY_BASE}?${params}`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ error: 'GIF API error' }, { status: 502 });
    }
    const data: PixabayResponse = await res.json();
    const gifs: GifResult[] = data.hits
      .map(mapHit)
      .filter((gif): gif is GifResult => Boolean(gif?.url));
    return NextResponse.json({ gifs });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GIFs' }, { status: 500 });
  }
}
