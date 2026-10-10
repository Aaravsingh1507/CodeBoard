import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ variable: "--font-sans-main", subsets: ["latin"] });
const jbMono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080c17",
};

const baseUrl = process.env.NEXTAUTH_URL || "https://codeboard-rho.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CodeBoard — Developer Placement Prep & Tracker",
    template: "%s | CodeBoard",
  },
  description:
    "All your placement prep in one place. CodeBoard unifies your GitHub, LeetCode, job applications, and goals into one dashboard.",
  keywords: [
    "CodeBoard",
    "placement preparation",
    "developer activity tracker",
    "leetcode tracker",
    "github activity tracker",
    "placement prep",
    "software engineer dashboard",
  ],
  authors: [
    {
      name: "Aarav Singh",
      url: "https://www.linkedin.com/in/aarav-singh-821806388",
    },
    {
      name: "Aarav Singh",
      url: "https://github.com/Aaravsingh1507",
    },
  ],
  creator: "Aarav Singh",
  publisher: "Aarav Singh",
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/logo.png" },
    ],
  },
  openGraph: {
    title: "CodeBoard — Developer Placement Prep & Tracker",
    description:
      "All your placement prep in one place. Your GitHub, LeetCode, applications, and goals.",
    url: baseUrl,
    siteName: "CodeBoard",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "CodeBoard Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBoard — Developer Placement Prep & Tracker",
    description: "All your placement prep in one place. Your GitHub, LeetCode, applications, and goals.",
    images: ["/logo.png"],
  },
  verification: {
    google: "nfD7T5QSSfIxzfnod1h8Z4uz-FGoitmoco7SN-DZ8zY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#webapp`,
        name: "CodeBoard",
        url: baseUrl,
        description:
          "All your placement prep in one place. Your GitHub, LeetCode, applications, and goals.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        author: {
          "@id": `${baseUrl}/#creator`,
        },
        creator: {
          "@id": `${baseUrl}/#creator`,
        },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#creator`,
        name: "Aarav Singh",
        jobTitle: "AI & Web Developer | Creator of CodeBoard",
        description:
          "First-Year Artificial Intelligence student at Noida Institute of Engineering and Technology (NIET) focusing on AI, Machine Learning, Python Development, and Web Technologies.",
        affiliation: {
          "@type": "EducationalOrganization",
          name: "Noida Institute of Engineering and Technology (NIET)",
        },
        url: "https://aarav-portfolio-1f2b9.web.app/",
        sameAs: [
          "https://www.linkedin.com/in/aarav-singh-821806388",
          "https://github.com/Aaravsingh1507",
          "https://aarav-portfolio-1f2b9.web.app/",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-purple-500/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
