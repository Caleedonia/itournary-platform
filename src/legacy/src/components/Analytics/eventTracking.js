/**
 * Analytics Event Tracking
 * 
 * This module provides specialized tracking functions for different feature areas
 * of the iTournary platform, following the standardized event naming convention.
 */

import { pushToDataLayer, isTrackingAllowed } from './dataLayer';

// ===== Core Tracking Functions =====

/**
 * Track page view
 * 
 * @param {string} pageName - Name of the viewed page
 * @param {Object} pageData - Additional data about the page
 */
export function trackPageView(pageName, pageData = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('page_view', {
    pageName,
    pageType: pageData.pageType || getPageType(),
    referrer: pageData.referrer || getReferrer(),
    ...pageData
  });
}

// Helper function for trackPageView
function getPageType() {
  // Placeholder implementation
  if (typeof window === 'undefined') return 'unknown';
  return window.location.pathname.split('/')[1] || 'home';
}

// Helper function for trackPageView
function getReferrer() {
  // Placeholder implementation
  if (typeof document === 'undefined') return 'unknown';
  return document.referrer || 'direct';
}

/**
 * Track feature usage
 * 
 * @param {string} featureId - Identifier for the feature
 * @param {string} action - Action performed (view, click, etc.)
 * @param {Object} properties - Additional properties to track
 */
export function trackFeatureUsage(featureId, action, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('feature_' + action, {
    featureId,
    ...properties
  });
}

/**
 * Track user interaction
 * 
 * @param {string} elementType - Type of element interacted with
 * @param {string} elementId - Identifier for the element
 * @param {string} action - Action performed
 * @param {Object} properties - Additional properties to track
 */
export function trackInteraction(elementType, elementId, action, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('interaction_' + action, {
    elementType,
    elementId,
    ...properties
  });
}

/**
 * Track conversion event
 * 
 * @param {string} conversionType - Type of conversion
 * @param {string} source - Source of the conversion
 * @param {Object} properties - Additional properties to track
 */
export function trackConversion(conversionType, source, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('conversion_complete', {
    conversionType,
    source,
    ...properties
  });
}

// ===== Community Feature Tracking =====

/**
 * Track profile view
 * 
 * @param {string} profileId - ID of the profile being viewed
 * @param {string} viewerType - Type of viewer (self, other, anonymous)
 * @param {Object} properties - Additional properties to track
 */
export function trackProfileView(profileId, viewerType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('community_view_profile', {
    profileId,
    viewerType,
    completionPercentage: properties.completionPercentage || calculateProfileCompletion(profileId),
    ...properties
  });
}

/**
 * Track profile edit
 * 
 * @param {string} fieldName - Name of the field being edited
 * @param {boolean} isComplete - Whether the field is now complete
 * @param {Object} properties - Additional properties to track
 */
export function trackProfileEdit(fieldName, isComplete, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('community_edit_profile', {
    fieldName,
    isComplete,
    totalFieldsComplete: properties.totalFieldsComplete || countCompletedFields(),
    ...properties
  });
}

/**
 * Track story creation
 * 
 * @param {string} storyId - ID of the created story
 * @param {string} occasionType - Type of occasion the story is about
 * @param {Object} properties - Additional properties to track
 */
export function trackStoryCreation(storyId, occasionType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('community_create_story', {
    storyId,
    occasionType,
    mediaCount: properties.mediaCount || countMediaItems(),
    wordCount: properties.wordCount || countWords(),
    ...properties
  });
}

/**
 * Track story engagement
 * 
 * @param {string} storyId - ID of the story
 * @param {string} engagementType - Type of engagement (view, like, comment, share)
 * @param {Object} properties - Additional properties to track
 */
export function trackStoryEngagement(storyId, engagementType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('community_engage_story', {
    storyId,
    engagementType,
    timeSpent: properties.timeSpent || calculateTimeSpent(),
    ...properties
  });
}

/**
 * Track forum activity
 * 
 * @param {string} forumId - ID of the forum
 * @param {string} activityType - Type of activity (view, post, reply, react)
 * @param {Object} properties - Additional properties to track
 */
export function trackForumActivity(forumId, activityType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('community_forum_activity', {
    forumId,
    activityType,
    occasionType: properties.occasionType || getOccasionType(forumId),
    isFirstActivity: properties.isFirstActivity || isFirstTimeInForum(),
    ...properties
  });
}

// ===== Emotional Experience Tracking =====

/**
 * Track milestone creation
 * 
 * @param {string} milestoneId - ID of the milestone
 * @param {string} emotionType - Type of emotion
 * @param {Object} properties - Additional properties to track
 */
export function trackMilestoneCreation(milestoneId, emotionType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('emotional_create_milestone', {
    milestoneId,
    emotionType,
    occasionType: properties.occasionType || getCurrentOccasionType(),
    timelinePosition: properties.timelinePosition || getTimelinePosition(),
    ...properties
  });
}

/**
 * Track milestone interaction
 * 
 * @param {string} milestoneId - ID of the milestone
 * @param {string} interactionType - Type of interaction (view, edit, share, delete)
 * @param {Object} properties - Additional properties to track
 */
export function trackMilestoneInteraction(milestoneId, interactionType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('emotional_interact_milestone', {
    milestoneId,
    interactionType,
    timeSpent: properties.timeSpent || calculateTimeSpent(),
    ...properties
  });
}

/**
 * Track memory documentation
 * 
 * @param {string} memoryId - ID of the memory
 * @param {string} mediaType - Type of media (text, photo, video, audio)
 * @param {Object} properties - Additional properties to track
 */
export function trackMemoryDocumentation(memoryId, mediaType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('emotional_document_memory', {
    memoryId,
    mediaType,
    occasionType: properties.occasionType || getCurrentOccasionType(),
    isCollaborative: properties.isCollaborative || isCollaborativeMemory(),
    ...properties
  });
}

/**
 * Track preference selection
 * 
 * @param {string} preferenceType - Type of preference
 * @param {string} selectedValue - Selected value
 * @param {Object} properties - Additional properties to track
 */
export function trackPreferenceSelection(preferenceType, selectedValue, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('emotional_select_preference', {
    preferenceType,
    selectedValue,
    occasionType: properties.occasionType || getCurrentOccasionType(),
    isFirstTimeSelection: properties.isFirstTimeSelection || isFirstTimeSelection(),
    ...properties
  });
}

// ===== Trust Ecosystem Tracking =====

/**
 * Track review submission
 * 
 * @param {string} reviewId - ID of the review
 * @param {number} rating - Rating value
 * @param {Object} properties - Additional properties to track
 */
export function trackReviewSubmission(reviewId, rating, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('trust_submit_review', {
    reviewId,
    rating,
    wordCount: properties.wordCount || countWords(),
    hasMedia: properties.hasMedia || hasMediaAttached(),
    verificationMethod: properties.verificationMethod || getVerificationMethod(),
    ...properties
  });
}

/**
 * Track review engagement
 * 
 * @param {string} reviewId - ID of the review
 * @param {string} engagementType - Type of engagement (view, helpful, report, respond)
 * @param {Object} properties - Additional properties to track
 */
export function trackReviewEngagement(reviewId, engagementType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('trust_engage_review', {
    reviewId,
    engagementType,
    isVerifiedReview: properties.isVerifiedReview || isVerified(reviewId),
    ...properties
  });
}

/**
 * Track trust badge interaction
 * 
 * @param {string} badgeType - Type of badge
 * @param {string} interactionType - Type of interaction (view, click)
 * @param {Object} properties - Additional properties to track
 */
export function trackTrustBadgeInteraction(badgeType, interactionType = 'view', properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('trust_interact_badge', {
    badgeType,
    interactionType,
    pageContext: properties.pageContext || getCurrentPageContext(),
    ...properties
  });
}

// ===== Retention Feature Tracking =====

/**
 * Track membership view
 * 
 * @param {string} tierLevel - Level of membership tier
 * @param {Object} properties - Additional properties to track
 */
export function trackMembershipView(tierLevel, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_view_membership', {
    tierLevel,
    entryPoint: properties.entryPoint || getEntryPoint(),
    timeSpent: properties.timeSpent || calculateTimeSpent(),
    ...properties
  });
}

/**
 * Track membership conversion
 * 
 * @param {string} tierLevel - New tier level
 * @param {string} previousTier - Previous tier level
 * @param {Object} properties - Additional properties to track
 */
export function trackMembershipConversion(tierLevel, previousTier, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_convert_membership', {
    tierLevel,
    previousTier,
    conversionPath: properties.conversionPath || getConversionPath(),
    daysFromRegistration: properties.daysFromRegistration || getDaysFromRegistration(),
    ...properties
  });
}

/**
 * Track referral generation
 * 
 * @param {Object} properties - Additional properties to track
 */
export function trackReferralGeneration(properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_generate_referral', {
    userTier: properties.userTier || getCurrentUserTier(),
    userLifetimeValue: properties.userLifetimeValue || calculateUserLTV(),
    previousReferrals: properties.previousReferrals || getPreviousReferralCount(),
    ...properties
  });
}

/**
 * Track referral send
 * 
 * @param {string} method - Method of sending (email, sms, social, copy)
 * @param {Object} properties - Additional properties to track
 */
export function trackReferralSend(method, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_send_referral', {
    method,
    userTier: properties.userTier || getCurrentUserTier(),
    ...properties
  });
}

/**
 * Track referral conversion
 * 
 * @param {string} referralCode - Referral code used
 * @param {Object} properties - Additional properties to track
 */
export function trackReferralConversion(referralCode, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_convert_referral', {
    referralCode,
    referrerTier: properties.referrerTier || getReferrerTier(referralCode),
    daysFromReferral: properties.daysFromReferral || getDaysFromReferral(referralCode),
    ...properties
  });
}

/**
 * Track points earned
 * 
 * @param {number} amount - Amount of points earned
 * @param {string} source - Source of points (activity, referral, purchase, bonus)
 * @param {Object} properties - Additional properties to track
 */
export function trackPointsEarned(amount, source, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_earn_points', {
    amount,
    source,
    totalPoints: properties.totalPoints || getTotalPoints(),
    userTier: properties.userTier || getCurrentUserTier(),
    ...properties
  });
}

/**
 * Track points redeemed
 * 
 * @param {number} amount - Amount of points redeemed
 * @param {string} rewardId - ID of the reward
 * @param {Object} properties - Additional properties to track
 */
export function trackPointsRedeemed(amount, rewardId, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('retention_redeem_points', {
    amount,
    rewardId,
    rewardCategory: properties.rewardCategory || getRewardCategory(rewardId),
    remainingPoints: properties.remainingPoints || getRemainingPoints(),
    ...properties
  });
}

// ===== Mobile Experience Tracking =====

/**
 * Track mobile navigation
 * 
 * @param {string} navType - Type of navigation (bottom_bar, drawer, swipe)
 * @param {string} destination - Destination screen
 * @param {Object} properties - Additional properties to track
 */
export function trackMobileNavigation(navType, destination, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('mobile_navigate', {
    navigationType: navType,
    destination,
    previousScreen: properties.previousScreen || getPreviousScreen(),
    deviceType: properties.deviceType || getDeviceType(),
    ...properties
  });
}

/**
 * Track quick capture
 * 
 * @param {string} captureType - Type of capture (note, task, memory, idea)
 * @param {boolean} hasLocation - Whether location is attached
 * @param {Object} properties - Additional properties to track
 */
export function trackQuickCapture(captureType, hasLocation, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('mobile_quick_capture', {
    captureType,
    hasLocation,
    hasMedia: properties.hasMedia || hasMediaAttached(),
    deviceType: properties.deviceType || getDeviceType(),
    ...properties
  });
}

/**
 * Track location services
 * 
 * @param {string} actionType - Type of action (get_current, search, select_recommendation)
 * @param {Object} properties - Additional properties to track
 */
export function trackLocationServices(actionType, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('mobile_location_service', {
    actionType,
    permissionStatus: properties.permissionStatus || getLocationPermissionStatus(),
    deviceType: properties.deviceType || getDeviceType(),
    ...properties
  });
}

/**
 * Track PWA installation
 * 
 * @param {string} installType - Type of installation (prompt, manual)
 * @param {string} deviceOS - Device operating system
 * @param {Object} properties - Additional properties to track
 */
export function trackPWAInstallation(installType, deviceOS, properties = {}) {
  if (!isTrackingAllowed()) return;
  
  pushToDataLayer('mobile_pwa_install', {
    installType,
    deviceOS,
    promptSource: properties.promptSource || getPromptSource(),
    ...properties
  });
}

// ===== Helper Functions =====
// These would be replaced with actual implementations in a real application

function calculateProfileCompletion(profileId) {
  // Placeholder implementation
  return 75;
}

function countCompletedFields() {
  // Placeholder implementation
  return 8;
}

function countMediaItems() {
  // Placeholder implementation
  return 3;
}

function countWords() {
  // Placeholder implementation
  return 250;
}

function calculateTimeSpent() {
  // Placeholder implementation
  return 120; // seconds
}

function getOccasionType(forumId) {
  // Placeholder implementation
  return 'travel';
}

function isFirstTimeInForum() {
  // Placeholder implementation
  return false;
}

function getCurrentOccasionType() {
  // Placeholder implementation
  return 'vacation';
}

function getTimelinePosition() {
  // Placeholder implementation
  return 'middle';
}

function isCollaborativeMemory() {
  // Placeholder implementation
  return true;
}

function isFirstTimeSelection() {
  // Placeholder implementation
  return false;
}

function hasMediaAttached() {
  // Placeholder implementation
  return true;
}

function getVerificationMethod() {
  // Placeholder implementation
  return 'receipt';
}

function isVerified(reviewId) {
  // Placeholder implementation
  return true;
}

function getCurrentPageContext() {
  // Placeholder implementation
  return 'product_detail';
}

function getEntryPoint() {
  // Placeholder implementation
  return 'profile_menu';
}

function getConversionPath() {
  // Placeholder implementation
  return 'direct';
}

function getDaysFromRegistration() {
  // Placeholder implementation
  return 30;
}

function getCurrentUserTier() {
  // Placeholder implementation
  return 'gold';
}

function calculateUserLTV() {
  // Placeholder implementation
  return 250;
}

function getPreviousReferralCount() {
  // Placeholder implementation
  return 3;
}

function getReferrerTier(referralCode) {
  // Placeholder implementation
  return 'platinum';
}

function getDaysFromReferral(referralCode) {
  // Placeholder implementation
  return 5;
}

function getTotalPoints() {
  // Placeholder implementation
  return 1500;
}

function getRewardCategory(rewardId) {
  // Placeholder implementation
  return 'experience';
}

function getRemainingPoints() {
  // Placeholder implementation
  return 500;
}

function getPreviousScreen() {
  // Placeholder implementation
  return 'home';
}

function getDeviceType() {
  // Placeholder implementation
  return 'smartphone';
}

function getLocationPermissionStatus() {
  // Placeholder implementation
  return 'granted';
}

function getPromptSource() {
  // Placeholder implementation
  return 'banner';
}

export default {
  // Core tracking
  trackPageView,
  trackFeatureUsage,
  trackInteraction,
  trackConversion,
  
  // Community tracking
  trackProfileView,
  trackProfileEdit,
  trackStoryCreation,
  trackStoryEngagement,
  trackForumActivity,
  
  // Emotional experience tracking
  trackMilestoneCreation,
  trackMilestoneInteraction,
  trackMemoryDocumentation,
  trackPreferenceSelection,
  
  // Trust ecosystem tracking
  trackReviewSubmission,
  trackReviewEngagement,
  trackTrustBadgeInteraction,
  
  // Retention tracking
  trackMembershipView,
  trackMembershipConversion,
  trackReferralGeneration,
  trackReferralSend,
  trackReferralConversion,
  trackPointsEarned,
  trackPointsRedeemed,
  
  // Mobile tracking
  trackMobileNavigation,
  trackQuickCapture,
  trackLocationServices,
  trackPWAInstallation
};
