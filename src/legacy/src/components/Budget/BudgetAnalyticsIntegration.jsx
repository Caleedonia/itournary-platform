/**
 * Analytics Integration for Budget Component
 * 
 * This module integrates analytics tracking into the Budget component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction } from '../Analytics/eventTracking';

/**
 * Budget Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.experienceId - ID of the current experience
 * @param {string} props.userId - ID of the current user
 */
const BudgetAnalyticsIntegration = ({ experienceId, userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track budget view on component mount
  useEffect(() => {
    if (initialized && consentGiven && experienceId) {
      trackFeatureUsage('budget', 'view', {
        experienceId,
        userId
      });
    }
  }, [initialized, consentGiven, experienceId, userId]);

  // Return tracking functions to be used by the Budget component
  return {
    /**
     * Track budget item creation
     * 
     * @param {string} itemId - ID of the created item
     * @param {string} category - Category of the item
     * @param {number} amount - Amount of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemCreation: (itemId, category, amount, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('budget_item', 'create', {
          itemId,
          category,
          amount,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track budget item update
     * 
     * @param {string} itemId - ID of the updated item
     * @param {string} category - Category of the item
     * @param {number} amount - Amount of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemUpdate: (itemId, category, amount, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('budget_item', 'update', {
          itemId,
          category,
          amount,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track budget item deletion
     * 
     * @param {string} itemId - ID of the deleted item
     * @param {string} category - Category of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemDeletion: (itemId, category, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('budget_item', 'delete', {
          itemId,
          category,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track budget category completion
     * 
     * @param {string} categoryId - ID of the completed category
     * @param {number} totalAmount - Total amount in the category
     * @param {Object} properties - Additional properties to track
     */
    trackCategoryCompletion: (categoryId, totalAmount, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('budget_category', 'complete', {
          categoryId,
          totalAmount,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track budget interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('budget', elementId, interactionType, {
          experienceId,
          userId,
          ...properties
        });
      }
    }
  };
};

export default BudgetAnalyticsIntegration;
