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

export const metadata: Metadata = {
  title: "CodeBoard",
  description:
    "Are you actually placement-ready? Your GitHub, LeetCode, applications, and goals — one readiness score.",
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
    title: "CodeBoard",
    description:
      "Are you actually placement-ready? Your GitHub, LeetCode, applications, and goals — one readiness score.",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "CodeBoard Logo" }],
  },
  twitter: {
    card: "summary",
    title: "CodeBoard",
    description: "Are you actually placement-ready? One readiness score.",
    images: ["/logo.png"],
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-purple-500/30 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
