"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Client-side fallback: If session token exists in cookie, redirect to dashboard
    if (
      document.cookie.includes("authjs.session-token") ||
      document.cookie.includes("next-auth.session-token")
    ) {
      router.replace("/dashboard");
    }
  }, [router]);

  return null;
}
