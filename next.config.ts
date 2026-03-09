import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load static assets from finbench.when2buy.ai to bypass qfbench.com CF cache issues
  assetPrefix: process.env.ASSET_PREFIX || '',
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
};

export default nextConfig;
