'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (eventType: string, eventData: any) => void;
  trackPageView: (pageName: string, pageData?: any) => void;
  getUserId: () => string | null;
  isAnalyticsEnabled: boolean;
  setAnalyticsEnabled: (enabled: boolean) => void;
  getUserPreferences: () => { [key: string]: boolean };
  setUserPreference: (key: string, value: boolean) => void;
}

const defaultContextValue: AnalyticsContextType = {
  trackEvent: () => {},
  trackPageView: () => {},
  getUserId: () => null,
  isAnalyticsEnabled: false,
  setAnalyticsEnabled: () => {},
  getUserPreferences: () => ({}),
  setUserPreference: () => {},
};

const AnalyticsContext = createContext<AnalyticsContextType>(defaultContextValue);

interface AnalyticsProviderProps {
  children: ReactNode;
  userId?: string | null;
}

export const AnalyticsProvider = ({ children, userId }: AnalyticsProviderProps) => {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);
  const [userPreferences, setUserPreferences] = useState<{ [key: string]: boolean }>({
    analytics_behavioral: false,
    analytics_performance: true,
    analytics_functional: true,
  });
  const [analyticsUserId, setAnalyticsUserId] = useState<string | null>(null);

  // Initialize analytics based on saved preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if analytics consent is stored in localStorage
    const storedAnalyticsEnabled = localStorage.getItem('analytics_enabled');
    if (storedAnalyticsEnabled) {
      setIsAnalyticsEnabled(storedAnalyticsEnabled === 'true');
    }

    // Load user preferences from localStorage
    const storedPreferences = localStorage.getItem('analytics_preferences');
    if (storedPreferences) {
      try {
        setUserPreferences(JSON.parse(storedPreferences));
      } catch (error) {
        console.error('Error parsing analytics preferences:', error);
      }
    }

    // Set analytics user ID - use provided userId or generate anonymous one
    if (userId) {
      setAnalyticsUserId(userId);
    } else {
      const storedAnonymousId = localStorage.getItem('analytics_anonymous_id');
      if (storedAnonymousId) {
        setAnalyticsUserId(storedAnonymousId);
      } else {
        const newAnonymousId = `anon-${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('analytics_anonymous_id', newAnonymousId);
        setAnalyticsUserId(newAnonymousId);
      }
    }
  }, [userId]);

  // Save preferences when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('analytics_enabled', isAnalyticsEnabled.toString());
    localStorage.setItem('analytics_preferences', JSON.stringify(userPreferences));
  }, [isAnalyticsEnabled, userPreferences]);

  // Track events if analytics is enabled
  const trackEvent = (eventType: string, eventData: any) => {
    if (!isAnalyticsEnabled) return;

    // Check if the specific category is enabled
    const eventCategory = eventData?.category || 'functional';
    const preferenceKey = `analytics_${eventCategory.toLowerCase()}`;
    
    if (!userPreferences[preferenceKey] && preferenceKey !== 'analytics_functional') {
      return; // Don't track if this category is disabled (except functional)
    }

    console.log(`[Analytics] Event: ${eventType}`, eventData);

    // Here you would integrate with real analytics services
    // For example: Google Analytics, Mixpanel, etc.
    try {
      // Example integration point
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        // @ts-ignore
        window.dataLayer.push({
          event: eventType,
          ...eventData,
          userId: analyticsUserId,
          timestamp: new Date().toISOString()
        });
      }

      // API call to store analytics event
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          eventData: {
            ...eventData,
            userId: analyticsUserId,
            timestamp: new Date().toISOString()
          }
        }),
      }).catch(error => {
        // Silent catch - analytics should not break the app
        console.error('Error sending analytics data:', error);
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // Track page views
  const trackPageView = (pageName: string, pageData?: any) => {
    trackEvent('pageView', {
      pageName,
      ...pageData,
      category: 'functional',
    });
  };

  // Get the current user ID
  const getUserId = () => analyticsUserId;

  // Set a specific user preference
  const setUserPreference = (key: string, value: boolean) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Get all user preferences
  const getUserPreferences = () => userPreferences;

  // Set whether analytics tracking is enabled
  const setAnalyticsEnabled = (enabled: boolean) => {
    setIsAnalyticsEnabled(enabled);
  };

  const contextValue: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    getUserId,
    isAnalyticsEnabled,
    setAnalyticsEnabled,
    getUserPreferences,
    setUserPreference,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Hook for easy access to the analytics context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export default AnalyticsContext;
