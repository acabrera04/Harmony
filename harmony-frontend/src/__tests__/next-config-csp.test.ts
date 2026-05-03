import nextConfig, { buildContentSecurityPolicy } from '../../next.config';

describe('next.config Content Security Policy', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_API_URL;
    delete process.env.R2_PUBLIC_URL;
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('adds the Content-Security-Policy header to every route', async () => {
    const headers = await nextConfig.headers?.();

    expect(headers).toEqual([
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: buildContentSecurityPolicy(),
          },
        ],
      },
    ]);
  });

  it('allows only configured API and attachment origins for app connections and media', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.harmony.example/v1/';
    process.env.R2_PUBLIC_URL = 'https://attachments.harmony.example/public/';

    const csp = buildContentSecurityPolicy();

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).toContain(
      "img-src 'self' data: blob: https://api.harmony.example https://attachments.harmony.example https://api.dicebear.com https://cdn.pixabay.com",
    );
    expect(csp).toContain(
      "media-src 'self' blob: https://api.harmony.example https://attachments.harmony.example",
    );
    expect(csp).toContain(
      "connect-src 'self' https://api.harmony.example https://*.twilio.com wss://*.twilio.com https://*.twiliocdn.com wss://*.twiliocdn.com",
    );
    expect(csp).toContain('frame-ancestors');
  });

  it('uses the local backend fallback when the API origin is not configured', () => {
    expect(buildContentSecurityPolicy()).toContain("connect-src 'self' http://localhost:4000");
  });

  it('throws for malformed origin environment variables', () => {
    process.env.R2_PUBLIC_URL = 'attachments.harmony.example';

    expect(() => buildContentSecurityPolicy()).toThrow('Invalid R2_PUBLIC_URL value');
  });
});
