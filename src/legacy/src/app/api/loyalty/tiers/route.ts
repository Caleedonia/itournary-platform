import { NextRequest, NextResponse } from 'next/server';
import { TierLevel, ActionType, ActionCategory } from '../schema';

// Tier definitions with requirements and benefits
const tierDefinitions = {
  [TierLevel.EXPLORER]: {
    tierId: 'explorer-tier',
    tierName: 'Explorer',
    tierLevel: TierLevel.EXPLORER,
    pointsRequired: 0,
    experiencesRequired: 0,
    referralsRequired: 0,
    pointsMultiplier: 1.0,
    benefits: [
      'Basic planning tools and community access',
      'Digital "Journey Passport" to track experiences',
      'Access to curated occasion templates',
      'Sustainability impact tracker'
    ],
    exclusiveRewards: []
  },
  [TierLevel.VOYAGER]: {
    tierId: 'voyager-tier',
    tierName: 'Voyager',
    tierLevel: TierLevel.VOYAGER,
    pointsRequired: 1000,
    experiencesRequired: 1,
    referralsRequired: 0,
    pointsMultiplier: 1.2,
    benefits: [
      'All Explorer benefits',
      'Exclusive templates and partner perks',
      'Monthly "Micro-Experience" rewards',
      'Personalized occasion recommendations',
      'Carbon offset options for travel plans'
    ],
    exclusiveRewards: ['micro-experience-monthly']
  },
  [TierLevel.NAVIGATOR]: {
    tierId: 'navigator-tier',
    tierName: 'Navigator',
    tierLevel: TierLevel.NAVIGATOR,
    pointsRequired: 5000,
    experiencesRequired: 3,
    referralsRequired: 2,
    pointsMultiplier: 1.5,
    benefits: [
      'All Voyager benefits',
      'Priority support and early access to features',
      'Quarterly "Local Experience" rewards',
      'AI-powered personalization engine',
      'Exclusive community forums access',
      'Sustainable travel partner discounts'
    ],
    exclusiveRewards: ['micro-experience-monthly', 'local-experience-quarterly']
  },
  [TierLevel.PIONEER]: {
    tierId: 'pioneer-tier',
    tierName: 'Pioneer',
    tierLevel: TierLevel.PIONEER,
    pointsRequired: 15000,
    experiencesRequired: 5,
    referralsRequired: 5,
    pointsMultiplier: 2.0,
    benefits: [
      'All Navigator benefits',
      'Custom branding options and premium partner rewards',
      'Bi-annual "Signature Experience" rewards',
      'Personal occasion concierge',
      'Exclusive community mentorship status',
      'Premium sustainable travel packages'
    ],
    exclusiveRewards: [
      'micro-experience-monthly', 
      'local-experience-quarterly', 
      'signature-experience-biannual'
    ]
  },
  [TierLevel.LUMINARY]: {
    tierId: 'luminary-tier',
    tierName: 'Luminary',
    tierLevel: TierLevel.LUMINARY,
    pointsRequired: 50000,
    experiencesRequired: 10,
    referralsRequired: 10,
    pointsMultiplier: 3.0,
    benefits: [
      'All Pioneer benefits',
      'Dedicated journey planner and all premium benefits',
      'Annual "Transformative Experience" reward',
      'Beta access to new platform features',
      'Community leadership recognition',
      'Sustainable travel ambassador status'
    ],
    exclusiveRewards: [
      'micro-experience-monthly', 
      'local-experience-quarterly', 
      'signature-experience-biannual',
      'transformative-experience-annual'
    ]
  }
};

// Mock database for development purposes
// In production, this would connect to a real database
const mockDb = {
  userProfiles: new Map<string, {
    userId: string;
    currentTier: TierLevel;
    currentPoints: number;
    lifetimePoints: number;
    completedExperiences: number;
    referralCount: number;
  }>(),
  tierUpgradeHistory: [] as {
    userId: string;
    previousTier: TierLevel;
    newTier: TierLevel;
    upgradeDate: Date;
  }[]
};

// Check if user qualifies for tier upgrade
function checkTierEligibility(userId: string): {
  isEligible: boolean;
  currentTier: TierLevel;
  eligibleTier: TierLevel | null;
  nextTierProgress: {
    points: { current: number; required: number; percentage: number };
    experiences: { current: number; required: number; percentage: number };
    referrals: { current: number; required: number; percentage: number };
  };
} {
  // Get user profile or create default if not exists
  if (!mockDb.userProfiles.has(userId)) {
    mockDb.userProfiles.set(userId, {
      userId,
      currentTier: TierLevel.EXPLORER,
      currentPoints: 0,
      lifetimePoints: 0,
      completedExperiences: 0,
      referralCount: 0
    });
  }

  const userProfile = mockDb.userProfiles.get(userId)!;
  const currentTierLevel = userProfile.currentTier;
  
  // Determine next tier
  const tierLevels = Object.values(TierLevel);
  const currentTierIndex = tierLevels.indexOf(currentTierLevel);
  const nextTierIndex = currentTierIndex + 1;
  
  // If already at highest tier, no upgrade possible
  if (nextTierIndex >= tierLevels.length) {
    return {
      isEligible: false,
      currentTier: currentTierLevel,
      eligibleTier: null,
      nextTierProgress: {
        points: { current: userProfile.lifetimePoints, required: Infinity, percentage: 100 },
        experiences: { current: userProfile.completedExperiences, required: Infinity, percentage: 100 },
        referrals: { current: userProfile.referralCount, required: Infinity, percentage: 100 }
      }
    };
  }
  
  const nextTierLevel = tierLevels[nextTierIndex] as TierLevel;
  const nextTierDefinition = tierDefinitions[nextTierLevel];
  
  // Check if user meets all requirements for next tier
  const meetsPointsRequirement = userProfile.lifetimePoints >= nextTierDefinition.pointsRequired;
  const meetsExperiencesRequirement = userProfile.completedExperiences >= nextTierDefinition.experiencesRequired;
  const meetsReferralsRequirement = userProfile.referralCount >= nextTierDefinition.referralsRequired;
  
  const isEligible = meetsPointsRequirement && meetsExperiencesRequirement && meetsReferralsRequirement;
  
  // Calculate progress percentages for next tier
  const pointsPercentage = Math.min(100, (userProfile.lifetimePoints / nextTierDefinition.pointsRequired) * 100);
  const experiencesPercentage = Math.min(100, (userProfile.completedExperiences / nextTierDefinition.experiencesRequired) * 100);
  const referralsPercentage = Math.min(100, (userProfile.referralCount / nextTierDefinition.referralsRequired) * 100);
  
  return {
    isEligible,
    currentTier: currentTierLevel,
    eligibleTier: isEligible ? nextTierLevel : null,
    nextTierProgress: {
      points: {
        current: userProfile.lifetimePoints,
        required: nextTierDefinition.pointsRequired,
        percentage: pointsPercentage
      },
      experiences: {
        current: userProfile.completedExperiences,
        required: nextTierDefinition.experiencesRequired,
        percentage: experiencesPercentage
      },
      referrals: {
        current: userProfile.referralCount,
        required: nextTierDefinition.referralsRequired,
        percentage: referralsPercentage
      }
    }
  };
}

// Upgrade user to a new tier
function upgradeTier(userId: string, newTier: TierLevel): boolean {
  if (!mockDb.userProfiles.has(userId)) {
    return false;
  }
  
  const userProfile = mockDb.userProfiles.get(userId)!;
  const previousTier = userProfile.currentTier;
  
  // Verify the new tier is higher than current tier
  const tierLevels = Object.values(TierLevel);
  if (tierLevels.indexOf(newTier) <= tierLevels.indexOf(previousTier)) {
    return false;
  }
  
  // Update user profile
  userProfile.currentTier = newTier;
  
  // Record tier upgrade history
  mockDb.tierUpgradeHistory.push({
    userId,
    previousTier,
    newTier,
    upgradeDate: new Date()
  });
  
  return true;
}

// Get all tier definitions
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  // If userId is provided, return tier eligibility information
  if (userId) {
    const eligibility = checkTierEligibility(userId);
    
    return NextResponse.json({
      currentTier: tierDefinitions[eligibility.currentTier],
      eligibleTier: eligibility.eligibleTier ? tierDefinitions[eligibility.eligibleTier] : null,
      isEligible: eligibility.isEligible,
      nextTierProgress: eligibility.nextTierProgress,
      allTiers: Object.values(tierDefinitions)
    });
  }
  
  // Otherwise, return all tier definitions
  return NextResponse.json({
    tiers: Object.values(tierDefinitions)
  });
}

// Process tier upgrade
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      );
    }
    
    // Check eligibility first
    const eligibility = checkTierEligibility(userId);
    
    // Handle different actions
    switch (action) {
      case 'check':
        // Just return eligibility without making changes
        return NextResponse.json({
          currentTier: tierDefinitions[eligibility.currentTier],
          eligibleTier: eligibility.eligibleTier ? tierDefinitions[eligibility.eligibleTier] : null,
          isEligible: eligibility.isEligible,
          nextTierProgress: eligibility.nextTierProgress
        });
        
      case 'upgrade':
        // Attempt to upgrade if eligible
        if (!eligibility.isEligible || !eligibility.eligibleTier) {
          return NextResponse.json(
            { error: 'User is not eligible for tier upgrade', eligibility },
            { status: 400 }
          );
        }
        
        const success = upgradeTier(userId, eligibility.eligibleTier);
        
        if (!success) {
          return NextResponse.json(
            { error: 'Failed to upgrade tier' },
            { status: 500 }
          );
        }
        
        // Return updated tier information
        const updatedEligibility = checkTierEligibility(userId);
        return NextResponse.json({
          success: true,
          previousTier: tierDefinitions[eligibility.currentTier],
          newTier: tierDefinitions[eligibility.eligibleTier],
          nextTierProgress: updatedEligibility.nextTierProgress
        });
        
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing tier request:', error);
    return NextResponse.json(
      { error: 'Failed to process tier request' },
      { status: 500 }
    );
  }
}
