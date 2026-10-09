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
    default: "CodeBoard — Developer Placement Readiness & Tracker",
    template: "%s | CodeBoard",
  },
  description:
    "Are you actually placement-ready? CodeBoard unifies your GitHub, LeetCode, job applications, and goals into one real readiness score.",
  keywords: [
    "CodeBoard",
    "placement readiness",
    "developer activity tracker",
    "leetcode tracker",
    "github activity tracker",
    "placement prep",
    "software engineer dashboard",
  ],
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
    title: "CodeBoard — Developer Placement Readiness & Tracker",
    description:
      "Are you actually placement-ready? Your GitHub, LeetCode, applications, and goals — one readiness score.",
    url: baseUrl,
    siteName: "CodeBoard",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "CodeBoard Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBoard — Developer Placement Readiness & Tracker",
    description: "Are you actually placement-ready? One readiness score.",
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
    "@type": "WebApplication",
    name: "CodeBoard",
    url: baseUrl,
    description:
      "Are you actually placement-ready? Your GitHub, LeetCode, applications, and goals — one readiness score.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
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
