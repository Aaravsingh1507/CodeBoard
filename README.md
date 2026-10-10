# CodeBoard 🚀

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon_Postgres-00E599?style=flat-square&logo=postgresql&logoColor=black)](https://neon.tech/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-F05A28?style=flat-square&logo=fastapi&logoColor=white)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel_Deployment-000000?style=flat-square&logo=vercel&logoColor=white)](https://codeboard-rho.vercel.app)

**Live Web App**: [https://codeboard-rho.vercel.app](https://codeboard-rho.vercel.app)  
**Explore Live Interactive Demo**: [https://codeboard-rho.vercel.app/preview](https://codeboard-rho.vercel.app/preview)

---

### Are you actually placement-ready?

**CodeBoard** is an end-to-end career readiness dashboard built specifically for engineering and CS students. It pulls your real GitHub activity, live LeetCode practice, job applications pipeline, and placement goals into one unified command center — condensing them into a single, calibrated **Readiness Score (0–100)** with actionable weekly nudges.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Every metric is powered by live APIs (**GitHub GraphQL/REST**, **LeetCode GraphQL**, and **Groq AI**) — zero mock numbers or fake data fallbacks.

---

## 🌟 Key Features & Capabilities

### 🎯 1. Composite Readiness Score & Smart Nudges
- **Single 0–100 Readiness Metric**: Synthesizes coding streak consistency, LeetCode problem volume, job-application momentum, and placement goal pace into one reliable indicator.
- **Actionable Smart Nudges**: Context-aware suggestions triggered by real gaps (e.g., stale applications, broken coding streaks, or unbalanced topic practice).
- **Milestone Banner**: High-DPI Retina banner celebrating consistency and small daily progress.

### 🎯 2. MatchScope — AI Resume ↔ JD ATS Matcher
- **In-Memory PDF Parsing**: Instant text extraction from uploaded resume PDFs via `unpdf` with magic bytes (`%PDF`) validation.
- **AI ATS Match Score (0–100)**: Evaluates resumes against specific Job Descriptions using Groq AI (`openai/gpt-oss-120b`) with mathematical calibration and rating labels (*Poor Fit* to *Excellent Fit*).
- **Category Breakdown**: Granular scoring across Technical Skills, Domain Experience, Education, and Engineering Depth.
- **Keyword Intelligence**: Classifies job requirements into matched, partial, and critical missing keywords.
- **Prioritized Resume Edits**: Actionable high/medium/low priority bullet point improvements with context.
- **Personalized Career Roadmap**:
  - **DSA Targets**: Recommended problem counts and focus topics tailored to the role.
  - **Focus Projects**: Curated real-world project recommendations complete with recommended tech stacks and business impact.
  - **Tool Mastery Matrix**: Clear breakdown of tools into *Mastered*, *Needs Practice*, and *Must Learn*.

### 🐙 3. Real-Time GitHub Analytics
- **Repository Analyzer**: Inspects your public and private repositories, auto-calculating total analyzed repos.
- **Multi-Language Donut Chart**: Interactive breakdown of languages used across your projects with central repo counter.
- **Month-over-Month Velocity**: Real-time commit tracking and capped percentage trend comparisons.
- **Live Activity Sync**: Automatically synchronizes contributions made today with cache optimization.

### ⚡ 4. Live LeetCode Analytics
- **GraphQL Integration**: Connects to LeetCode's live GraphQL engine without requiring private credentials.
- **Glowing Amber Summary Cards**: Solved counts categorized across Easy, Medium, and Hard tiers.
- **Topic-Wise DSA Breakdown**: Automatically maps your submissions across Fundamental, Intermediate, and Advanced DSA topics (Arrays, Trees, Graphs, DP).
- **Recent Submissions Log**: Real-time feed of recently accepted solutions and problem ratings.

### 💼 5. Applications Kanban & Interview Round Tracker
- **Stage-Based Pipeline**: Visual Kanban board for job applications (*Wishlist*, *Applied*, *Screening*, *Interviewing*, *Offer*, *Rejected*).
- **Interview Round Tracking**: Log per-application interview rounds with round types, dates, outcomes, and free-text debrief notes to track interview patterns over time.

### 👥 6. Study Circles
- **Peer Accountability**: Create or join private peer circles via unique invite codes.
- **Weekly Leaderboards**: Track batchmates' streak consistency, score deltas, and current readiness scores.
- **7-Day Mini Heatmaps**: Expandable contribution heatmaps for every member in your circle.

### ⏳ 7. Placement Countdown & Company Prep Focus
- **Dynamic Placement Countdown**: Set your placement target date in Settings; goals automatically back-calculate your required weekly pace.
- **Company Prep Focus**: Curated guidance matched against target companies (Google, Amazon, Microsoft, etc.) with company logos and key technical patterns.

### 🧠 8. AI Weekly Reviews
- **Automated AI Retrospectives**: Generates comprehensive weekly summaries analyzing your coding volume and application velocity.
- **Auto-Pruning Engine**: Automatically keeps current and previous week reviews, ensuring instant load times and lean database storage.

### 🌓 9. Cyberpunk Glassmorphism UI & Dual Themes
- **Dark & Light Modes**: Seamless switching between glowing cyberpunk dark mode and crisp high-contrast light mode via `next-themes`.
- **Micro-Animations & Toasts**: Smooth checkmark bounces, floating toasts on save, and responsive mobile navigation bar with sticky header and `100dvh` viewport containment.

### 🔐 10. Production Security & SEO Architecture
- **Enterprise Security**: Hardened HTTP headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy), sliding-window rate limiting, and timing-safe authentication.
- **Rich SEO & Google Knowledge Graph**: Native `sitemap.ts`, `robots.ts`, Search Console verification, and Schema.org `Person` & `WebApplication` structured data linking.

---

## 🔑 Authentication Options

CodeBoard provides three frictionless ways to use the platform:

1. **GitHub OAuth**: Full NextAuth (Auth.js v5) sign-in with repository access for deep commit analytics.
2. **LeetCode Direct Sign-In**: Sign in instantly with just your **LeetCode username** — no GitHub account required to track DSA progress and use MatchScope.
3. **Interactive Demo Preview (`/preview`)**: Test and explore all pages, widgets, and MatchScope with preloaded interactive data without logging in.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS + Lucide Icons + next-themes |
| **Database** | Neon Postgres (Production) / SQLite (Local development) |
| **ORM** | Prisma ORM with `@prisma/adapter-neon` |
| **Authentication** | NextAuth.js (Auth.js v5) — GitHub OAuth & LeetCode Credentials |
| **AI Engine** | Groq API (`openai/gpt-oss-120b`) |
| **PDF Processing** | `unpdf` (In-memory serverless PDF parsing) |
| **Data Fetching** | SWR + Next.js Server Components |
| **Hosting & Crons** | Vercel (Edge CDN, Serverless Functions & Cron Jobs) |

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: 18.18+ and `npm`
- **GitHub OAuth App**: (Optional for GitHub login) from [GitHub Developer Settings](https://github.com/settings/developers)
- **Groq API Key**: (Optional for AI MatchScope and Weekly Reviews) from [Groq Console](https://console.groq.com/)

### 2. Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Aaravsingh1507/CodeBoard.git
cd CodeBoard

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 3. Environment Variables (`.env`)

Configure the following variables in your `.env` file:

```env
# Database (SQLite for local dev)
DATABASE_URL="file:./dev.db"

# Auth.js / NextAuth
AUTH_SECRET="your-auth-secret" # Generate with: npx auth secret
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (Optional if using LeetCode login)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Groq AI (Required for MatchScope & AI Reviews)
GROQ_API_KEY="your_groq_api_key"
GROQ_MODEL="openai/gpt-oss-120b"

# Cron Security
CRON_SECRET="your_random_cron_secret"
```

### 4. Database Initialization & Run

```bash
# Generate Prisma Client & push schema to local database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment (Vercel + Neon Postgres)

The web app is deployed in production at [https://codeboard-rho.vercel.app](https://codeboard-rho.vercel.app).

To deploy your own instance:

1. **Push to GitHub** and import the repository into [Vercel](https://vercel.com).
2. **Create a Neon Database**:
   - In your Vercel Project dashboard, go to the **Storage** tab and create a **Neon Postgres** database.
   - Vercel automatically sets `DATABASE_URL` in your environment variables.
3. **Set Environment Variables** in Vercel Project Settings:
   - `AUTH_SECRET`: Run `npx auth secret` locally and paste the output.
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App credentials.
   - `NEXTAUTH_URL`: Your production Vercel URL (e.g. `https://codeboard-rho.vercel.app`).
   - `GROQ_API_KEY`: Your Groq API key.
   - `CRON_SECRET`: Random secret string for securing scheduled tasks.
4. **Update GitHub OAuth App Callback URL**:
   - Set Authorization callback URL to `https://your-domain.vercel.app/api/auth/callback/github`.
5. **Automatic Crons**:
   - `vercel.json` automatically registers cron jobs for daily activity syncing, weekly reviews, and weekly digest.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/                          # Authenticated Shell (Sidebar Navigation)
│   │   ├── applications/               # Applications Kanban & Interview Round Tracker
│   │   ├── circles/                    # Peer Study Circles & Leaderboards
│   │   ├── dashboard/                  # Main Overview, Small Steps Banner & Streak
│   │   ├── github/                     # GitHub Deep Analytics & Language Donut
│   │   ├── goals/                      # Placement Goals & Target Countdown
│   │   ├── leetcode/                   # LeetCode GraphQL Analytics & Topic DSA
│   │   ├── matchscope/                 # AI Resume ↔ JD ATS Matcher & Career Roadmap
│   │   ├── reviews/                    # AI Weekly Reviews (Current & Previous)
│   │   └── settings/                   # Cyberpunk Glassmorphic Profile & Config
│   ├── api/
│   │   ├── activity/                   # Daily commit & streak synchronization
│   │   ├── applications/               # Applications CRUD & interview rounds
│   │   ├── auth/[...nextauth]/         # NextAuth GitHub & LeetCode handlers
│   │   ├── circles/                    # Circles creation & invite-code joining
│   │   ├── company-prep/               # Curated target company intelligence
│   │   ├── cron/                       # Scheduled activity sync & review crons
│   │   ├── github/stats/               # Live GitHub statistics fetcher
│   │   ├── leetcode/stats/             # Unofficial LeetCode GraphQL fetcher
│   │   ├── matchscope/                 # Serverless in-memory PDF extraction & ATS scoring
│   │   ├── placement/                  # Placement date & weekly pacing engine
│   │   ├── readiness/                  # Composite readiness score engine
│   │   └── reviews/                    # Weekly AI retrospectives generator
│   ├── login/                          # Dual sign-in (GitHub OAuth & LeetCode username)
│   ├── onboarding/                     # First-time profile & placement target onboarding
│   ├── preview/                        # Interactive live demo (no login required)
│   ├── u/[slug]/                       # Public sanitized shareable developer profile
│   ├── robots.ts & sitemap.ts          # SEO and Google indexing directives
│   └── layout.tsx                      # Root layout, fonts, and Schema.org Person graph
├── components/
│   ├── matchscope/                     # Category breakdown, score ring, keyword chips
│   ├── github/                         # Language donut chart, profile overview card
│   ├── widgets/                        # Small Steps banner, readiness card, streak widget
│   ├── ui/                             # Buttons, inputs, modals, cards, badges
│   ├── app-shell.tsx                   # Responsive layout with sticky mobile navigation
│   └── sidebar.tsx                     # Sidebar navigation with theme toggles
├── lib/
│   ├── auth.ts                         # NextAuth configuration (GitHub + Credentials)
│   ├── github.ts & leetcode.ts         # Live API clients
│   ├── groq.ts                         # Groq AI client configuration
│   ├── readiness.ts                    # Mathematical readiness formula & smart nudges
│   ├── rate-limit.ts                   # In-memory rate limiting guard
│   └── storage.ts                      # Magic bytes validation & temporary upload handling
├── prisma/
│   └── schema.prisma                   # PostgreSQL / SQLite unified database schema
└── vercel.json                         # Cron schedules for background automated tasks
```

---

## 👤 Author & Creator

**Aarav Singh**  
*Computer Science & AI Student, NIET | Python Developer & AI/ML Enthusiast*

- 🌐 **Live Web App**: [codeboard-rho.vercel.app](https://codeboard-rho.vercel.app)
- 🚀 **Interactive Demo**: [codeboard-rho.vercel.app/preview](https://codeboard-rho.vercel.app/preview)
- 💼 **LinkedIn**: [linkedin.com/in/aarav-singh-821806388](https://www.linkedin.com/in/aarav-singh-821806388)
- 🐙 **GitHub**: [@Aaravsingh1507](https://github.com/Aaravsingh1507)
- ⚡ **Personal Portfolio**: [aarav-portfolio-1f2b9.web.app](https://aarav-portfolio-1f2b9.web.app/)

---

*CodeBoard is actively maintained and built to empower students to turn everyday coding into verifiable placement readiness.*
