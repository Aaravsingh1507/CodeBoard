import LoginPage from "./login/page";

// Statically pre-rendered landing page for instant edge CDN delivery (TTFB < 50ms).
// Authenticated redirects are handled at the edge via middleware.ts.
export default function RootPage() {
  return <LoginPage />;
}
