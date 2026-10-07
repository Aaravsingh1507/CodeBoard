import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking by denying iframes embedding this site
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information sent in HTTP headers
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict access to sensitive browser features / device APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Enforce HTTPS with long max-age and preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Enable browser DNS prefetching
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Restrict Flash / PDF cross-domain access
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig: NextConfig = {
  // Keep `ws` out of the serverless function bundle — it's a Node.js native
  // WebSocket library only needed locally where the global WebSocket API
  // isn't available.
  serverExternalPackages: ["ws"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
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
