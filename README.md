# CodeBoard 🚀

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon_Postgres-00E599?style=flat-square&logo=postgresql&logoColor=black)](https://neon.tech/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-F05A28?style=flat-square&logo=fastapi&logoColor=white)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel_Deployment-000000?style=flat-square&logo=vercel&logoColor=white)](https://codeboard-rho.vercel.app)

**Live Web App**: [https://codeboard-rho.vercel.app](https://codeboard-rho.vercel.app)  
**Try Live Demo**: [https://codeboard-rho.vercel.app/preview](https://codeboard-rho.vercel.app/preview)

---

### Are you actually placement-ready?

**CodeBoard** is a career readiness dashboard for students and developers. It brings your GitHub coding activity, LeetCode practice, job applications, and goals into one place.

Instead of guessing your progress, CodeBoard gives you a clear **Readiness Score (0–100)** and tells you what to focus on each week to get hired.

---

## 🌟 What CodeBoard Does

- 🎯 **Readiness Score (0–100)**: A single score that shows how prepared you are for placements based on your coding consistency and practice.
- 💡 **Smart Nudges**: Helpful reminders when your streak breaks, when you haven't solved problems recently, or when applications need follow-up.
- 📄 **MatchScope (AI Resume Matcher)**: Upload your resume and paste a job description. AI checks your match score and points out missing keywords.
- 🗺️ **Personalized Roadmap**: Suggests DSA topics to practice, projects to build, and tools to learn for your target job.
- 🐙 **GitHub Tracker**: See your daily commits, contribution streaks, and top programming languages in real time.
- ⚡ **LeetCode Stats**: View solved problems by difficulty (Easy, Medium, Hard) and see your coverage across topics like Arrays, Trees, and DP.
- 💼 **Job Application Board**: A simple board to track your job applications and write down notes after each interview round.
- 👥 **Study Circles**: Create or join study groups with friends to share streaks and keep each other motivated.
- ⏳ **Placement Countdown**: Set your placement date, and CodeBoard calculates how many problems you should solve each week to stay on track.
- 🤖 **AI Weekly Reviews**: Get an automated summary of your coding progress every week with tips on where to improve.
- 🌓 **Dark & Light Mode**: Clean, responsive interface with easy theme switching on phone, tablet, and desktop.

---

## 🔑 Ways to Use CodeBoard

You can get started in three easy ways:

1. **Sign in with GitHub**: Connect your GitHub account to sync your repositories and commit history.
2. **Sign in with LeetCode**: Just enter your LeetCode username to start tracking your DSA progress right away — no GitHub account required.
3. **Explore the Live Demo**: Test all features and view sample data without logging in at [codeboard-rho.vercel.app/preview](https://codeboard-rho.vercel.app/preview).

---

## 🛠️ Tech Stack

| Part | Technology |
|---|---|
| **Frontend & Backend** | Next.js 14 (App Router), TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons, next-themes |
| **Database** | Neon Postgres (Production), SQLite (Local) |
| **ORM** | Prisma ORM |
| **Authentication** | NextAuth (Auth.js) — GitHub OAuth & LeetCode Login |
| **AI Engine** | Groq AI (`openai/gpt-oss-120b`) |
| **PDF Reading** | `unpdf` |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/                  # Main dashboard pages
│   │   ├── dashboard/          # Readiness score, banner, and streak
│   │   ├── github/             # GitHub statistics and language breakdown
│   │   ├── leetcode/           # LeetCode stats and DSA topic coverage
│   │   ├── matchscope/         # AI Resume ↔ Job Description matcher
│   │   ├── applications/       # Job applications board & interview rounds
│   │   ├── circles/            # Study circles and peer leaderboards
│   │   ├── goals/              # Target companies and placement countdown
│   │   ├── reviews/            # AI weekly reviews
│   │   └── settings/           # Profile settings and theme preferences
│   ├── login/                  # GitHub and LeetCode sign-in page
│   ├── onboarding/             # Quick setup for new users
│   ├── preview/                # Interactive live demo (no login needed)
│   ├── u/[slug]/               # Public shareable profile
│   └── api/                    # Backend API routes and sync jobs
├── components/                 # Reusable UI elements, charts, and widgets
└── lib/                        # Helper functions, AI clients, and auth config
```

---

## 👤 Author & Creator

**Aarav Singh**  
*Computer Science & AI Student at NIET | Python Developer & AI/ML Enthusiast*

- 🌐 **Live Web App**: [codeboard-rho.vercel.app](https://codeboard-rho.vercel.app)
- 🚀 **Interactive Demo**: [codeboard-rho.vercel.app/preview](https://codeboard-rho.vercel.app/preview)
- 💼 **LinkedIn**: [linkedin.com/in/aarav-singh-821806388](https://www.linkedin.com/in/aarav-singh-821806388)
- 🐙 **GitHub**: [@Aaravsingh1507](https://github.com/Aaravsingh1507)
- ⚡ **Portfolio**: [aarav-portfolio-1f2b9.web.app](https://aarav-portfolio-1f2b9.web.app/)

---

*CodeBoard helps students turn daily coding habits into job readiness.*
