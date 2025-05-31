import React from 'react';
import { ActionType } from '@/app/api/loyalty/schema';
import { useLoyaltyIntegration } from '../Loyalty/useLoyaltyIntegration';

// This component integrates loyalty points with Timeline features
const TimelineLoyaltyIntegration: React.FC<{
  userId: string;
  experienceId: string;
  experienceName: string;
}> = ({ userId, experienceId, experienceName }) => {
  const { awardPoints } = useLoyaltyIntegration(userId);

  // Function to award points for creating a timeline item
  const awardTimelineItemPoints = async (itemName: string) => {
    return await awardPoints(ActionType.ADD_TIMELINE_ITEM, {
      experienceId,
      experienceName,
      itemName
    });
  };

  // Function to award points for completing a timeline phase
  const awardPhaseCompletionPoints = async (phaseName: string) => {
    return await awardPoints(ActionType.COMPLETE_CHECKLIST, {
      experienceId,
      experienceName,
      phaseName
    });
  };

  // Function to award points for marking an emotional milestone
  const awardEmotionalMilestonePoints = async (milestoneName: string, emotionType: string) => {
    return await awardPoints(ActionType.DOCUMENT_MEMORY, {
      experienceId,
      experienceName,
      milestoneName,
      emotionType,
      contentQuality: 'high' // This could be determined by content length, media attachments, etc.
    });
  };

  // Function to award points for completing the entire experience
  const awardExperienceCompletionPoints = async () => {
    return await awardPoints(ActionType.COMPLETE_EXPERIENCE, {
      experienceId,
      experienceName
    });
  };

  return {
    awardTimelineItemPoints,
    awardPhaseCompletionPoints,
    awardEmotionalMilestonePoints,
    awardExperienceCompletionPoints
  };
};

export default TimelineLoyaltyIntegration;
