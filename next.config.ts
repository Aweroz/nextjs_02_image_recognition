import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // 👇 change file size limit
      bodySizeLimit: "10mb", 
    },
  },
};

export default nextConfig;
