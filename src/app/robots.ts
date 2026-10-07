import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://codeboard-rho.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/preview", "/u/"],
      disallow: [
        "/api/",
        "/dashboard",
        "/settings",
        "/applications",
        "/circles",
        "/goals",
        "/leetcode",
        "/github",
        "/matchscope",
        "/reviews",
        "/onboarding",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
