"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function AdminNavLink() {
  const { data: session } = useSession();
  
  // Show admin link only if user has admin role
  if (session?.user?.role === 'admin') {
    return (
      <li>
        <Link href="/admin" className="hover:text-coral-500 transition-colors">
          Admin
        </Link>
      </li>
    );
  }
  
  // Otherwise don't show anything
  return null;
}
