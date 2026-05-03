import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const localApiUrl = 'http://localhost:4000';

function getOriginFromEnv(envVarName: string): string | null {
  const value = process.env[envVarName]?.trim();
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    throw new Error(`Invalid ${envVarName} value "${value}". Expected an absolute URL.`);
  }
}

function uniqueSources(sources: Array<string | null | undefined>): string[] {
  return [...new Set(sources.filter((source): source is string => Boolean(source)))];
}

export function buildContentSecurityPolicy(): string {
  const apiOrigin = getOriginFromEnv('NEXT_PUBLIC_API_URL') ?? localApiUrl;
  const r2PublicOrigin = getOriginFromEnv('R2_PUBLIC_URL');

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': uniqueSources([
      "'self'",
      "'unsafe-inline'",
      isDevelopment ? "'unsafe-eval'" : null,
    ]),
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': uniqueSources([
      "'self'",
      'data:',
      'blob:',
      apiOrigin,
      r2PublicOrigin,
      'https://api.dicebear.com',
      'https://cdn.pixabay.com',
    ]),
    'media-src': uniqueSources(["'self'", 'blob:', apiOrigin, r2PublicOrigin]),
    'connect-src': uniqueSources([
      "'self'",
      apiOrigin,
      'https://*.twilio.com',
      'wss://*.twilio.com',
      'https://*.twiliocdn.com',
      'wss://*.twiliocdn.com',
    ]),
    'font-src': ["'self'"],
    'frame-src': ['https://www.youtube.com', 'https://www.youtube-nocookie.com'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  const csp = Object.entries(directives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');

  return isDevelopment ? csp : `${csp}; upgrade-insecure-requests`;
}

// On Vercel preview deployments the canonical origin isn't known ahead of time
// (each branch/PR gets a unique `*.vercel.app` host). Map Vercel's own
// VERCEL_URL system variable into NEXT_PUBLIC_BASE_URL so runtime-config and
// the SEO routes emit canonical URLs that match the actual preview origin.
// Production and local dev are unaffected — in both, NEXT_PUBLIC_BASE_URL is
// already set explicitly.
if (
  process.env.VERCEL_ENV === 'preview' &&
  !process.env.NEXT_PUBLIC_BASE_URL &&
  process.env.VERCEL_URL
) {
  process.env.NEXT_PUBLIC_BASE_URL = `https://${process.env.VERCEL_URL}`;
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: buildContentSecurityPolicy(),
          },
        ],
      },
    ];
  },
  images: {
    // All <Image> usages currently pass `unoptimized` to support arbitrary
    // external avatar/icon URLs without host restrictions. This remotePatterns
    // entry is kept so it can be expanded (and `unoptimized` removed) once a
    // stable set of image origins is established.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      // Pixabay GIF CDN — used by GifPickerPopover preview images
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
};

export default nextConfig;
