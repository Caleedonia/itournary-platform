import React from 'react';
import { ActionType } from '@/app/api/loyalty/schema';
import { useLoyaltyIntegration } from '../Loyalty/useLoyaltyIntegration';

// This component integrates loyalty points with Emotional Experience features
const EmotionalLoyaltyIntegration: React.FC<{
  userId: string;
  experienceId: string;
  experienceName: string;
}> = ({ userId, experienceId, experienceName }) => {
  const { awardPoints } = useLoyaltyIntegration(userId);

  // Function to award points for tracking emotional milestones
  const awardEmotionalMilestonePoints = async (milestoneName: string, emotionType: string, intensity: number) => {
    return await awardPoints(ActionType.DOCUMENT_MEMORY, {
      experienceId,
      experienceName,
      milestoneName,
      emotionType,
      intensity,
      emotionalMilestone: true
    });
  };

  // Function to award points for capturing memories
  const awardMemoryCapturePoints = async (memoryTitle: string, hasMedia: boolean, emotionTags: string[]) => {
    // Determine content quality based on media and emotion tags
    const contentQuality = hasMedia && emotionTags.length >= 3 ? 'high' : 
                          (hasMedia || emotionTags.length >= 2 ? 'medium' : 'basic');
    
    return await awardPoints(ActionType.DOCUMENT_MEMORY, {
      experienceId,
      experienceName,
      memoryTitle,
      hasMedia,
      emotionTags,
      contentQuality
    });
  };

  // Function to award points for completing preference assessment
  const awardPreferenceAssessmentPoints = async (completionPercentage: number) => {
    // Only award points if assessment is at least 80% complete
    if (completionPercentage >= 80) {
      return await awardPoints(ActionType.COMPLETE_PROFILE, {
        experienceId,
        experienceName,
        completionPercentage,
        preferenceAssessment: true
      });
    }
    return null;
  };

  // Function to award points for creating a memory book
  const awardMemoryBookPoints = async (bookTitle: string, pageCount: number, hasCustomization: boolean) => {
    // Determine content quality based on page count and customization
    const contentQuality = pageCount > 10 && hasCustomization ? 'high' : 
                          (pageCount > 5 || hasCustomization ? 'medium' : 'basic');
    
    return await awardPoints(ActionType.CREATE_MEMORY_BOOK, {
      experienceId,
      experienceName,
      bookTitle,
      pageCount,
      hasCustomization,
      contentQuality
    });
  };

  // Function to award points for setting up celebration countdowns
  const awardCelebrationCountdownPoints = async (eventName: string, hasCustomMessage: boolean) => {
    return await awardPoints(ActionType.PARTICIPATE_IN_CHALLENGE, {
      experienceId,
      experienceName,
      eventName,
      hasCustomMessage,
      celebrationCountdown: true
    });
  };

  return {
    awardEmotionalMilestonePoints,
    awardMemoryCapturePoints,
    awardPreferenceAssessmentPoints,
    awardMemoryBookPoints,
    awardCelebrationCountdownPoints
  };
};

export default EmotionalLoyaltyIntegration;
