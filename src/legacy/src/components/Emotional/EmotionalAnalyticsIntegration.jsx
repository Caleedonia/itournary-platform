/**
 * Analytics Integration for Emotional Experience Component
 * 
 * This module integrates analytics tracking into the Emotional Experience component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction, trackEmotionalEvent } from '../Analytics/eventTracking';

/**
 * Emotional Experience Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.experienceId - ID of the current experience
 * @param {string} props.userId - ID of the current user
 */
const EmotionalAnalyticsIntegration = ({ experienceId, userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track emotional experience view on component mount
  useEffect(() => {
    if (initialized && consentGiven && experienceId) {
      trackFeatureUsage('emotional', 'view', {
        experienceId,
        userId
      });
    }
  }, [initialized, consentGiven, experienceId, userId]);

  // Return tracking functions to be used by the Emotional Experience component
  return {
    /**
     * Track milestone creation
     * 
     * @param {string} milestoneId - ID of the created milestone
     * @param {string} emotionType - Type of emotion
     * @param {Object} properties - Additional properties to track
     */
    trackMilestoneCreation: (milestoneId, emotionType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('emotional_milestone', 'create', {
          milestoneId,
          emotionType,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track memory capture
     * 
     * @param {string} memoryId - ID of the captured memory
     * @param {string} mediaType - Type of media (photo, text, video, audio)
     * @param {Object} properties - Additional properties to track
     */
    trackMemoryCapture: (memoryId, mediaType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('memory_capture', 'create', {
          memoryId,
          mediaType,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track preference assessment completion
     * 
     * @param {string} preferenceType - Type of preference
     * @param {number} completionPercentage - Percentage of completion
     * @param {Object} properties - Additional properties to track
     */
    trackPreferenceAssessment: (preferenceType, completionPercentage, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('preference_assessment', 'complete', {
          preferenceType,
          completionPercentage,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track memory book creation
     * 
     * @param {string} bookId - ID of the created memory book
     * @param {number} memoryCount - Number of memories in the book
     * @param {Object} properties - Additional properties to track
     */
    trackMemoryBookCreation: (bookId, memoryCount, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('memory_book', 'create', {
          bookId,
          memoryCount,
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track emotional event
     * 
     * @param {string} eventType - Type of emotional event
     * @param {string} emotionType - Type of emotion
     * @param {number} intensity - Intensity of the emotion (1-10)
     * @param {Object} properties - Additional properties to track
     */
    trackEmotionalEvent: (eventType, emotionType, intensity, properties = {}) => {
      if (initialized && consentGiven) {
        trackEmotionalEvent(eventType, emotionType, intensity, {
          experienceId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track emotional experience interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('emotional', elementId, interactionType, {
          experienceId,
          userId,
          ...properties
        });
      }
    }
  };
};

export default EmotionalAnalyticsIntegration;
