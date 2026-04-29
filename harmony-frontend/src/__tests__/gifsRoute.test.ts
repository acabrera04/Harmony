/**
 * Unit tests for the Pixabay GIF proxy API route.
 * Issue #499 — GIF picker for message input.
 */

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const mockCookiesGet = jest.fn();

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockResolvedValue({ get: mockCookiesGet }),
}));

import { cookies } from 'next/headers';

// Minimal NextRequest / NextResponse shims
jest.mock('next/server', () => ({
  NextRequest: class {
    nextUrl: URL;
    constructor(url: string) {
      this.nextUrl = new URL(url);
    }
  },
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      _body: body,
      _status: init?.status ?? 200,
    }),
  },
}));

import { GET } from '@/app/api/gifs/route';
import { NextRequest } from 'next/server';

function makeRequest(url: string): InstanceType<typeof NextRequest> {
  return new NextRequest(url) as unknown as InstanceType<typeof NextRequest>;
}

function makePixabayResponse(hits: unknown[]) {
  return { hits };
}

function makePixabayHit(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    tags: 'funny cat',
    videos: {
      tiny: {
        url: 'https://cdn.pixabay.com/video/cat_tiny.mp4',
        thumbnail: 'https://cdn.pixabay.com/video/cat_tiny.jpg',
      },
      small: {
        url: 'https://cdn.pixabay.com/video/cat_small.mp4',
        thumbnail: 'https://cdn.pixabay.com/video/cat_small.jpg',
      },
    },
    ...overrides,
  };
}

describe('GET /api/gifs', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    // jest.resetAllMocks() wipes mockResolvedValue on the cookies factory; restore it.
    (cookies as jest.Mock).mockResolvedValue({ get: mockCookiesGet });
    process.env = { ...OLD_ENV, PIXABAY_API_KEY: 'test-key' };
    // Default: authenticated user
    mockCookiesGet.mockReturnValue({ value: 'token-abc' });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('returns 401 when no auth_token cookie is present', async () => {
    mockCookiesGet.mockReturnValue(undefined);
    const req = makeRequest('http://localhost/api/gifs');
    const res = await GET(req as never);
    expect((res as { _status: number })._status).toBe(401);
  });

  it('returns 503 when PIXABAY_API_KEY is not set', async () => {
    delete process.env.PIXABAY_API_KEY;
    const req = makeRequest('http://localhost/api/gifs');
    const res = await GET(req as never);
    expect((res as { _status: number })._status).toBe(503);
  });

  it('uses editors_choice when no query is given', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(makePixabayResponse([makePixabayHit()])),
    });

    const req = makeRequest('http://localhost/api/gifs');
    const res = await GET(req as never);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('editors_choice=true'),
      expect.anything(),
    );
    expect((res as { _status: number })._status).toBe(200);
    const body = (res as { _body: { gifs: unknown[] } })._body;
    expect(body.gifs).toHaveLength(1);
    expect(body.gifs[0]).toMatchObject({
      id: '1',
      title: 'funny cat',
      url: 'https://cdn.pixabay.com/video/cat_tiny.mp4',
      previewUrl: 'https://cdn.pixabay.com/video/cat_tiny.jpg',
      filename: '1.mp4',
      contentType: 'video/mp4',
      sizeBytes: 1,
    });
  });

  it('includes q param when a query is given', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(makePixabayResponse([makePixabayHit()])),
    });

    const req = makeRequest('http://localhost/api/gifs?q=cats');
    await GET(req as never);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=cats'),
      expect.anything(),
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/videos/?'),
      expect.anything(),
    );
    expect(mockFetch).not.toHaveBeenCalledWith(
      expect.stringContaining('editors_choice'),
      expect.anything(),
    );
  });

  it('URL-encodes special characters in the search query', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(makePixabayResponse([])),
    });

    // "hello world!" pre-encoded in the URL as "hello+world%21"
    const req = makeRequest('http://localhost/api/gifs?q=hello+world%21');
    await GET(req as never);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('q=hello+world%21'),
      expect.anything(),
    );
  });

  it('returns 502 when Pixabay API responds with an error', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 429 });

    const req = makeRequest('http://localhost/api/gifs?q=cats');
    const res = await GET(req as never);

    expect((res as { _status: number })._status).toBe(502);
  });

  it('returns 500 when fetch throws', async () => {
    mockFetch.mockRejectedValue(new Error('network'));

    const req = makeRequest('http://localhost/api/gifs?q=cats');
    const res = await GET(req as never);

    expect((res as { _status: number })._status).toBe(500);
  });

  it('filters out results with empty video URLs', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(
        makePixabayResponse([
          makePixabayHit({
            id: 1,
            videos: {
              tiny: {
                url: 'https://cdn.pixabay.com/video/ok_tiny.mp4',
                thumbnail: 'https://cdn.pixabay.com/video/ok_tiny.jpg',
              },
            },
          }),
          makePixabayHit({
            id: 2,
            videos: {
              tiny: {
                url: '',
                thumbnail: 'https://cdn.pixabay.com/video/missing_tiny.jpg',
              },
            },
          }),
        ]),
      ),
    });

    const req = makeRequest('http://localhost/api/gifs');
    const res = await GET(req as never);
    const body = (res as { _body: { gifs: unknown[] } })._body;
    expect(body.gifs).toHaveLength(1);
    expect((body.gifs[0] as { id: string }).id).toBe('1');
  });

  it('falls back from tiny to small video renditions', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(
        makePixabayResponse([
          makePixabayHit({
            videos: {
              tiny: {
                url: '',
                thumbnail: '',
              },
              small: {
                url: 'https://cdn.pixabay.com/video/cat_small.mp4',
                thumbnail: 'https://cdn.pixabay.com/video/cat_small.jpg',
              },
            },
          }),
        ]),
      ),
    });

    const req = makeRequest('http://localhost/api/gifs?q=cats');
    const res = await GET(req as never);
    const body = (res as { _body: { gifs: unknown[] } })._body;

    expect(body.gifs[0]).toMatchObject({
      url: 'https://cdn.pixabay.com/video/cat_small.mp4',
      previewUrl: 'https://cdn.pixabay.com/video/cat_small.jpg',
      filename: '1.mp4',
      contentType: 'video/mp4',
    });
  });
});
