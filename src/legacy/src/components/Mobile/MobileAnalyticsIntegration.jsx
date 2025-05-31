/**
 * Analytics Integration for Mobile Component
 * 
 * This module integrates analytics tracking into the Mobile component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction, trackMobileAction } from '../Analytics/eventTracking';

/**
 * Mobile Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - ID of the current user
 */
const MobileAnalyticsIntegration = ({ userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track mobile component view on component mount
  useEffect(() => {
    if (initialized && consentGiven && userId) {
      trackFeatureUsage('mobile', 'view', {
        userId,
        deviceType: getDeviceType(),
        isOnline: navigator.onLine
      });
    }
  }, [initialized, consentGiven, userId]);

  // Helper function to determine device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    return 'Desktop';
  };

  // Return tracking functions to be used by the Mobile component
  return {
    /**
     * Track quick capture
     * 
     * @param {string} captureId - ID of the capture
     * @param {string} captureType - Type of capture (photo, note, voice, location)
     * @param {Object} properties - Additional properties to track
     */
    trackQuickCapture: (captureId, captureType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('quick_capture', 'create', {
          captureId,
          captureType,
          userId,
          deviceType: getDeviceType(),
          isOnline: navigator.onLine,
          ...properties
        });
      }
    },

    /**
     * Track location service usage
     * 
     * @param {string} actionType - Type of location action
     * @param {Object} locationData - Location data
     * @param {Object} properties - Additional properties to track
     */
    trackLocationService: (actionType, locationData, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('location_service', actionType, {
          userId,
          deviceType: getDeviceType(),
          isOnline: navigator.onLine,
          ...properties
        });
      }
    },

    /**
     * Track PWA installation
     * 
     * @param {string} stage - Installation stage
     * @param {Object} properties - Additional properties to track
     */
    trackPWAInstallation: (stage, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('pwa_installation', stage, {
          userId,
          deviceType: getDeviceType(),
          isOnline: navigator.onLine,
          ...properties
        });
      }
    },

    /**
     * Track offline usage
     * 
     * @param {string} actionType - Type of offline action
     * @param {Object} properties - Additional properties to track
     */
    trackOfflineUsage: (actionType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('offline_usage', actionType, {
          userId,
          deviceType: getDeviceType(),
          ...properties
        });
      }
    },

    /**
     * Track mobile action
     * 
     * @param {string} actionType - Type of mobile action
     * @param {string} targetType - Type of target
     * @param {string} targetId - ID of the target
     * @param {Object} properties - Additional properties to track
     */
    trackMobileAction: (actionType, targetType, targetId, properties = {}) => {
      if (initialized && consentGiven) {
        trackMobileAction(actionType, targetType, targetId, {
          userId,
          deviceType: getDeviceType(),
          isOnline: navigator.onLine,
          ...properties
        });
      }
    },

    /**
     * Track mobile component interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('mobile', elementId, interactionType, {
          userId,
          deviceType: getDeviceType(),
          isOnline: navigator.onLine,
          ...properties
        });
      }
    }
  };
};

export default MobileAnalyticsIntegration;
