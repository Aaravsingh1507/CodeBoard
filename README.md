# DevTrack AI

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A productivity dashboard for developers — GitHub stats, LeetCode tracking, a
unified coding streak, a resume version manager, an internship/job
application tracker, AI-generated weekly reviews, and a goal planner.

🔗 **Live Demo:** [your-vercel-url](https://your-vercel-url.vercel.app) *(deploy to Vercel and update this link)*

This is a real Next.js (App Router) + TypeScript + Prisma app. Every
feature is wired to real data — GitHub's API, LeetCode's public GraphQL
endpoint, and Claude's API — not mock/placeholder content.

---

## Screenshots

> Drop your own screenshots into the `docs/` folder and they'll render here automatically.

| Dashboard | GitHub Stats | Applications |
|---|---|---|
| ![Dashboard](./docs/screenshot-dashboard.png) | ![GitHub](./docs/screenshot-github.png) | ![Applications](./docs/screenshot-applications.png) |

---

## 1. Prerequisites

- Node.js 18.18+ and npm
- A free [GitHub OAuth App](https://github.com/settings/developers)
- An [Anthropic API key](https://console.anthropic.com/) (for the AI weekly review)

## 2. Setup

```bash
npm install
cp .env.example .env
```

Now fill in `.env`:

- **`AUTH_SECRET`** — run `npx auth secret` (or `openssl rand -base64 32`) and paste the result.
- **`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`** — create an OAuth App at
  https://github.com/settings/developers with:
  - Homepage URL: `http://localhost:3000`
  - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
- **`ANTHROPIC_API_KEY`** — from console.anthropic.com. Without this, every
  other feature works; only "Generate this week's review" will show an error.
- **`CRON_SECRET`** — any random string. Only needed for the two cron routes.
- **`DATABASE_URL`** — already set to a local SQLite file, no action needed.

Then set up the database and run:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

Visit `http://localhost:3000`, sign in with GitHub, and you're in.

## 3. What's actually implemented

| Feature | Status |
|---|---|
| GitHub OAuth login | Real — NextAuth (Auth.js v5) + GitHub provider |
| GitHub stats (repos, stars, followers, contribution calendar, languages, recent activity) | Real — GitHub GraphQL + REST API, server-cached 4h |
| LeetCode stats (solved counts, ranking, recent submissions) | Real — unofficial `leetcode.com/graphql` endpoint, server-cached 4h, degrades gracefully if the endpoint changes |
| Coding streak + heatmap | Real — daily `ActivityLog` rows written by a sync job, computed server-side |
| Resume version tracker | Real — PDF upload, list, download, delete, set-active. **Stored on local disk by default — see note below before deploying** |
| Application/job Kanban tracker | Real — full CRUD, drag-and-drop + dropdown fallback, stats |
| AI weekly review | Real — aggregates your week's data and calls the Claude API |
| Goal planner | Real — auto-progress for LeetCode/streak/application goals, manual progress for custom goals |
| Dark mode, loading/empty/error states, responsive layout | Implemented throughout |

## 4. Important: file storage before deploying

`src/lib/storage.ts` saves resume PDFs to `public/uploads` on local disk.
This works for local development but **will not persist on Vercel** (its
filesystem is read-only/ephemeral outside `/tmp`). Before deploying, swap
`saveFile`/`deleteFile` in that one file for Supabase Storage or S3 — the API
routes that call it don't need to change.

## 5. Deploying

1. Spin up a Postgres database (Supabase or Neon both have free tiers).
2. In `prisma/schema.prisma`, change the datasource provider from `sqlite`
   to `postgresql`.
3. Set `DATABASE_URL` to your Postgres connection string, then run
   `npx prisma migrate dev --name init` locally once to create the schema
   (or `npx prisma db push`).
4. Swap resume storage per the note above.
5. Deploy to Vercel, add all `.env` values as environment variables there.
6. Update the GitHub OAuth App's callback URL to your production domain,
   and `NEXTAUTH_URL` to match.
7. `vercel.json` already defines two cron jobs (daily activity sync at 2am,
   weekly review generation Sunday 8pm UTC) — Vercel picks these up
   automatically on deploy. Set `CRON_SECRET` in your Vercel project's env
   vars; Vercel Cron attaches it as a bearer token automatically.

## 6. Project structure

```
src/
  app/
    login/, onboarding/              pre-auth pages
    (app)/                           authenticated shell (sidebar nav)
      dashboard/ github/ leetcode/ resume/ applications/ goals/ reviews/ settings/
    api/
      auth/[...nextauth]/            NextAuth handler
      github/stats/ leetcode/stats/  cached external stats
      activity/sync/ activity/streak/  streak engine
      resume/ applications/ goals/ reviews/  CRUD
      cron/daily-activity/ cron/weekly-review/  scheduled jobs
  components/                        UI + dashboard widgets
  lib/                                github.ts, leetcode.ts, claude.ts, activity.ts,
                                       weekly-review.ts, auth.ts, prisma.ts, storage.ts
prisma/schema.prisma                  full data model
vercel.json                           cron schedule
```

## 7. A note on the LeetCode integration

LeetCode has no official public API. This app uses the same unofficial
GraphQL endpoint LeetCode's own website calls. It's public data and needs no
auth, but LeetCode can change or rate-limit this endpoint without notice —
every place that calls it catches failures and falls back to the last
successfully cached data instead of crashing the page.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for
guidelines and development setup.

## License

This project is licensed under the [MIT License](./LICENSE).
