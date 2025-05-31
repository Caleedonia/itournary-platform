"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { AnalyticsDashboardIntegration } from '@/components/Analytics';
import Link from 'next/link';

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession();
  const [activeDashboard, setActiveDashboard] = useState('executive');
  
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
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">iTournary Analytics Dashboard</h1>
      
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveDashboard('executive')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'executive'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Executive Overview
          </button>
          <button
            onClick={() => setActiveDashboard('community')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'community'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => setActiveDashboard('emotional')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'emotional'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Emotional Experience
          </button>
          <button
            onClick={() => setActiveDashboard('trust')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'trust'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Trust Ecosystem
          </button>
          <button
            onClick={() => setActiveDashboard('retention')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'retention'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Retention
          </button>
          <button
            onClick={() => setActiveDashboard('mobile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeDashboard === 'mobile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Mobile Experience
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        <AnalyticsDashboardIntegration 
          defaultDashboard={activeDashboard}
          userRole="admin"
        />
      </div>
    </div>
  );
}
