/**
 * Data Layer Management
 * 
 * This module provides the interface for sending analytics data to the data layer
 * and managing tracking permissions.
 */

// Check if analytics tracking is allowed based on user consent
export const isTrackingAllowed = () => {
  // In a production environment, this would check user consent settings from cookies or localStorage
  if (typeof window === 'undefined') return false;
  
  const analyticsEnabled = localStorage.getItem('analytics_enabled');
  return analyticsEnabled === 'true';
};

// Push data to the data layer
export const pushToDataLayer = (event, data = {}) => {
  if (!isTrackingAllowed()) return;
  
  try {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || [];
      
      // Add timestamp and standard properties
      const enrichedData = {
        ...data,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        pageTitle: document.title,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      };
      
      // Push to dataLayer
      window.dataLayer.push({
        event,
        ...enrichedData
      });
      
      // Log for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${event}:`, enrichedData);
      }
      
      // Also send to API for server-side processing
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          data: enrichedData
        })
      }).catch(error => {
        // Silent catch - analytics should not break the app
        console.error('Error sending to analytics API:', error);
      });
    }
  } catch (error) {
    // Silent catch - analytics errors should never interfere with app functionality
    console.error('Error in dataLayer push:', error);
  }
};

// Set user properties in the data layer
export const setUserProperties = (properties) => {
  if (!isTrackingAllowed()) return;
  
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'set_user_properties',
        user_properties: properties
      });
    }
  } catch (error) {
    console.error('Error in setting user properties:', error);
  }
};

// Initialize analytics with base configuration
export const initializeAnalytics = () => {
  if (!isTrackingAllowed()) return;
  
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'iTournary_version': process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
        'analytics_init_time': new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};

export default {
  pushToDataLayer,
  isTrackingAllowed,
  setUserProperties,
  initializeAnalytics
};
