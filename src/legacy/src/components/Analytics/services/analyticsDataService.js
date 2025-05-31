/**
 * Analytics Service for data fetching
 * 
 * This module provides services for fetching analytics data from the backend
 */

/**
 * Fetch analytics data based on dashboard type and date range
 * 
 * @param {string} dashboardType - Type of dashboard (executive, community, etc.)
 * @param {string} dateRange - Date range for data
 * @param {string} userRole - User role for permission-based data access
 * @returns {Promise<Object>} Analytics data
 */
export async function fetchAnalyticsData(dashboardType, dateRange, userRole) {
  // In a real implementation, this would make API calls to fetch data
  // This is a mock implementation that returns placeholder data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data based on dashboard type
  switch (dashboardType) {
    case 'executive':
      return getMockExecutiveData(dateRange);
    case 'community':
      return getMockCommunityData(dateRange);
    case 'emotional':
      return getMockEmotionalData(dateRange);
    case 'trust':
      return getMockTrustData(dateRange);
    case 'retention':
      return getMockRetentionData(dateRange);
    case 'mobile':
      return getMockMobileData(dateRange);
    default:
      return getMockExecutiveData(dateRange);
  }
}

/**
 * Get mock executive dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockExecutiveData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    totalUsers: 12500,
    userGrowth: 15.2,
    activeUsers: 8750,
    activeUserGrowth: 22.5,
    experiencesCreated: 4320,
    experienceGrowth: 18.7,
    conversionRate: 8.5,
    conversionRateChange: 1.2,
    
    userGrowthTrend: generateTimeSeriesData(30, 'users', 500, 1000),
    featureAdoption: [
      { feature: 'Timeline', usagePercentage: 92 },
      { feature: 'Budget', usagePercentage: 78 },
      { feature: 'Community', usagePercentage: 65 },
      { feature: 'Emotional', usagePercentage: 48 },
      { feature: 'Trust', usagePercentage: 72 },
      { feature: 'Mobile', usagePercentage: 85 }
    ],
    
    engagementByFeature: generateHeatMapData(
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      ['Timeline', 'Budget', 'Community', 'Emotional', 'Trust', 'Mobile'],
      'engagementScore'
    ),
    
    retentionData: [
      { period: 'Day 1', retentionRate: 100 },
      { period: 'Day 3', retentionRate: 72 },
      { period: 'Day 7', retentionRate: 58 },
      { period: 'Day 14', retentionRate: 45 },
      { period: 'Day 30', retentionRate: 38 },
      { period: 'Day 60', retentionRate: 32 },
      { period: 'Day 90', retentionRate: 28 }
    ],
    
    acquisitionChannels: [
      { channel: 'Organic Search', users: 3750 },
      { channel: 'Direct', users: 2500 },
      { channel: 'Referral', users: 1875 },
      { channel: 'Social', users: 2250 },
      { channel: 'Email', users: 1125 },
      { channel: 'Other', users: 1000 }
    ],
    
    conversionFunnel: [
      { stage: 'Visit', users: 50000 },
      { stage: 'Sign Up', users: 12500 },
      { stage: 'Create Experience', users: 7500 },
      { stage: 'Complete Timeline', users: 4500 },
      { stage: 'Complete Budget', users: 3200 },
      { stage: 'Share Experience', users: 1800 }
    ],
    
    insights: [
      {
        title: 'Mobile usage increasing',
        description: 'Mobile usage has increased by 28% compared to the previous period, indicating a shift towards mobile planning.',
        trend: 'up'
      },
      {
        title: 'Budget feature adoption needs improvement',
        description: 'Budget feature has the lowest adoption rate among core features. Consider improving onboarding for this feature.',
        trend: 'down'
      },
      {
        title: 'Weekend engagement peaks',
        description: 'User engagement peaks on weekends, particularly for timeline and emotional experience features.',
        trend: 'up'
      },
      {
        title: 'Retention improving',
        description: '30-day retention has improved by 5% following the implementation of the loyalty program.',
        trend: 'up'
      }
    ]
  };
}

/**
 * Get mock community dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockCommunityData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    profileCompletionRate: 78,
    profileCompletionChange: 12.5,
    storiesShared: 3250,
    storiesSharedChange: 22.8,
    forumPosts: 8750,
    forumActivityChange: 15.3,
    engagementRate: 42,
    engagementRateChange: 8.7,
    
    profileCompletionTrend: generateTimeSeriesData(30, 'completionRate', 50, 80),
    
    storyEngagementByType: [
      { storyType: 'Travel', engagementScore: 85 },
      { storyType: 'Food', engagementScore: 72 },
      { storyType: 'Adventure', engagementScore: 92 },
      { storyType: 'Relaxation', engagementScore: 65 },
      { storyType: 'Cultural', engagementScore: 78 },
      { storyType: 'Family', engagementScore: 82 }
    ],
    
    forumActivityByTopic: [
      { topic: 'Destinations', posts: 2850 },
      { topic: 'Tips & Tricks', posts: 1950 },
      { topic: 'Recommendations', posts: 1650 },
      { topic: 'Questions', posts: 1250 },
      { topic: 'Experiences', posts: 1050 }
    ],
    
    engagementByTime: generateHeatMapData(
      ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      'engagementScore'
    ),
    
    topContributors: [
      { rank: 1, username: 'TravelExplorer', contributions: 287, engagementScore: 92, memberSince: '2023-05-12' },
      { rank: 2, username: 'AdventureSeeker', contributions: 245, engagementScore: 88, memberSince: '2023-06-23' },
      { rank: 3, username: 'GlobeTrotter', contributions: 212, engagementScore: 85, memberSince: '2023-04-18' },
      { rank: 4, username: 'WanderlustSpirit', contributions: 198, engagementScore: 82, memberSince: '2023-07-05' },
      { rank: 5, username: 'JourneyMaster', contributions: 176, engagementScore: 79, memberSince: '2023-08-14' }
    ],
    
    contentCreationVsConsumption: generateMultiTimeSeriesData(
      30,
      ['creation', 'consumption'],
      [50, 500],
      [150, 1000]
    ),
    
    successStoryPerformance: [
      { story: 'European Adventure', views: 12500 },
      { story: 'Asian Expedition', views: 9800 },
      { story: 'African Safari', views: 8700 },
      { story: 'South American Trek', views: 7600 },
      { story: 'Australian Outback', views: 6500 }
    ],
    
    communityInsights: [
      {
        title: 'Adventure stories most engaging',
        description: 'Adventure-themed stories receive 25% more engagement than other categories.',
        trend: 'up'
      },
      {
        title: 'Evening forum activity peaks',
        description: 'Forum activity peaks between 8pm-10pm across all days of the week.',
        trend: 'up'
      },
      {
        title: 'Profile completion correlates with engagement',
        description: 'Users with >80% profile completion are 3x more likely to contribute content.',
        trend: 'up'
      },
      {
        title: 'Content consumption growing faster than creation',
        description: 'Content consumption is growing at 2.5x the rate of content creation.',
        trend: 'neutral'
      }
    ]
  };
}

/**
 * Get mock emotional dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockEmotionalData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    milestonesCreated: 8750,
    milestonesCreatedChange: 18.5,
    memoriesCaptured: 15250,
    memoriesCapturedChange: 22.3,
    memoryBooksCreated: 3450,
    memoryBooksCreatedChange: 15.8,
    preferenceCompletionRate: 68,
    preferenceCompletionChange: 12.5,
    
    milestoneCreationTrend: generateTimeSeriesData(30, 'count', 200, 350),
    
    milestonesByEmotionType: [
      { emotionType: 'Excitement', count: 2850 },
      { emotionType: 'Joy', count: 2250 },
      { emotionType: 'Anticipation', count: 1950 },
      { emotionType: 'Nostalgia', count: 950 },
      { emotionType: 'Surprise', count: 750 }
    ],
    
    memoryCaptureByMediaType: [
      { mediaType: 'Photo', count: 8500 },
      { mediaType: 'Text', count: 4250 },
      { mediaType: 'Video', count: 1750 },
      { mediaType: 'Audio', count: 750 }
    ],
    
    memoryCaptureByTimelinePosition: generateHeatMapData(
      ['Pre-Trip', 'Beginning', 'Middle', 'End', 'Post-Trip'],
      ['Vacation', 'Adventure', 'Family', 'Cultural', 'Relaxation'],
      'count'
    ),
    
    topEmotionalMoments: [
      { rank: 1, momentType: 'First Sight', emotionType: 'Awe', engagementScore: 95, shareCount: 1250 },
      { rank: 2, momentType: 'Achievement', emotionType: 'Pride', engagementScore: 92, shareCount: 1150 },
      { rank: 3, momentType: 'Connection', emotionType: 'Joy', engagementScore: 88, shareCount: 950 },
      { rank: 4, momentType: 'Discovery', emotionType: 'Surprise', engagementScore: 85, shareCount: 850 },
      { rank: 5, momentType: 'Reflection', emotionType: 'Nostalgia', engagementScore: 82, shareCount: 750 }
    ],
    
    preferenceSelectionDistribution: [
      { preferenceType: 'Activities', selectionCount: 9500 },
      { preferenceType: 'Accommodations', selectionCount: 8250 },
      { preferenceType: 'Dining', selectionCount: 7500 },
      { preferenceType: 'Transportation', selectionCount: 6750 },
      { preferenceType: 'Atmosphere', selectionCount: 5500 }
    ],
    
    celebrationCountdownEngagement: [
      { daysBeforeEvent: 90, engagementLevel: 20 },
      { daysBeforeEvent: 60, engagementLevel: 35 },
      { daysBeforeEvent: 30, engagementLevel: 55 },
      { daysBeforeEvent: 14, engagementLevel: 75 },
      { daysBeforeEvent: 7, engagementLevel: 85 },
      { daysBeforeEvent: 3, engagementLevel: 92 },
      { daysBeforeEvent: 1, engagementLevel: 98 }
    ],
    
    emotionalInsights: [
      {
        title: 'Photo memories dominate',
        description: 'Photos account for 56% of all memory captures, with highest engagement rates.',
        trend: 'up'
      },
      {
        title: 'Pre-trip emotional engagement rising',
        description: 'Pre-trip emotional engagement has increased by 35% following the introduction of countdown features.',
        trend: 'up'
      },
      {
        title: 'Collaborative memories more engaging',
        description: 'Memories created collaboratively receive 2.8x more engagement than individual memories.',
        trend: 'up'
      },
      {
        title: 'Preference completion needs improvement',
        description: 'Transportation preferences have the lowest completion rate at 45%.',
        trend: 'down'
      }
    ]
  };
}

/**
 * Get mock trust dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockTrustData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    reviewsSubmitted: 12500,
    reviewsSubmittedChange: 22.5,
    verificationRate: 68,
    verificationRateChange: 15.3,
    trustScore: 4.7,
    trustScoreChange: 0.3,
    safetyReports: 350,
    safetyReportsChange: -12.5,
    
    reviewSubmissionTrend: generateTimeSeriesData(30, 'count', 300, 500),
    
    reviewsByRating: [
      { rating: 5, count: 7500 },
      { rating: 4, count: 3250 },
      { rating: 3, count: 1250 },
      { rating: 2, count: 350 },
      { rating: 1, count: 150 }
    ],
    
    verificationMethods: [
      { method: 'Receipt', count: 5250 },
      { method: 'Photo', count: 3750 },
      { method: 'Booking Confirmation', count: 2250 },
      { method: 'GPS Check-in', count: 1250 }
    ],
    
    trustBadgeInteractions: generateHeatMapData(
      ['Verified', 'Top Rated', 'Safety Certified', 'Community Choice', 'Eco Friendly'],
      ['Listing Page', 'Search Results', 'Profile Page', 'Review Page', 'Checkout'],
      'interactionCount'
    ),
    
    topReviewedExperiences: [
      { rank: 1, experienceName: 'European Adventure', reviewCount: 1250, averageRating: 4.8, verificationRate: 82 },
      { rank: 2, experienceName: 'Tropical Paradise', reviewCount: 950, averageRating: 4.7, verificationRate: 78 },
      { rank: 3, experienceName: 'Mountain Expedition', reviewCount: 850, averageRating: 4.9, verificationRate: 85 },
      { rank: 4, experienceName: 'Cultural Immersion', reviewCount: 750, averageRating: 4.6, verificationRate: 72 },
      { rank: 5, experienceName: 'Urban Exploration', reviewCount: 650, averageRating: 4.5, verificationRate: 68 }
    ],
    
    reviewEngagement: [
      { engagementType: 'View', count: 125000 },
      { engagementType: 'Helpful Vote', count: 45000 },
      { engagementType: 'Comment', count: 15000 },
      { engagementType: 'Share', count: 8500 },
      { engagementType: 'Report', count: 1250 }
    ],
    
    safetyFeatureUsage: generateMultiTimeSeriesData(
      30,
      ['reportCount', 'guidelineViews', 'transparencyViews'],
      [10, 100, 50],
      [50, 500, 250]
    ),
    
    trustInsights: [
      {
        title: 'Verification increases trust',
        description: 'Verified reviews receive 3.2x more helpful votes than unverified reviews.',
        trend: 'up'
      },
      {
        title: 'Safety reports declining',
        description: 'Safety reports have decreased by 12.5% following the implementation of improved guidelines.',
        trend: 'down'
      },
      {
        title: 'Trust badges drive engagement',
        description: 'Listings with trust badges receive 2.8x more views and 3.5x more bookings.',
        trend: 'up'
      },
      {
        title: 'Photo verification most effective',
        description: 'Photo verification has the highest trust impact, increasing booking likelihood by 45%.',
        trend: 'up'
      }
    ]
  };
}

/**
 * Get mock retention dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockRetentionData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    retentionRate: 42,
    retentionRateChange: 8.5,
    membershipConversions: 3250,
    membershipConversionsChange: 15.8,
    referralConversions: 1850,
    referralConversionsChange: 22.5,
    loyaltyPointsIssued: 1250000,
    loyaltyPointsIssuedChange: 18.7,
    
    retentionRateTrend: generateTimeSeriesData(30, 'rate', 30, 45),
    
    membershipTierDistribution: [
      { tier: 'Explorer', userCount: 7500 },
      { tier: 'Voyager', userCount: 3250 },
      { tier: 'Adventurer', userCount: 1250 },
      { tier: 'Pioneer', userCount: 350 },
      { tier: 'Luminary', userCount: 150 }
    ],
    
    referralProgramPerformance: [
      { channel: 'Email', conversionRate: 12.5 },
      { channel: 'Social Media', conversionRate: 18.7 },
      { channel: 'Direct Link', conversionRate: 15.3 },
      { channel: 'In-App', conversionRate: 22.5 },
      { channel: 'SMS', conversionRate: 16.8 }
    ],
    
    loyaltyPointEconomy: generateMultiTimeSeriesData(
      30,
      ['pointsIssued', 'pointsRedeemed'],
      [25000, 15000],
      [50000, 35000]
    ),
    
    topRewardRedemptions: [
      { rank: 1, rewardName: 'Premium Experience', category: 'Travel', redemptionCount: 850, pointsRequired: 5000 },
      { rank: 2, rewardName: 'VIP Upgrade', category: 'Accommodation', redemptionCount: 750, pointsRequired: 3500 },
      { rank: 3, rewardName: 'Exclusive Tour', category: 'Activity', redemptionCount: 650, pointsRequired: 4000 },
      { rank: 4, rewardName: 'Priority Access', category: 'Service', redemptionCount: 550, pointsRequired: 2500 },
      { rank: 5, rewardName: 'Travel Credit', category: 'Financial', redemptionCount: 450, pointsRequired: 7500 }
    ],
    
    membershipUpgradeFunnel: [
      { stage: 'View Tiers', userCount: 25000 },
      { stage: 'Compare Benefits', userCount: 15000 },
      { stage: 'Begin Upgrade', userCount: 7500 },
      { stage: 'Select Payment', userCount: 5000 },
      { stage: 'Complete Upgrade', userCount: 3250 }
    ],
    
    pointsEarnedByActivity: [
      { activity: 'Bookings', points: 500000 },
      { activity: 'Reviews', points: 250000 },
      { activity: 'Referrals', points: 200000 },
      { activity: 'Content Creation', points: 150000 },
      { activity: 'Profile Completion', points: 100000 },
      { activity: 'Other', points: 50000 }
    ],
    
    membershipBenefitsEngagement: generateHeatMapData(
      ['Priority Support', 'Exclusive Access', 'Bonus Points', 'Special Offers', 'Early Access', 'Free Upgrades'],
      ['Explorer', 'Voyager', 'Adventurer', 'Pioneer', 'Luminary'],
      'engagementScore'
    ),
    
    churnRiskAnalysis: [
      { riskLevel: 'Very Low', userCount: 5000 },
      { riskLevel: 'Low', userCount: 3500 },
      { riskLevel: 'Medium', userCount: 2500 },
      { riskLevel: 'High', userCount: 1000 },
      { riskLevel: 'Very High', userCount: 500 }
    ],
    
    retentionInsights: [
      {
        title: 'Social referrals most effective',
        description: 'Social media referrals have the highest conversion rate at 18.7%, 25% higher than email.',
        trend: 'up'
      },
      {
        title: 'Premium experiences drive redemptions',
        description: 'Experience-based rewards are 2.3x more popular than monetary rewards.',
        trend: 'up'
      },
      {
        title: 'Tier progression increases retention',
        description: 'Users who progress to Voyager tier have 3.5x higher retention than Explorer tier users.',
        trend: 'up'
      },
      {
        title: 'Points economy growing',
        description: 'Points issuance is outpacing redemption by 40%, indicating growing program engagement.',
        trend: 'up'
      }
    ]
  };
}

/**
 * Get mock mobile dashboard data
 * 
 * @param {string} dateRange - Date range for data
 * @returns {Object} Mock data
 */
function getMockMobileData(dateRange) {
  return {
    lastUpdated: new Date().toISOString(),
    mobileUserPercentage: 65,
    mobileUserChange: 12.5,
    pwaInstallations: 3250,
    pwaInstallationsChange: 28.7,
    quickCaptures: 15250,
    quickCapturesChange: 22.5,
    locationUsageRate: 58,
    locationUsageChange: 15.3,
    
    mobileVsDesktopTrend: generateMultiTimeSeriesData(
      30,
      ['mobile', 'desktop', 'tablet'],
      [500, 300, 100],
      [800, 400, 150]
    ),
    
    deviceDistribution: [
      { deviceType: 'iOS Phone', percentage: 38 },
      { deviceType: 'Android Phone', percentage: 35 },
      { deviceType: 'iOS Tablet', percentage: 12 },
      { deviceType: 'Android Tablet', percentage: 8 },
      { deviceType: 'Desktop', percentage: 7 }
    ],
    
    pwaInstallationFunnel: [
      { stage: 'Eligible Users', userCount: 10000 },
      { stage: 'Prompt Shown', userCount: 7500 },
      { stage: 'Prompt Engaged', userCount: 5000 },
      { stage: 'Installation Started', userCount: 4000 },
      { stage: 'Installation Completed', userCount: 3250 }
    ],
    
    pwaUsageAfterInstallation: [
      { daysAfterInstall: 1, usageRate: 95 },
      { daysAfterInstall: 3, usageRate: 85 },
      { daysAfterInstall: 7, usageRate: 72 },
      { daysAfterInstall: 14, usageRate: 65 },
      { daysAfterInstall: 30, usageRate: 58 },
      { daysAfterInstall: 60, usageRate: 52 },
      { daysAfterInstall: 90, usageRate: 48 }
    ],
    
    topMobileFeatures: [
      { rank: 1, featureName: 'Quick Capture', usageCount: 15250, growthRate: 22.5, satisfactionScore: 4.8 },
      { rank: 2, featureName: 'Location Services', usageCount: 12500, growthRate: 18.7, satisfactionScore: 4.6 },
      { rank: 3, featureName: 'Offline Access', usageCount: 9500, growthRate: 25.3, satisfactionScore: 4.7 },
      { rank: 4, featureName: 'Mobile Navigation', usageCount: 8750, growthRate: 15.8, satisfactionScore: 4.5 },
      { rank: 5, featureName: 'Push Notifications', usageCount: 7500, growthRate: 12.5, satisfactionScore: 4.2 }
    ],
    
    quickCaptureTypes: [
      { captureType: 'Photo', count: 8500 },
      { captureType: 'Note', count: 3750 },
      { captureType: 'Voice', count: 1750 },
      { captureType: 'Location', count: 1250 }
    ],
    
    mobileNavigationPatterns: generateHeatMapData(
      ['Home', 'Timeline', 'Budget', 'Community', 'Profile', 'Search'],
      ['Home', 'Timeline', 'Budget', 'Community', 'Profile', 'Search'],
      'frequency'
    ),
    
    locationServicesUsage: [
      { actionType: 'Current Location', count: 7500 },
      { actionType: 'Nearby Search', count: 5250 },
      { actionType: 'Directions', count: 4500 },
      { actionType: 'Check-in', count: 3750 },
      { actionType: 'Location Sharing', count: 2250 }
    ],
    
    offlineVsOnlineUsage: generateMultiTimeSeriesData(
      30,
      ['online', 'offline'],
      [800, 100],
      [1000, 250]
    ),
    
    mobileInsights: [
      {
        title: 'PWA adoption accelerating',
        description: 'PWA installations have increased by 28.7%, with 48% retention after 90 days.',
        trend: 'up'
      },
      {
        title: 'Offline usage growing',
        description: 'Offline usage has grown by 150% following the implementation of enhanced offline capabilities.',
        trend: 'up'
      },
      {
        title: 'Photo quick captures dominate',
        description: 'Photo captures account for 56% of all quick captures, with highest satisfaction scores.',
        trend: 'up'
      },
      {
        title: 'Location services drive engagement',
        description: 'Users who enable location services have 2.8x higher engagement and 3.2x higher retention.',
        trend: 'up'
      }
    ]
  };
}

/**
 * Generate time series data for charts
 * 
 * @param {number} days - Number of days to generate data for
 * @param {string} valueKey - Key for the value
 * @param {number} minValue - Minimum value
 * @param {number} maxValue - Maximum value
 * @returns {Array} Time series data
 */
function generateTimeSeriesData(days, valueKey, minValue, maxValue) {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    data.push({
      date: date.toISOString().split('T')[0],
      [valueKey]: value
    });
  }
  
  return data;
}

/**
 * Generate multi-series time series data for charts
 * 
 * @param {number} days - Number of days to generate data for
 * @param {Array} valueKeys - Keys for the values
 * @param {Array} minValues - Minimum values for each key
 * @param {Array} maxValues - Maximum values for each key
 * @returns {Array} Multi-series time series data
 */
function generateMultiTimeSeriesData(days, valueKeys, minValues, maxValues) {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const dataPoint = {
      date: date.toISOString().split('T')[0]
    };
    
    valueKeys.forEach((key, index) => {
      const minValue = minValues[index];
      const maxValue = maxValues[index];
      dataPoint[key] = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    });
    
    data.push(dataPoint);
  }
  
  return data;
}

/**
 * Generate heat map data for charts
 * 
 * @param {Array} xValues - Values for x-axis
 * @param {Array} yValues - Values for y-axis
 * @param {string} valueKey - Key for the value
 * @returns {Array} Heat map data
 */
function generateHeatMapData(xValues, yValues, valueKey) {
  const data = [];
  
  for (const y of yValues) {
    for (const x of xValues) {
      data.push({
        [xValues[0] === 'Mon' ? 'day' : 'x']: x,
        [yValues[0] === 'Timeline' ? 'feature' : 'y']: y,
        [valueKey]: Math.floor(Math.random() * 100)
      });
    }
  }
  
  return data;
}

export default {
  fetchAnalyticsData
};
