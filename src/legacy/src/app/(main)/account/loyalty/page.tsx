"use client";

import { useState } from 'react';
import LoyaltyDashboard from '@/components/Loyalty/LoyaltyDashboard';
import RewardsCatalog from '@/components/Loyalty/RewardsCatalog';
import AIPersonalization from '@/components/Loyalty/AIPersonalization';
import Gamification from '@/components/Loyalty/Gamification';
import SustainabilityFeatures from '@/components/Loyalty/SustainabilityFeatures';

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">iTournary Rewards</h1>
      
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'rewards'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('personalization')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'personalization'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Personalization
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('sustainability')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'sustainability'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Travel Impact
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'dashboard' && <LoyaltyDashboard />}
        {activeTab === 'rewards' && <RewardsCatalog />}
        {activeTab === 'personalization' && <AIPersonalization />}
        {activeTab === 'achievements' && <Gamification />}
        {activeTab === 'sustainability' && <SustainabilityFeatures />}
      </div>
    </div>
  );
}
