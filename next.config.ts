import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep `ws` out of the serverless function bundle — it's a Node.js native
  // WebSocket library only needed locally where the global WebSocket API
  // isn't available.
  serverExternalPackages: ["ws"],
};

export default nextConfig;
