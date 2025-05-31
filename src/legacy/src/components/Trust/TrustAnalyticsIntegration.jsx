/**
 * Analytics Integration for Trust Component
 * 
 * This module integrates analytics tracking into the Trust component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction, trackTrustAction } from '../Analytics/eventTracking';

/**
 * Trust Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - ID of the current user
 */
const TrustAnalyticsIntegration = ({ userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track trust component view on component mount
  useEffect(() => {
    if (initialized && consentGiven && userId) {
      trackFeatureUsage('trust', 'view', {
        userId
      });
    }
  }, [initialized, consentGiven, userId]);

  // Return tracking functions to be used by the Trust component
  return {
    /**
     * Track review submission
     * 
     * @param {string} reviewId - ID of the submitted review
     * @param {number} rating - Rating value
     * @param {string} experienceId - ID of the reviewed experience
     * @param {Object} properties - Additional properties to track
     */
    trackReviewSubmission: (reviewId, rating, experienceId, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('review', 'submit', {
          reviewId,
          rating,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track review verification
     * 
     * @param {string} reviewId - ID of the verified review
     * @param {string} verificationMethod - Method of verification
     * @param {Object} properties - Additional properties to track
     */
    trackReviewVerification: (reviewId, verificationMethod, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('review', 'verify', {
          reviewId,
          verificationMethod,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track badge interaction
     * 
     * @param {string} badgeType - Type of badge
     * @param {string} interactionType - Type of interaction
     * @param {Object} properties - Additional properties to track
     */
    trackBadgeInteraction: (badgeType, interactionType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('trust_badge', interactionType, {
          badgeType,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track safety feature usage
     * 
     * @param {string} featureType - Type of safety feature
     * @param {string} actionType - Type of action
     * @param {Object} properties - Additional properties to track
     */
    trackSafetyFeatureUsage: (featureType, actionType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('safety_feature', actionType, {
          featureType,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track trust action
     * 
     * @param {string} actionType - Type of trust action
     * @param {string} targetType - Type of target
     * @param {string} targetId - ID of the target
     * @param {Object} properties - Additional properties to track
     */
    trackTrustAction: (actionType, targetType, targetId, properties = {}) => {
      if (initialized && consentGiven) {
        trackTrustAction(actionType, targetType, targetId, {
          userId,
          ...properties
        });
      }
    },

    /**
     * Track trust component interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('trust', elementId, interactionType, {
          userId,
          ...properties
        });
      }
    }
  };
};

export default TrustAnalyticsIntegration;
