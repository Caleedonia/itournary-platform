"use client";

import NextAuthProvider from "@/app/providers"; // Import the provider
import Header from "@/components/Layout/Header"; // Import new Header component
import Footer from "@/components/Layout/Footer"; // Import new Footer component
import { AnalyticsConsentBanner } from "@/components/Analytics";

// Separate component for the layout content that uses useSession
import { AdminNavLink } from './AdminNavLink';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider> {/* Wrap the layout content with the provider */}
      <MainLayoutContent>
        {children}
      </MainLayoutContent>
    </NextAuthProvider>
  );
}

// This component will have access to the session context
function MainLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnalyticsConsentBanner />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
