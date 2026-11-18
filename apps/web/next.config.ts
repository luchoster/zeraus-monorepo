import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages shipped as raw TypeScript
  transpilePackages: ["@zeraus/sanity-config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      { source: "/works-simple", destination: "/our-work", permanent: false },
    ];
  },
};

export default nextConfig;
