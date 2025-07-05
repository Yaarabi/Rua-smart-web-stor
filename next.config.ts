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
};

export default nextConfig;
