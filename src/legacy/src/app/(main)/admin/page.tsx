"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  
  // Loading state
  if (status === "loading") {
    return <div className="container mx-auto p-8">Loading session...</div>;
  }
  
  // Check for admin access
  // @ts-ignore - adding role type check
  if (!session || !session.user || session.user.role !== "admin") {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <Link href="/" className="mt-6 inline-block text-ocean-blue-600 hover:text-ocean-blue-700">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">Welcome to the administration panel. Select a section to manage.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/analytics" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-ocean-blue-600">Analytics Dashboard</h2>
          <p className="text-gray-600">View comprehensive platform analytics and performance metrics.</p>
        </Link>
        
        <Link href="#" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-ocean-blue-600">User Management</h2>
          <p className="text-gray-600">Manage user accounts, roles, and permissions.</p>
          <p className="mt-2 text-sm italic text-gray-500">Coming soon</p>
        </Link>
        
        <Link href="#" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-ocean-blue-600">Content Management</h2>
          <p className="text-gray-600">Edit and manage platform content and resources.</p>
          <p className="mt-2 text-sm italic text-gray-500">Coming soon</p>
        </Link>
        
        <Link href="#" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-ocean-blue-600">Partner Management</h2>
          <p className="text-gray-600">Manage service providers and partnership integrations.</p>
          <p className="mt-2 text-sm italic text-gray-500">Coming soon</p>
        </Link>
      </div>
    </div>
  );
}
