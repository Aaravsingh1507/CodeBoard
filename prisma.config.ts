import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prefer the non-pooling (direct) URL for migrations.
    // Fall back to pooled URL. On Vercel, these are set as env vars
    // in the project settings. Locally they come from .env.
    url: process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL,
  },
});
