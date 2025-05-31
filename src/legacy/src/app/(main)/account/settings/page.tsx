"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { AnalyticsSettings } from '@/components/Analytics';
import Link from 'next/link';

export default function UserSettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (status === "loading") {
    return <div className="container mx-auto p-8">Loading session...</div>;
  }
  
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In Required</h1>
          <p className="text-center text-gray-600 mb-6">Please sign in to access your account settings.</p>
          <Link href="/api/auth/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-blue-600 hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Profile Settings
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Privacy & Analytics
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Notifications
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <p className="text-gray-600 mb-4">Update your personal information and preferences.</p>
            <div className="space-y-4">
              {/* Profile settings form would go here */}
              <p className="italic text-gray-500">Profile settings coming soon...</p>
            </div>
          </div>
        )}
        
        {activeTab === 'privacy' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Privacy & Analytics Settings</h2>
            <p className="text-gray-600 mb-4">Control how your data is collected and used.</p>
            <AnalyticsSettings userId={session.user?.id} />
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <p className="text-gray-600 mb-4">Manage how and when you receive notifications.</p>
            <div className="space-y-4">
              {/* Notification settings form would go here */}
              <p className="italic text-gray-500">Notification settings coming soon...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Link href="/account" className="text-ocean-blue-600 hover:text-ocean-blue-700 font-medium">
          &larr; Back to Account
        </Link>
      </div>
    </div>
  );
}
