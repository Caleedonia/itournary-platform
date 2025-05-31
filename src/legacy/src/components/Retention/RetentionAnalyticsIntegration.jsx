/**
 * Analytics Integration for Retention Component
 * 
 * This module integrates analytics tracking into the Retention component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction, trackLoyaltyAction } from '../Analytics/eventTracking';

/**
 * Retention Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - ID of the current user
 */
const RetentionAnalyticsIntegration = ({ userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track retention component view on component mount
  useEffect(() => {
    if (initialized && consentGiven && userId) {
      trackFeatureUsage('retention', 'view', {
        userId
      });
    }
  }, [initialized, consentGiven, userId]);

  // Return tracking functions to be used by the Retention component
  return {
    /**
     * Track membership tier change
     * 
     * @param {string} oldTier - Previous tier
     * @param {string} newTier - New tier
     * @param {Object} properties - Additional properties to track
     */
    trackMembershipTierChange: (oldTier, newTier, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('membership_tier', 'change', {
          oldTier,
          newTier,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track benefit view
     * 
     * @param {string} benefitId - ID of the viewed benefit
     * @param {string} benefitType - Type of benefit
     * @param {Object} properties - Additional properties to track
     */
    trackBenefitView: (benefitId, benefitType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('member_benefit', 'view', {
          benefitId,
          benefitType,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track referral creation
     * 
     * @param {string} referralId - ID of the created referral
     * @param {string} referralChannel - Channel of the referral
     * @param {Object} properties - Additional properties to track
     */
    trackReferralCreation: (referralId, referralChannel, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('referral', 'create', {
          referralId,
          referralChannel,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track loyalty points transaction
     * 
     * @param {string} transactionId - ID of the transaction
     * @param {string} transactionType - Type of transaction (earn, redeem)
     * @param {number} points - Number of points
     * @param {Object} properties - Additional properties to track
     */
    trackLoyaltyPointsTransaction: (transactionId, transactionType, points, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('loyalty_points', transactionType, {
          transactionId,
          points,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track loyalty action
     * 
     * @param {string} actionType - Type of loyalty action
     * @param {string} targetType - Type of target
     * @param {string} targetId - ID of the target
     * @param {Object} properties - Additional properties to track
     */
    trackLoyaltyAction: (actionType, targetType, targetId, properties = {}) => {
      if (initialized && consentGiven) {
        trackLoyaltyAction(actionType, targetType, targetId, {
          userId,
          ...properties
        });
      }
    },

    /**
     * Track retention component interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('retention', elementId, interactionType, {
          userId,
          ...properties
        });
      }
    }
  };
};

export default RetentionAnalyticsIntegration;
