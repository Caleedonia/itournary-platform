import React from 'react';
import { ActionType } from '@/app/api/loyalty/schema';
import { useLoyaltyIntegration } from '../Loyalty/useLoyaltyIntegration';

// This component integrates loyalty points with Community features
const CommunityLoyaltyIntegration: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { awardPoints } = useLoyaltyIntegration(userId);

  // Function to award points for sharing a story
  const awardStoryPoints = async (storyTitle: string, wordCount: number, hasMedia: boolean) => {
    // Determine content quality based on length and media
    const contentQuality = wordCount > 500 && hasMedia ? 'high' : 
                          (wordCount > 300 || hasMedia ? 'medium' : 'basic');
    
    return await awardPoints(ActionType.SHARE_STORY, {
      storyTitle,
      wordCount,
      hasMedia,
      contentQuality
    });
  };

  // Function to award points for posting a review
  const awardReviewPoints = async (reviewTarget: string, rating: number, wordCount: number, hasMedia: boolean) => {
    // Determine content quality based on length and media
    const contentQuality = wordCount > 200 && hasMedia ? 'high' : 
                          (wordCount > 100 || hasMedia ? 'medium' : 'basic');
    
    return await awardPoints(ActionType.POST_REVIEW, {
      reviewTarget,
      rating,
      wordCount,
      hasMedia,
      contentQuality
    });
  };

  // Function to award points for answering community questions
  const awardAnswerPoints = async (questionId: string, wordCount: number) => {
    return await awardPoints(ActionType.ANSWER_QUESTION, {
      questionId,
      wordCount
    });
  };

  // Function to award points for creating a template
  const awardTemplateCreationPoints = async (templateName: string, occasionType: string) => {
    return await awardPoints(ActionType.CREATE_TEMPLATE, {
      templateName,
      occasionType
    });
  };

  // Function to award points for receiving helpful votes
  const awardHelpfulVotePoints = async (contentType: string, contentId: string) => {
    return await awardPoints(ActionType.RECEIVE_HELPFUL_VOTE, {
      contentType,
      contentId
    });
  };

  // Function to award points for mentoring other members
  const awardMentorPoints = async (menteeId: string, mentorshipType: string) => {
    return await awardPoints(ActionType.MENTOR_MEMBER, {
      menteeId,
      mentorshipType
    });
  };

  // Function to award points for referring friends
  const awardReferralPoints = async (friendName: string, friendEmail: string) => {
    return await awardPoints(ActionType.REFER_FRIEND, {
      friendName,
      friendEmail
    });
  };

  // Function to award points when a referred friend creates an experience
  const awardReferredFriendActivityPoints = async (friendId: string, activityType: string) => {
    return await awardPoints(ActionType.REFERRED_FRIEND_CREATES_EXPERIENCE, {
      friendId,
      activityType
    });
  };

  // Function to award points for sharing on social media
  const awardSocialSharePoints = async (platform: string, contentType: string, contentId: string) => {
    return await awardPoints(ActionType.SHARE_ON_SOCIAL, {
      platform,
      contentType,
      contentId
    });
  };

  return {
    awardStoryPoints,
    awardReviewPoints,
    awardAnswerPoints,
    awardTemplateCreationPoints,
    awardHelpfulVotePoints,
    awardMentorPoints,
    awardReferralPoints,
    awardReferredFriendActivityPoints,
    awardSocialSharePoints
  };
};

export default CommunityLoyaltyIntegration;
