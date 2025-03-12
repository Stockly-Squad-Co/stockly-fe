import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
    ],
  },
};

export default nextConfig;
