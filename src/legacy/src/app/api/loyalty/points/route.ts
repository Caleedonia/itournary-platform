import { NextRequest, NextResponse } from 'next/server';
import { ActionType, ActionCategory, TierLevel, PointsTransaction } from '../schema';
import { v4 as uuidv4 } from 'uuid';

// Mock database for development purposes
// In production, this would connect to a real database
const mockDb = {
  transactions: [] as PointsTransaction[],
  profiles: new Map<string, { 
    userId: string, 
    currentTier: TierLevel, 
    currentPoints: number,
    lifetimePoints: number,
    pointsMultiplier: number
  }>()
};

// Points configuration for different action types
const pointsConfig = {
  [ActionType.CREATE_EXPERIENCE]: { points: 100, category: ActionCategory.PLANNING },
  [ActionType.ADD_TIMELINE_ITEM]: { points: 10, category: ActionCategory.PLANNING },
  [ActionType.ADD_BUDGET_ITEM]: { points: 10, category: ActionCategory.PLANNING },
  [ActionType.COMPLETE_CHECKLIST]: { points: 200, category: ActionCategory.PLANNING },
  [ActionType.USE_TEMPLATE]: { points: 50, category: ActionCategory.PLANNING },
  [ActionType.SET_SUSTAINABILITY_PREFERENCE]: { points: 50, category: ActionCategory.PLANNING },
  
  [ActionType.SHARE_STORY]: { points: 150, category: ActionCategory.COMMUNITY },
  [ActionType.POST_REVIEW]: { points: 75, category: ActionCategory.COMMUNITY },
  [ActionType.ANSWER_QUESTION]: { points: 50, category: ActionCategory.COMMUNITY },
  [ActionType.CREATE_TEMPLATE]: { points: 300, category: ActionCategory.COMMUNITY },
  [ActionType.RECEIVE_HELPFUL_VOTE]: { points: 25, category: ActionCategory.COMMUNITY },
  [ActionType.MENTOR_MEMBER]: { points: 100, category: ActionCategory.COMMUNITY },
  
  [ActionType.COMPLETE_EXPERIENCE]: { points: 500, category: ActionCategory.COMPLETION },
  [ActionType.DOCUMENT_MEMORY]: { points: 200, category: ActionCategory.COMPLETION },
  [ActionType.CREATE_MEMORY_BOOK]: { points: 300, category: ActionCategory.COMPLETION },
  [ActionType.SHARE_SUSTAINABILITY_CHOICE]: { points: 100, category: ActionCategory.COMPLETION },
  
  [ActionType.REFER_FRIEND]: { points: 500, category: ActionCategory.REFERRAL },
  [ActionType.REFERRED_FRIEND_CREATES_EXPERIENCE]: { points: 250, category: ActionCategory.REFERRAL },
  [ActionType.SHARE_ON_SOCIAL]: { points: 100, category: ActionCategory.REFERRAL },
  [ActionType.GROUP_PLANNING]: { points: 150, category: ActionCategory.REFERRAL },
  
  [ActionType.DAILY_LOGIN]: { points: 25, category: ActionCategory.ENGAGEMENT },
  [ActionType.WEEKLY_STREAK]: { points: 200, category: ActionCategory.ENGAGEMENT },
  [ActionType.COMPLETE_PROFILE]: { points: 150, category: ActionCategory.ENGAGEMENT },
  [ActionType.PROVIDE_FEEDBACK]: { points: 100, category: ActionCategory.ENGAGEMENT },
  [ActionType.INSTALL_PWA]: { points: 200, category: ActionCategory.ENGAGEMENT },
  [ActionType.PARTICIPATE_IN_CHALLENGE]: { points: 150, category: ActionCategory.ENGAGEMENT },
  
  // First-time milestone actions
  [ActionType.TIER_UPGRADE]: { points: 0, category: ActionCategory.SYSTEM }, // Special case, no points
  [ActionType.REDEEM_REWARD]: { points: 0, category: ActionCategory.REDEMPTION } // Special case, no points
};

// Tier multipliers
const tierMultipliers = {
  [TierLevel.EXPLORER]: 1.0,
  [TierLevel.VOYAGER]: 1.2,
  [TierLevel.NAVIGATOR]: 1.5,
  [TierLevel.PIONEER]: 2.0,
  [TierLevel.LUMINARY]: 3.0
};

// Calculate points for an action
function calculatePoints(
  actionType: ActionType, 
  userId: string, 
  metadata: Record<string, any> = {}
): { 
  basePoints: number, 
  multiplier: number, 
  totalPoints: number, 
  category: ActionCategory 
} {
  // Get user profile or create default if not exists
  if (!mockDb.profiles.has(userId)) {
    mockDb.profiles.set(userId, {
      userId,
      currentTier: TierLevel.EXPLORER,
      currentPoints: 0,
      lifetimePoints: 0,
      pointsMultiplier: tierMultipliers[TierLevel.EXPLORER]
    });
  }
  
  const userProfile = mockDb.profiles.get(userId)!;
  const config = pointsConfig[actionType];
  
  if (!config) {
    throw new Error(`Unknown action type: ${actionType}`);
  }
  
  // Apply tier multiplier
  const multiplier = userProfile.pointsMultiplier;
  const basePoints = config.points;
  
  // Apply any special modifiers based on metadata
  let modifiedBasePoints = basePoints;
  
  // Example: Bonus points for high-quality content
  if (metadata.contentQuality === 'high' && 
      [ActionType.SHARE_STORY, ActionType.POST_REVIEW].includes(actionType)) {
    modifiedBasePoints += 50;
  }
  
  // Example: Bonus for streak milestones
  if (actionType === ActionType.WEEKLY_STREAK && metadata.streakCount) {
    const streakCount = metadata.streakCount as number;
    if (streakCount % 4 === 0) { // Monthly streak bonus
      modifiedBasePoints += 100;
    }
  }
  
  const totalPoints = Math.round(modifiedBasePoints * multiplier);
  
  return {
    basePoints: modifiedBasePoints,
    multiplier,
    totalPoints,
    category: config.category
  };
}

// Record a points transaction
function recordTransaction(
  userId: string,
  actionType: ActionType,
  metadata: Record<string, any> = {}
): PointsTransaction {
  const pointsInfo = calculatePoints(actionType, userId, metadata);
  const userProfile = mockDb.profiles.get(userId)!;
  
  // Create transaction record
  const transaction: PointsTransaction = {
    transactionId: uuidv4(),
    userId,
    actionType,
    actionCategory: pointsInfo.category,
    pointsEarned: pointsInfo.basePoints,
    multiplier: pointsInfo.multiplier,
    totalPoints: pointsInfo.totalPoints,
    description: getActionDescription(actionType, metadata),
    metadata,
    timestamp: new Date(),
    // Set expiration date if applicable (e.g., 1 year from now)
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  };
  
  // Update user profile
  userProfile.currentPoints += pointsInfo.totalPoints;
  userProfile.lifetimePoints += pointsInfo.totalPoints;
  
  // Store transaction
  mockDb.transactions.push(transaction);
  
  return transaction;
}

// Get a descriptive message for the action
function getActionDescription(actionType: ActionType, metadata: Record<string, any> = {}): string {
  switch (actionType) {
    case ActionType.CREATE_EXPERIENCE:
      return `Created a new experience: ${metadata.experienceName || 'Unnamed Experience'}`;
    case ActionType.ADD_TIMELINE_ITEM:
      return `Added an item to timeline: ${metadata.itemName || 'Unnamed Item'}`;
    case ActionType.COMPLETE_EXPERIENCE:
      return `Completed experience: ${metadata.experienceName || 'Unnamed Experience'}`;
    case ActionType.DAILY_LOGIN:
      return `Daily login bonus`;
    case ActionType.WEEKLY_STREAK:
      return `Completed a weekly streak of ${metadata.streakCount || '?'} weeks`;
    case ActionType.REFER_FRIEND:
      return `Referred a friend: ${metadata.friendName || 'New User'}`;
    default:
      return `Earned points for ${actionType.replace(/_/g, ' ').toLowerCase()}`;
  }
}

// API route handlers
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required parameter: userId' },
      { status: 400 }
    );
  }
  
  // Get user's transactions
  const userTransactions = mockDb.transactions.filter(t => t.userId === userId);
  
  return NextResponse.json({ transactions: userTransactions });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, actionType, metadata = {} } = body;
    
    if (!userId || !actionType) {
      return NextResponse.json(
        { error: 'Missing required parameters: userId and actionType are required' },
        { status: 400 }
      );
    }
    
    // Validate action type
    if (!Object.values(ActionType).includes(actionType as ActionType)) {
      return NextResponse.json(
        { error: `Invalid action type: ${actionType}` },
        { status: 400 }
      );
    }
    
    // Record the transaction
    const transaction = recordTransaction(userId, actionType as ActionType, metadata);
    
    // Get updated user profile
    const userProfile = mockDb.profiles.get(userId);
    
    return NextResponse.json({
      success: true,
      transaction,
      userProfile: {
        userId: userProfile?.userId,
        currentTier: userProfile?.currentTier,
        currentPoints: userProfile?.currentPoints,
        lifetimePoints: userProfile?.lifetimePoints
      }
    });
  } catch (error) {
    console.error('Error processing points transaction:', error);
    return NextResponse.json(
      { error: 'Failed to process points transaction' },
      { status: 500 }
    );
  }
}
