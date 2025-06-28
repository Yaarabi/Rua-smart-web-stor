import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        pathname: '/api/image/**'
      }
    ],
  },
};

export default nextConfig;
