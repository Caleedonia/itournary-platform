/**
 * Analytics Provider Integration
 * 
 * This module handles the integration with various analytics providers
 * including Google Analytics 4 and custom analytics pipeline.
 */

import { pushToDataLayer, isTrackingAllowed } from './dataLayer';

/**
 * Analytics provider configuration
 */
const providers = {
  ga4: {
    enabled: false,
    measurementId: null,
    initialized: false
  },
  customAnalytics: {
    enabled: false,
    apiEndpoint: null,
    apiKey: null,
    initialized: false
  }
};

/**
 * Initialize analytics providers
 * 
 * @param {Object} config - Configuration for analytics providers
 */
export function initializeProviders(config = {}) {
  if (config.ga4) {
    initializeGA4(config.ga4);
  }
  
  if (config.customAnalytics) {
    initializeCustomAnalytics(config.customAnalytics);
  }
  
  // Set up consent management if provided
  if (config.consent) {
    initializeConsentManagement(config.consent);
  }
}

/**
 * Initialize Google Analytics 4
 * 
 * @param {Object} config - GA4 configuration
 * @param {string} config.measurementId - GA4 measurement ID
 * @param {boolean} config.enabled - Whether GA4 is enabled
 */
export function initializeGA4(config) {
  if (!config || !config.measurementId) {
    console.error('GA4 measurement ID is required');
    return;
  }
  
  providers.ga4.measurementId = config.measurementId;
  providers.ga4.enabled = config.enabled !== false;
  
  if (!providers.ga4.enabled) {
    console.log('GA4 is disabled in configuration');
    return;
  }
  
  try {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId, {
      send_page_view: false, // We'll handle page views manually for more control
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
    
    // Set up data layer listener for GA4
    setupGA4DataLayerListener();
    
    providers.ga4.initialized = true;
    console.log('GA4 initialized successfully');
  } catch (error) {
    console.error('Error initializing GA4:', error);
  }
}

/**
 * Set up a listener to forward data layer events to GA4
 */
function setupGA4DataLayerListener() {
  const originalPush = window.dataLayer.push;
  
  window.dataLayer.push = function(...args) {
    const result = originalPush.apply(this, args);
    
    // Process the event for GA4
    const event = args[0];
    if (event && event.event && providers.ga4.initialized && providers.ga4.enabled) {
      processEventForGA4(event);
    }
    
    return result;
  };
}

/**
 * Process a data layer event for GA4
 * 
 * @param {Object} eventData - Event data from the data layer
 */
function processEventForGA4(eventData) {
  if (!isTrackingAllowed()) return;
  
  const { event, properties, userId } = eventData;
  
  // Set user ID if available
  if (userId && userId !== 'anonymous') {
    window.gtag('set', 'user_id', userId);
  }
  
  // Send event to GA4
  window.gtag('event', event, {
    ...properties,
    event_category: getEventCategory(event),
    event_label: getEventLabel(event, properties)
  });
}

/**
 * Initialize custom analytics pipeline
 * 
 * @param {Object} config - Custom analytics configuration
 * @param {string} config.apiEndpoint - API endpoint for custom analytics
 * @param {string} config.apiKey - API key for custom analytics
 * @param {boolean} config.enabled - Whether custom analytics is enabled
 */
export function initializeCustomAnalytics(config) {
  if (!config || !config.apiEndpoint) {
    console.error('Custom analytics API endpoint is required');
    return;
  }
  
  providers.customAnalytics.apiEndpoint = config.apiEndpoint;
  providers.customAnalytics.apiKey = config.apiKey;
  providers.customAnalytics.enabled = config.enabled !== false;
  
  if (!providers.customAnalytics.enabled) {
    console.log('Custom analytics is disabled in configuration');
    return;
  }
  
  try {
    // Set up data layer listener for custom analytics
    setupCustomAnalyticsDataLayerListener();
    
    providers.customAnalytics.initialized = true;
    console.log('Custom analytics initialized successfully');
  } catch (error) {
    console.error('Error initializing custom analytics:', error);
  }
}

/**
 * Set up a listener to forward data layer events to custom analytics
 */
function setupCustomAnalyticsDataLayerListener() {
  const originalPush = window.dataLayer.push;
  
  window.dataLayer.push = function(...args) {
    const result = originalPush.apply(this, args);
    
    // Process the event for custom analytics
    const event = args[0];
    if (event && event.event && providers.customAnalytics.initialized && providers.customAnalytics.enabled) {
      processEventForCustomAnalytics(event);
    }
    
    return result;
  };
}

/**
 * Process a data layer event for custom analytics
 * 
 * @param {Object} eventData - Event data from the data layer
 */
function processEventForCustomAnalytics(eventData) {
  if (!isTrackingAllowed()) return;
  
  // Send event to custom analytics endpoint
  fetch(providers.customAnalytics.apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': providers.customAnalytics.apiKey
    },
    body: JSON.stringify(eventData)
  }).catch(error => {
    console.error('Error sending event to custom analytics:', error);
  });
}

/**
 * Initialize consent management for analytics
 * 
 * @param {Object} options - Consent management options
 */
export function initializeConsentManagement(options = {}) {
  // Default consent state - no tracking until consent is given
  window.consentState = {
    analytics: false,
    marketing: false,
    ...options.initialState
  };
  
  // Update consent state
  window.updateConsentState = function(newState) {
    window.consentState = {
      ...window.consentState,
      ...newState
    };
    
    // Notify data layer of consent change
    pushToDataLayer('consent_update', {
      consentState: window.consentState
    });
    
    // Apply consent state to GA4
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: window.consentState.analytics ? 'granted' : 'denied',
        ad_storage: window.consentState.marketing ? 'granted' : 'denied'
      });
    }
  };
  
  // Initialize with provided state
  if (options.initialState) {
    window.updateConsentState(options.initialState);
  }
}

/**
 * Extract event category from event name
 * 
 * @param {string} eventName - Event name in [Category]_[Action]_[Object] format
 * @returns {string} Event category
 */
function getEventCategory(eventName) {
  const parts = eventName.split('_');
  return parts.length > 0 ? parts[0] : 'uncategorized';
}

/**
 * Generate event label from event name and properties
 * 
 * @param {string} eventName - Event name
 * @param {Object} properties - Event properties
 * @returns {string} Event label
 */
function getEventLabel(eventName, properties) {
  const parts = eventName.split('_');
  const object = parts.length > 2 ? parts[2] : '';
  
  if (object && properties.id) {
    return `${object}:${properties.id}`;
  }
  
  return object || 'none';
}

export default {
  initializeProviders,
  initializeGA4,
  initializeCustomAnalytics,
  initializeConsentManagement
};
