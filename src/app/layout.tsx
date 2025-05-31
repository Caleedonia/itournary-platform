import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './providers';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iTournary - Your Travel Experience Platform',
  description: 'Plan your trips, discover unique experiences, and create memorable journeys with iTournary.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <ChatWidget />
      </body>
    </html>
  );
}

