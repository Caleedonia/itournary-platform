/**
 * Analytics Testing Utilities
 * 
 * This module provides testing utilities for the analytics system.
 */

import { trackPageView, trackFeatureUsage } from './eventTracking';
import { trackInteraction as trackUserAction } from './eventTracking';

/**
 * Generate test data for analytics dashboards
 * 
 * @param {string} dashboardType - The type of dashboard to generate data for
 * @param {number} dataPoints - The number of data points to generate
 * @param {Object} options - Additional options for data generation
 * @returns {Object} Generated test data
 */
export function generateTestData(dashboardType, dataPoints = 30, options = {}) {
  // Implement test data generation based on dashboard type
  const data = {
    labels: [],
    datasets: []
  };
  
  // Generate time series data for most dashboard types
  if (['executive', 'community', 'emotional', 'trust', 'retention', 'mobile'].includes(dashboardType)) {
    // Generate dates for the last n days
    const today = new Date();
    for (let i = dataPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    switch(dashboardType) {
      case 'executive':
        data.datasets.push({
          label: 'Active Users',
          data: generateRandomData(dataPoints, 1000, 5000),
          borderColor: '#3182CE',
          backgroundColor: 'rgba(49, 130, 206, 0.1)',
        });
        data.datasets.push({
          label: 'New Users',
          data: generateRandomData(dataPoints, 100, 800),
          borderColor: '#38A169',
          backgroundColor: 'rgba(56, 161, 105, 0.1)',
        });
        break;
        
      case 'community':
        data.datasets.push({
          label: 'Posts',
          data: generateRandomData(dataPoints, 50, 300),
          borderColor: '#805AD5',
          backgroundColor: 'rgba(128, 90, 213, 0.1)',
        });
        data.datasets.push({
          label: 'Comments',
          data: generateRandomData(dataPoints, 100, 600),
          borderColor: '#D53F8C',
          backgroundColor: 'rgba(213, 63, 140, 0.1)',
        });
        break;
        
      // Add cases for other dashboard types
      default:
        data.datasets.push({
          label: 'Events',
          data: generateRandomData(dataPoints, 100, 500),
          borderColor: '#3182CE',
          backgroundColor: 'rgba(49, 130, 206, 0.1)',
        });
    }
  }
  
  return data;
}

/**
 * Generate random time series data
 * 
 * @param {number} count - Number of data points
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array} Array of random values
 */
function generateRandomData(count, min, max) {
  const data = [];
  let lastValue = Math.floor(Math.random() * (max - min)) + min;
  
  for (let i = 0; i < count; i++) {
    // Create somewhat realistic looking data with trends
    const changePercent = Math.random() * 0.2 - 0.1; // -10% to +10%
    lastValue = Math.max(min, Math.min(max, Math.round(lastValue * (1 + changePercent))));
    data.push(lastValue);
  }
  
  return data;
}

/**
 * Mock analytics events for testing
 * 
 * @param {number} eventCount - Number of events to generate
 * @returns {Array} Array of mock events
 */
export function generateMockEvents(eventCount = 20) {
  const eventTypes = ['page_view', 'feature_usage', 'user_action', 'conversion'];
  const pages = ['home', 'dashboard', 'profile', 'settings', 'search'];
  const features = ['timeline', 'budget', 'community', 'emotional', 'trust'];
  const actions = ['click', 'view', 'edit', 'delete', 'create'];
  
  const events = [];
  
  for (let i = 0; i < eventCount; i++) {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60));
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    let event = {
      id: `event-${i}`,
      timestamp: timestamp.toISOString(),
      type: eventType
    };
    
    switch(eventType) {
      case 'page_view':
        event.pageName = pages[Math.floor(Math.random() * pages.length)];
        event.referrer = Math.random() > 0.7 ? 'direct' : pages[Math.floor(Math.random() * pages.length)];
        break;
        
      case 'feature_usage':
        event.featureId = features[Math.floor(Math.random() * features.length)];
        event.action = actions[Math.floor(Math.random() * actions.length)];
        break;
        
      case 'user_action':
        event.elementType = ['button', 'link', 'form', 'dropdown'][Math.floor(Math.random() * 4)];
        event.elementId = `element-${Math.floor(Math.random() * 100)}`;
        event.action = actions[Math.floor(Math.random() * actions.length)];
        break;
        
      case 'conversion':
        event.conversionType = ['signup', 'premium_upgrade', 'feature_activation'][Math.floor(Math.random() * 3)];
        event.value = Math.floor(Math.random() * 100);
        break;
    }
    
    events.push(event);
  }
  
  return events;
}

/**
 * Test analytics tracking by firing test events
 */
export function runTrackingTest() {
  console.log('Running analytics tracking test...');
  
  // Test page view tracking
  trackPageView('test_page', {
    referrer: 'test_referrer',
    testMode: true
  });
  
  // Test user action tracking
  trackUserAction('button', 'test_button', 'click', {
    testMode: true,
    location: 'header'
  });
  
  // Test feature usage tracking
  trackFeatureUsage('timeline', 'view', {
    testMode: true,
    detailLevel: 'summary'
  });
  
  console.log('Analytics tracking test complete. Check console for events.');
}

/**
 * Simulate user activity by triggering a series of analytics events
 * 
 * @param {Object} analytics - Analytics context object
 * @param {number} eventCount - Number of events to simulate (default: 10)
 * @returns {Object} Results of the simulation including event counts by type
 */
export function simulateUserActivity(analytics, eventCount = 10) {
  console.log(`Simulating ${eventCount} user activities...`);
  
  const eventTypes = [
    'pageView',
    'buttonClick',
    'formSubmit',
    'featureUse',
    'search',
    'filter'
  ];
  
  const pages = [
    'home',
    'dashboard',
    'profile',
    'settings',
    'search',
    'itinerary',
    'destinations',
    'details'
  ];
  
  const features = [
    'timeline',
    'budget',
    'community',
    'emotional',
    'trust',
    'planning',
    'booking'
  ];
  
  const results = {
    totalEvents: eventCount,
    eventsByType: {}
  };
  
  // Simulate random events
  for (let i = 0; i < eventCount; i++) {
    const eventTypeIndex = Math.floor(Math.random() * eventTypes.length);
    const eventType = eventTypes[eventTypeIndex];
    
    // Track event count by type
    results.eventsByType[eventType] = (results.eventsByType[eventType] || 0) + 1;
    
    switch (eventType) {
      case 'pageView':
        const page = pages[Math.floor(Math.random() * pages.length)];
        analytics.trackPageView(page, {
          testMode: true,
          referrer: i > 0 ? pages[Math.floor(Math.random() * pages.length)] : 'direct'
        });
        break;
        
      case 'buttonClick':
        analytics.trackEvent('button_click', {
          buttonId: `btn-${Math.floor(Math.random() * 100)}`,
          buttonText: ['Submit', 'Save', 'Cancel', 'Continue', 'Next'][Math.floor(Math.random() * 5)],
          testMode: true
        });
        break;
        
      case 'formSubmit':
        analytics.trackEvent('form_submit', {
          formId: `form-${Math.floor(Math.random() * 20)}`,
          formType: ['contact', 'booking', 'registration', 'feedback'][Math.floor(Math.random() * 4)],
          success: Math.random() > 0.1, // 90% success rate
          testMode: true
        });
        break;
        
      case 'featureUse':
        const feature = features[Math.floor(Math.random() * features.length)];
        analytics.trackEvent('feature_use', {
          featureId: feature,
          action: ['view', 'edit', 'create', 'delete', 'share'][Math.floor(Math.random() * 5)],
          testMode: true
        });
        break;
        
      case 'search':
        analytics.trackEvent('search', {
          query: ['beach vacation', 'mountain retreat', 'city tour', 'adventure', 'food tour'][Math.floor(Math.random() * 5)],
          resultsCount: Math.floor(Math.random() * 50),
          testMode: true
        });
        break;
        
      case 'filter':
        analytics.trackEvent('filter_change', {
          filterType: ['date', 'price', 'rating', 'amenities', 'distance'][Math.floor(Math.random() * 5)],
          newValue: `value-${Math.floor(Math.random() * 10)}`,
          testMode: true
        });
        break;
    }
    
    // Small delay between events to mimic real usage patterns
    // In a real implementation, you'd use setTimeout, but for sync simulation we'll skip that
  }
  
  console.log('User activity simulation complete', results);
  return results;
}

/**
 * Validate analytics data for correctness and completeness
 * 
 * @param {Object} analyticsData - The analytics data to validate
 * @returns {Object} Validation results with success status and any issues found
 */
export function validateAnalyticsData(analyticsData) {
  console.log('Validating analytics data...', analyticsData);
  
  const results = {
    success: true,
    errors: [],
    warnings: []
  };
  
  // Check if analytics data exists
  if (!analyticsData) {
    results.success = false;
    results.errors.push('Analytics data is missing or undefined');
    return results;
  }
  
  // Check for required properties
  const requiredProperties = ['events', 'userId', 'sessionId'];
  for (const prop of requiredProperties) {
    if (!analyticsData[prop]) {
      results.success = false;
      results.errors.push(`Required property '${prop}' is missing`);
    }
  }
  
  // Check events
  if (analyticsData.events && Array.isArray(analyticsData.events)) {
    if (analyticsData.events.length === 0) {
      results.warnings.push('No events found in analytics data');
    }
    
    // Check individual events
    analyticsData.events.forEach((event, index) => {
      if (!event.type) {
        results.errors.push(`Event at index ${index} is missing 'type' property`);
        results.success = false;
      }
      
      if (!event.timestamp) {
        results.errors.push(`Event at index ${index} is missing 'timestamp' property`);
        results.success = false;
      }
    });
  } else if (analyticsData.events) {
    results.errors.push("'events' property is not an array");
    results.success = false;
  }
  
  // Check data consistency
  if (analyticsData.startTime && analyticsData.endTime) {
    if (new Date(analyticsData.startTime) > new Date(analyticsData.endTime)) {
      results.errors.push("'startTime' is later than 'endTime'");
      results.success = false;
    }
  }
  
  // Return validation results
  return results;
}

export default {
  generateTestData,
  generateMockEvents,
  runTrackingTest,
  simulateUserActivity,
  validateAnalyticsData
};
