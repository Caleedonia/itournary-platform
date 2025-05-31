"use client";

import { SessionProvider } from "next-auth/react";
import { AnalyticsProvider } from "@/components/Analytics";
import type { AppProps } from "next/app";

interface NextAuthProviderProps {
  children: React.ReactNode;
  // Removed session prop as it's not directly passed like this in App Router
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  // The SessionProvider should be placed at a higher level in your app,
  // typically in the root layout or a specific layout that needs session context.
  return (
    <SessionProvider>
      <AnalyticsProvider>
        {children}
      </AnalyticsProvider>
    </SessionProvider>
  );
}
