import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
