import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages shipped as raw TypeScript
  transpilePackages: ["@zeraus/sanity-config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
