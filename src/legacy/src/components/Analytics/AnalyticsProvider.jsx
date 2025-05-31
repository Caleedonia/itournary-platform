/**
 * Analytics Integration Component
 * 
 * This component provides a React context for analytics integration
 * and hooks for using analytics throughout the application.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeProviders } from './providers';
import { trackPageView } from './eventTracking';

// Create Analytics Context
const AnalyticsContext = createContext({
  initialized: false,
  consentGiven: false,
  updateConsent: () => {},
});

/**
 * Analytics Provider Component
 * 
 * Provides analytics context to the application
 * 
 * @param {Object} props - Component props
 * @param {Object} props.config - Analytics configuration
 * @param {Object} props.children - Child components
 */
export const AnalyticsProvider = ({ config, children }) => {
  const [initialized, setInitialized] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  // Initialize analytics providers
  useEffect(() => {
    if (!initialized && config) {
      try {
        initializeProviders(config);
        setInitialized(true);
        
        // Check if consent is already given
        if (window.consentState && window.consentState.analytics) {
          setConsentGiven(true);
        }
        
        console.log('Analytics initialized successfully');
      } catch (error) {
        console.error('Error initializing analytics:', error);
      }
    }
  }, [config, initialized]);
  
  // Update consent state
  const updateConsent = (newState) => {
    if (window.updateConsentState) {
      window.updateConsentState(newState);
      setConsentGiven(newState.analytics === true);
    }
  };
  
  // Track page views
  useEffect(() => {
    if (initialized && consentGiven) {
      // Track initial page view
      trackPageView(document.title, {
        path: window.location.pathname,
        url: window.location.href,
      });
      
      // Set up history change listener for SPA navigation
      const handleRouteChange = () => {
        trackPageView(document.title, {
          path: window.location.pathname,
          url: window.location.href,
        });
      };
      
      // Listen for route changes
      window.addEventListener('popstate', handleRouteChange);
      
      // Clean up listener
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [initialized, consentGiven]);
  
  return (
    <AnalyticsContext.Provider value={{ initialized, consentGiven, updateConsent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

/**
 * Hook for using analytics in components
 * 
 * @returns {Object} Analytics context
 */
export const useAnalytics = () => useContext(AnalyticsContext);

/**
 * Higher-order component for tracking page views
 * 
 * @param {React.Component} Component - Component to wrap
 * @param {string} pageName - Name of the page
 * @returns {React.Component} Wrapped component with page view tracking
 */
export const withPageTracking = (Component, pageName) => {
  const WithPageTracking = (props) => {
    const { initialized, consentGiven } = useAnalytics();
    
    useEffect(() => {
      if (initialized && consentGiven) {
        trackPageView(pageName || document.title, {
          path: window.location.pathname,
          url: window.location.href,
          ...props.analyticsProps
        });
      }
    }, [initialized, consentGiven, props.analyticsProps]);
    
    return <Component {...props} />;
  };
  
  WithPageTracking.displayName = `WithPageTracking(${Component.displayName || Component.name || 'Component'})`;
  
  return WithPageTracking;
};

/**
 * Hook for tracking component mount
 * 
 * @param {string} componentName - Name of the component
 * @param {Object} properties - Additional properties to track
 */
export const useComponentTracking = (componentName, properties = {}) => {
  const { initialized, consentGiven } = useAnalytics();
  
  useEffect(() => {
    if (initialized && consentGiven) {
      trackPageView(`Component: ${componentName}`, {
        componentName,
        ...properties
      });
    }
  }, [initialized, consentGiven, componentName, properties]);
};

export default {
  AnalyticsProvider,
  useAnalytics,
  withPageTracking,
  useComponentTracking
};
