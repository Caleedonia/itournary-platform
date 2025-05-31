/**
 * Analytics Integration for Timeline Component
 * 
 * This module integrates analytics tracking into the Timeline component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction } from '../Analytics/eventTracking';

/**
 * Timeline Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.experienceId - ID of the current experience
 * @param {string} props.userId - ID of the current user
 */
const TimelineAnalyticsIntegration = ({ experienceId, userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track timeline view on component mount
  useEffect(() => {
    if (initialized && consentGiven && experienceId) {
      trackFeatureUsage('timeline', 'view', {
        experienceId,
        userId
      });
    }
  }, [initialized, consentGiven, experienceId, userId]);

  // Return tracking functions to be used by the Timeline component
  return {
    /**
     * Track timeline item creation
     * 
     * @param {string} itemId - ID of the created item
     * @param {string} itemType - Type of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemCreation: (itemId, itemType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('timeline_item', 'create', {
          itemId,
          itemType,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track timeline item update
     * 
     * @param {string} itemId - ID of the updated item
     * @param {string} itemType - Type of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemUpdate: (itemId, itemType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('timeline_item', 'update', {
          itemId,
          itemType,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track timeline item deletion
     * 
     * @param {string} itemId - ID of the deleted item
     * @param {string} itemType - Type of the item
     * @param {Object} properties - Additional properties to track
     */
    trackItemDeletion: (itemId, itemType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('timeline_item', 'delete', {
          itemId,
          itemType,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track timeline phase completion
     * 
     * @param {string} phaseId - ID of the completed phase
     * @param {Object} properties - Additional properties to track
     */
    trackPhaseCompletion: (phaseId, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('timeline_phase', 'complete', {
          phaseId,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track timeline interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('timeline', elementId, interactionType, {
          experienceId,
          userId,
          ...properties
        });
      }
    }
  };
};

export default TimelineAnalyticsIntegration;
