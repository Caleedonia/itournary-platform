/**
 * Analytics Integration for Community Component
 * 
 * This module integrates analytics tracking into the Community component
 */

import React, { useEffect } from 'react';
import { useAnalytics } from '../Analytics/AnalyticsProvider';
import { trackFeatureUsage, trackInteraction, trackSocialAction } from '../Analytics/eventTracking';

/**
 * Community Analytics Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - ID of the current user
 */
const CommunityAnalyticsIntegration = ({ userId }) => {
  const { initialized, consentGiven } = useAnalytics();

  // Track community view on component mount
  useEffect(() => {
    if (initialized && consentGiven && userId) {
      trackFeatureUsage('community', 'view', {
        userId
      });
    }
  }, [initialized, consentGiven, userId]);

  // Return tracking functions to be used by the Community component
  return {
    /**
     * Track story creation
     * 
     * @param {string} storyId - ID of the created story
     * @param {string} storyType - Type of the story
     * @param {Object} properties - Additional properties to track
     */
    trackStoryCreation: (storyId, storyType, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('community_story', 'create', {
          storyId,
          storyType,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track forum post creation
     * 
     * @param {string} postId - ID of the created post
     * @param {string} forumId - ID of the forum
     * @param {Object} properties - Additional properties to track
     */
    trackForumPostCreation: (postId, forumId, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('forum_post', 'create', {
          postId,
          forumId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track forum comment creation
     * 
     * @param {string} commentId - ID of the created comment
     * @param {string} postId - ID of the post
     * @param {Object} properties - Additional properties to track
     */
    trackForumCommentCreation: (commentId, postId, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('forum_comment', 'create', {
          commentId,
          postId,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track profile update
     * 
     * @param {string} fieldName - Name of the updated field
     * @param {Object} properties - Additional properties to track
     */
    trackProfileUpdate: (fieldName, properties = {}) => {
      if (initialized && consentGiven) {
        trackFeatureUsage('user_profile', 'update', {
          fieldName,
          userId,
          ...properties
        });
      }
    },

    /**
     * Track social action
     * 
     * @param {string} actionType - Type of social action (like, share, follow)
     * @param {string} contentType - Type of content (story, post, comment)
     * @param {string} contentId - ID of the content
     * @param {Object} properties - Additional properties to track
     */
    trackSocialAction: (actionType, contentType, contentId, properties = {}) => {
      if (initialized && consentGiven) {
        trackSocialAction(actionType, contentType, contentId, {
          userId,
          ...properties
        });
      }
    },

    /**
     * Track community interaction
     * 
     * @param {string} interactionType - Type of interaction
     * @param {string} elementId - ID of the element interacted with
     * @param {Object} properties - Additional properties to track
     */
    trackInteraction: (interactionType, elementId, properties = {}) => {
      if (initialized && consentGiven) {
        trackInteraction('community', elementId, interactionType, {
          userId,
          ...properties
        });
      }
    }
  };
};

export default CommunityAnalyticsIntegration;
