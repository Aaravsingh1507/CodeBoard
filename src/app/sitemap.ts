import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://codeboard-rho.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const publicUsers = await prisma.user.findMany({
      where: {
        publicProfileEnabled: true,
        publicProfileSlug: { not: null },
      },
      select: {
        publicProfileSlug: true,
        updatedAt: true,
      },
    });

    const profileRoutes: MetadataRoute.Sitemap = publicUsers.map((u) => ({
      url: `${baseUrl}/u/${u.publicProfileSlug}`,
      lastModified: u.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...profileRoutes];
  } catch {
    return staticRoutes;
  }
}
