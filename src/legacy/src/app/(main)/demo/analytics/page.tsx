"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { AnalyticsValidation, useAnalytics } from '@/components/Analytics';

export default function AnalyticsTestPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('validation');
  const analytics = useAnalytics();

  // Example experienceId and userId for testing
  const experienceId = 'test-experience-123';
  const userId = session?.user?.id || 'anonymous-user';
  
  // Test functions to trigger analytics events
  const trackTimelineEvent = () => {
    analytics.trackEvent('timeline_item_creation', {
      itemId: 'item-123',
      itemType: 'activity',
      name: 'Beach Visit',
      location: 'Malibu Beach',
      duration: 120, // minutes
      category: 'timeline'
    });
    alert('Timeline event tracked!');
  };
  
  const trackBudgetEvent = () => {
    analytics.trackEvent('budget_update', {
      budgetId: 'budget-123',
      previousTotal: 1000,
      newTotal: 1200,
      category: 'budget',
      actionType: 'update'
    });
    alert('Budget event tracked!');
  };
  
  const trackCommunityEvent = () => {
    analytics.trackEvent('community_social_interaction', {
      contentId: 'post-123',
      interactionType: 'like',
      contentType: 'image',
      topic: 'travel',
      category: 'community'
    });
    alert('Community event tracked!');
  };
  
  const trackEmotionalEvent = () => {
    analytics.trackEvent('emotional_emotion_capture', {
      captureId: 'emotion-123',
      emotion: 'joy',
      intensity: 8,
      context: 'Watching sunset at beach',
      category: 'emotional'
    });
    alert('Emotional event tracked!');
  };
  
  const trackPageView = () => {
    analytics.trackPageView('demo_analytics_page', {
      section: 'testing',
      testMode: true
    });
    alert('Page view tracked!');
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Testing Dashboard</h1>
      <p className="mb-6 text-gray-600">
        This page demonstrates the analytics integration. Use the buttons below 
        to trigger test events and validate the analytics functionality.
      </p>
      
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('validation')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'validation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Validation
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'budget'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Budget
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'community'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => setActiveTab('emotional')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'emotional'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Emotional
          </button>
          <button
            onClick={() => setActiveTab('pageview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'pageview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Page View
          </button>
        </nav>
      </div>
      
      <div className="mt-6">
        {activeTab === 'validation' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analytics Validation</h2>
            <p className="text-gray-600 mb-4">Validate the analytics system functionality.</p>
            <AnalyticsValidation />
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Timeline Analytics Testing</h2>
            <p className="text-gray-600 mb-4">Test Timeline events tracking.</p>
            
            <div className="mt-6">
              <button 
                onClick={trackTimelineEvent}
                className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Track Timeline Item Creation
              </button>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="text-xs">
                  {JSON.stringify({
                    itemId: 'item-123',
                    itemType: 'activity',
                    name: 'Beach Visit',
                    location: 'Malibu Beach',
                    duration: 120
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Budget Analytics Testing</h2>
            <p className="text-gray-600 mb-4">Test Budget events tracking.</p>
            
            <div className="mt-6">
              <button 
                onClick={trackBudgetEvent}
                className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Track Budget Update
              </button>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="text-xs">
                  {JSON.stringify({
                    budgetId: 'budget-123',
                    previousTotal: 1000,
                    newTotal: 1200,
                    category: 'accommodation'
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'community' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Community Analytics Testing</h2>
            <p className="text-gray-600 mb-4">Test Community events tracking.</p>
            
            <div className="mt-6">
              <button 
                onClick={trackCommunityEvent}
                className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Track Social Interaction
              </button>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="text-xs">
                  {JSON.stringify({
                    contentId: 'post-123',
                    interactionType: 'like',
                    contentType: 'image',
                    topic: 'travel'
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'emotional' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Emotional Analytics Testing</h2>
            <p className="text-gray-600 mb-4">Test Emotional Experience events tracking.</p>
            
            <div className="mt-6">
              <button 
                onClick={trackEmotionalEvent}
                className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Track Emotion Capture
              </button>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="text-xs">
                  {JSON.stringify({
                    captureId: 'emotion-123',
                    emotion: 'joy',
                    intensity: 8,
                    context: 'Watching sunset at beach'
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'pageview' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Page View Analytics Testing</h2>
            <p className="text-gray-600 mb-4">Test Page View tracking.</p>
            
            <div className="mt-6">
              <button 
                onClick={trackPageView}
                className="bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Track Page View
              </button>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <pre className="text-xs">
                  {JSON.stringify({
                    pageName: 'demo_analytics_page',
                    section: 'testing',
                    testMode: true
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
