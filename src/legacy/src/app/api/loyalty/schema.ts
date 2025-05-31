// Loyalty program schema definitions and types

export enum TierLevel {
  EXPLORER = 'Explorer',
  VOYAGER = 'Voyager',
  NAVIGATOR = 'Navigator',
  PIONEER = 'Pioneer',
  LUMINARY = 'Luminary'
}

export enum ActionType {
  CREATE_EXPERIENCE = 'create_experience',
  ADD_TIMELINE_ITEM = 'add_timeline_item',
  COMPLETE_TIMELINE_PHASE = 'complete_timeline_phase',
  ADD_BUDGET_ITEM = 'add_budget_item',
  COMPLETE_CHECKLIST = 'complete_checklist',
  DOCUMENT_MEMORY = 'document_memory',
  SHARE_EXPERIENCE = 'share_experience',
  SHARE_COMMUNITY_POST = 'share_community_post',
  COMPLETE_EXPERIENCE = 'complete_experience',
  SHARE_SUSTAINABILITY_CHOICE = 'share_sustainability_choice',
  REFER_USER = 'refer_user'
}

// Add the missing enums for gamification
export enum AchievementType {
  MILESTONE = 'Milestone',
  EXPLORATION = 'Exploration',
  MASTERY = 'Mastery',
  COMMUNITY = 'Community',
  SUSTAINABILITY = 'Sustainability',
  SPECIAL = 'Special'
}

export enum QuestCategory {
  PLANNING = 'Planning',
  BUDGETING = 'Budgeting',
  EXPLORING = 'Exploring',
  SHARING = 'Sharing',
  SUSTAINABILITY = 'Sustainability'
}

export enum QuestDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EPIC = 'Epic'
}

export enum ExperienceCategory {
  ADVENTURE = 'Adventure',
  BEACH = 'Beach',
  CITY_EXPLORATION = 'City Exploration',
  CULTURAL = 'Cultural',
  CULINARY = 'Culinary',
  EDUCATIONAL = 'Educational',
  FAMILY = 'Family',
  HONEYMOON = 'Honeymoon',
  LUXURY = 'Luxury',
  NATURE = 'Nature',
  ROAD_TRIP = 'Road Trip',
  ROMANTIC = 'Romantic',
  WILDLIFE = 'Wildlife',
  WELLNESS = 'Wellness'
}

export enum RewardType {
  PHYSICAL_REWARD = 'Physical Reward',
  DIGITAL_REWARD = 'Digital Reward',
  DISCOUNT = 'Discount',
  CREDIT = 'Credit'
}

export interface LoyaltyUser {
  userId: string;
  pointsBalance: number;
  tier: TierLevel;
  joinedDate: Date;
  lastActivity: Date;
  experiencesCompleted: number;
  referralsCompleted: number;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  actionType: ActionType;
  pointsAwarded: number;
  pointsBefore: number;
  pointsAfter: number;
  metadata: any; // Additional information about the action
  timestamp: Date;
  description: string;
}

export interface TierProgress {
  currentTier: TierLevel;
  nextTier: TierLevel | null;
  pointsToNextTier: number;
  experiencesCompleted: number;
  experiencesNeeded: number;
  referralsCompleted: number;
  referralsNeeded: number;
}

export interface TierRequirement {
  tier: TierLevel;
  pointsRequired: number;
  experiencesRequired: number;
  referralsRequired: number;
  benefits: string[];
}

export interface TierEligibility {
  isEligible: boolean;
  currentTier: TierLevel;
  eligibleTier: TierLevel;
  requirementsMet: {
    points: boolean;
    experiences: boolean;
    referrals: boolean;
  };
  progress: TierProgress;
}

// Define tier requirements
export const tierRequirements: TierRequirement[] = [
  {
    tier: TierLevel.EXPLORER,
    pointsRequired: 0,
    experiencesRequired: 0,
    referralsRequired: 0,
    benefits: [
      'Basic points earning (1x multiplier)',
      'Access to Micro Experiences rewards',
      'Activity feed & gamification features'
    ]
  },
  {
    tier: TierLevel.VOYAGER,
    pointsRequired: 1000,
    experiencesRequired: 1,
    referralsRequired: 0,
    benefits: [
      'Improved points earning (1.2x multiplier)',
      'Access to Local Experiences rewards',
      'Priority customer support'
    ]
  },
  {
    tier: TierLevel.NAVIGATOR,
    pointsRequired: 5000,
    experiencesRequired: 3,
    referralsRequired: 2,
    benefits: [
      'Enhanced points earning (1.5x multiplier)',
      'Access to Signature Experiences rewards',
      'Personalized experience recommendations',
      'Exclusive community features'
    ]
  },
  {
    tier: TierLevel.PIONEER,
    pointsRequired: 15000,
    experiencesRequired: 5,
    referralsRequired: 5,
    benefits: [
      'Premium points earning (2x multiplier)',
      'Access to Transformative Experiences rewards',
      'Dedicated concierge service',
      'Partner benefits and status matching'
    ]
  },
  {
    tier: TierLevel.LUMINARY,
    pointsRequired: 50000,
    experiencesRequired: 10,
    referralsRequired: 10,
    benefits: [
      'Elite points earning (3x multiplier)',
      'Access to exclusive Luminary Experiences',
      'Complimentary upgrades and benefits',
      'Personalized travel planning consultation',
      'VIP event invitations'
    ]
  }
];

export default {
  TierLevel,
  ActionType,
  AchievementType, // Add to default export
  QuestCategory,    // Add to default export
  QuestDifficulty,  // Add to default export
  ExperienceCategory,
  RewardType,
  tierRequirements
};
