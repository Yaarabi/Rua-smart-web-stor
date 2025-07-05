const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/api/image/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
