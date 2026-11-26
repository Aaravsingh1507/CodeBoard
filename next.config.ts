import type { NextConfig } from "next";

const appOrigin = process.env.NEXTAUTH_URL || "https://codeboard-rho.vercel.app";

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
  // Strict Content Security Policy without 'unsafe-eval'
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://github.com; object-src 'none';",
  },
  // Restrict CORS origin instead of wildcard '*'
  {
    key: "Access-Control-Allow-Origin",
    value: appOrigin,
  },
];

const nextConfig: NextConfig = {
  // Disable X-Powered-By header to prevent leaking framework info
  poweredByHeader: false,
  // Keep `ws` out of the serverless function bundle — it's a Node.js native
  // WebSocket library only needed locally where the global WebSocket API
  // isn't available.
  serverExternalPackages: ["ws"],
  // Omit legacy IE11 nomodule polyfill bundle so <head> has 0 render-blocking scripts
  webpack: (config, { isServer }) => {
    if (!isServer && Array.isArray(config.plugins)) {
      config.plugins = config.plugins.filter((plugin: unknown) => {
        const p = plugin as { constructor?: { name?: string }; filePath?: unknown };
        return !(
          p?.constructor?.name === "CopyFilePlugin" &&
          typeof p.filePath === "string" &&
          p.filePath.includes("polyfill-nomodule")
        );
      });
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: securityHeaders.filter((h) => h.key !== "Access-Control-Allow-Origin"),
      },
    ];
  },
  async redirects() {
    const sessionCookies = [
      "authjs.session-token",
      "__Secure-authjs.session-token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
    ];
    return sessionCookies.flatMap((key) => [
      {
        source: "/",
        has: [{ type: "cookie" as const, key }],
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/login",
        has: [{ type: "cookie" as const, key }],
        destination: "/dashboard",
        permanent: false,
      },
    ]);
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
