import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep `ws` out of the serverless function bundle — it's a Node.js native
  // WebSocket library only needed locally where the global WebSocket API
  // isn't available.
  serverExternalPackages: ["ws"],
  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: "/portfolio/index.html",
      },
    ];
  },
};

export default nextConfig;
