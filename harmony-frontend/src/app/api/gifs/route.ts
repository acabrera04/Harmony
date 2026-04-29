/**
 * Next.js API route: Pixabay GIF proxy
 * Keeps PIXABAY_API_KEY server-side; exposes ?q= (search) or no params (popular).
 * Requires an authenticated session (auth_token cookie) to prevent anonymous
 * API-key exhaustion. Returns { id, title, url, previewUrl }[].
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PIXABAY_BASE = 'https://pixabay.com/api/';
const RESULTS_LIMIT = 24;

interface PixabayHit {
  id: number;
  tags: string;
  webformatURL: string;
  previewURL: string;
}

interface PixabayResponse {
  hits: PixabayHit[];
}

export interface GifResult {
  id: string;
  title: string;
  /** Full-quality GIF URL inserted into the message */
  url: string;
  /** Small preview URL shown in the picker grid */
  previewUrl: string;
}

function mapHit(hit: PixabayHit): GifResult {
  return {
    id: String(hit.id),
    title: hit.tags,
    url: hit.webformatURL,
    previewUrl: hit.previewURL || hit.webformatURL,
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
    image_type: 'animated_gif',
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
    const gifs: GifResult[] = data.hits.map(mapHit).filter(g => g.url);
    return NextResponse.json({ gifs });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GIFs' }, { status: 500 });
  }
}
