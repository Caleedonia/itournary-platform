import { RewardType, ExperienceCategory, TierLevel } from '@/app/api/loyalty/schema';

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo?: string; // URL to logo image
  website?: string;
  exchangeRate?: number; // Points per dollar value
}

export interface Reward {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  image?: string; // URL to image
  pointsCost: number;
  cashValue?: number; // For split-tender options
  rewardType: RewardType;
  category: ExperienceCategory;
  redemptionUrl?: string;
  tierRequired: TierLevel;
  available: boolean;
  limitedQuantity?: boolean;
  featured?: boolean;
  tags?: string[];
}

// Mock partners data
export const partners: Partner[] = [
  {
    id: 'partner1',
    name: 'Global Adventures',
    description: 'Adventure travel specialists with worldwide destinations.',
    logo: 'https://placehold.co/200x100?text=Global+Adventures',
    website: 'https://example.com/global-adventures',
    exchangeRate: 100
  },
  {
    id: 'partner2',
    name: 'Luxury Stays',
    description: 'Premium hotel and resort accommodation network.',
    logo: 'https://placehold.co/200x100?text=Luxury+Stays',
    website: 'https://example.com/luxury-stays',
    exchangeRate: 120
  },
  {
    id: 'partner3',
    name: 'EcoTours',
    description: 'Sustainable and eco-friendly tour experiences.',
    logo: 'https://placehold.co/200x100?text=EcoTours',
    website: 'https://example.com/ecotours',
    exchangeRate: 90
  },
  {
    id: 'partner4',
    name: 'Cultural Immersion',
    description: 'Deep dive into local cultures and traditions.',
    logo: 'https://placehold.co/200x100?text=Cultural+Immersion',
    website: 'https://example.com/cultural-immersion',
    exchangeRate: 110
  },
  {
    id: 'partner5',
    name: 'Wellness Retreats',
    description: 'Rejuvenating wellness and mindfulness experiences.',
    logo: 'https://placehold.co/200x100?text=Wellness+Retreats',
    website: 'https://example.com/wellness-retreats',
    exchangeRate: 130
  }
];

// Mock rewards data
export const mockRewards: Reward[] = [
  // Micro Experiences
  {
    id: 'reward1',
    partnerId: 'partner1',
    title: 'Historic City Tour',
    description: 'A guided 3-hour tour of historical landmarks and hidden gems.',
    image: 'https://placehold.co/300x200?text=City+Tour',
    pointsCost: 2500,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.CITY_EXPLORATION,
    tierRequired: TierLevel.EXPLORER,
    available: true,
    tags: ['guided', 'history', 'walking']
  },
  {
    id: 'reward2',
    partnerId: 'partner3',
    title: 'Forest Hiking Adventure',
    description: 'Half-day guided hike through pristine forest trails.',
    image: 'https://placehold.co/300x200?text=Hiking',
    pointsCost: 3000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.NATURE,
    tierRequired: TierLevel.EXPLORER,
    available: true,
    tags: ['outdoors', 'hiking', 'nature']
  },
  
  // Local Experiences
  {
    id: 'reward3',
    partnerId: 'partner2',
    title: 'Luxury Spa Day',
    description: 'Full day of relaxation with premium spa treatments.',
    image: 'https://placehold.co/300x200?text=Spa+Day',
    pointsCost: 7500,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.WELLNESS,
    tierRequired: TierLevel.VOYAGER,
    available: true,
    featured: true,
    tags: ['relaxation', 'wellness', 'luxury']
  },
  {
    id: 'reward4',
    partnerId: 'partner4',
    title: 'Local Cooking Class',
    description: 'Learn to prepare authentic local dishes with expert chefs.',
    image: 'https://placehold.co/300x200?text=Cooking+Class',
    pointsCost: 5000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.CULINARY,
    tierRequired: TierLevel.VOYAGER,
    available: true,
    tags: ['cooking', 'local', 'culinary']
  },
  
  // Signature Experiences
  {
    id: 'reward5',
    partnerId: 'partner1',
    title: 'Hot Air Balloon Ride',
    description: 'Sunrise hot air balloon journey over scenic landscapes.',
    image: 'https://placehold.co/300x200?text=Balloon+Ride',
    pointsCost: 15000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.ADVENTURE,
    tierRequired: TierLevel.NAVIGATOR,
    available: true,
    limitedQuantity: true,
    featured: true,
    tags: ['aerial', 'adventure', 'unique']
  },
  {
    id: 'reward6',
    partnerId: 'partner5',
    title: 'Meditation Retreat Weekend',
    description: 'Two-day wellness retreat focused on mindfulness and meditation.',
    image: 'https://placehold.co/300x200?text=Meditation+Retreat',
    pointsCost: 12000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.WELLNESS,
    tierRequired: TierLevel.NAVIGATOR,
    available: true,
    tags: ['mindfulness', 'wellness', 'retreat']
  },
  
  // Transformative Experiences
  {
    id: 'reward7',
    partnerId: 'partner3',
    title: 'Eco Safari Adventure',
    description: 'Week-long sustainable safari experience with wildlife conservation activities.',
    image: 'https://placehold.co/300x200?text=Eco+Safari',
    pointsCost: 30000,
    cashValue: 500,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.WILDLIFE,
    tierRequired: TierLevel.PIONEER,
    available: true,
    limitedQuantity: true,
    featured: true,
    tags: ['wildlife', 'conservation', 'safari']
  },
  {
    id: 'reward8',
    partnerId: 'partner4',
    title: 'Cultural Immersion Program',
    description: 'Ten-day immersive stay with a local family learning traditions and customs.',
    image: 'https://placehold.co/300x200?text=Cultural+Immersion',
    pointsCost: 25000,
    cashValue: 400,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.CULTURAL,
    tierRequired: TierLevel.PIONEER,
    available: true,
    tags: ['cultural', 'immersion', 'authentic']
  },
  
  // Luminary Experiences
  {
    id: 'reward9',
    partnerId: 'partner2',
    title: 'Private Island Getaway',
    description: 'Exclusive three-night stay on a private island with personal chef and activities.',
    image: 'https://placehold.co/300x200?text=Private+Island',
    pointsCost: 75000,
    cashValue: 2000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.LUXURY,
    tierRequired: TierLevel.LUMINARY,
    available: true,
    limitedQuantity: true,
    featured: true,
    tags: ['exclusive', 'luxury', 'island']
  },
  {
    id: 'reward10',
    partnerId: 'partner1',
    title: 'Antarctic Expedition',
    description: 'Once-in-a-lifetime journey to Antarctica with expert guides and researchers.',
    image: 'https://placehold.co/300x200?text=Antarctic+Expedition',
    pointsCost: 100000,
    cashValue: 5000,
    rewardType: RewardType.PHYSICAL_REWARD,
    category: ExperienceCategory.ADVENTURE,
    tierRequired: TierLevel.LUMINARY,
    available: true,
    limitedQuantity: true,
    featured: true,
    tags: ['expedition', 'wilderness', 'unique']
  },
  
  // Digital Rewards
  {
    id: 'reward11',
    partnerId: 'partner5',
    title: 'Premium Travel Guide Bundle',
    description: 'Collection of digital travel guides for top destinations worldwide.',
    image: 'https://placehold.co/300x200?text=Travel+Guides',
    pointsCost: 1000,
    rewardType: RewardType.DIGITAL_REWARD,
    category: ExperienceCategory.EDUCATIONAL,
    redemptionUrl: 'https://example.com/redeem/guides',
    tierRequired: TierLevel.EXPLORER,
    available: true,
    tags: ['digital', 'guides', 'planning']
  },
  {
    id: 'reward12',
    partnerId: 'partner3',
    title: 'Sustainable Travel Course',
    description: 'Online course on environmentally conscious travel practices.',
    image: 'https://placehold.co/300x200?text=Online+Course',
    pointsCost: 2000,
    rewardType: RewardType.DIGITAL_REWARD,
    category: ExperienceCategory.EDUCATIONAL,
    redemptionUrl: 'https://example.com/redeem/course',
    tierRequired: TierLevel.EXPLORER,
    available: true,
    tags: ['course', 'sustainability', 'education']
  }
];

export const getFilteredRewards = (
  rewardType?: RewardType,
  category?: ExperienceCategory,
  tierLevel?: TierLevel,
  partnerId?: string,
  searchTerm?: string,
  maxPoints?: number
): Reward[] => {
  let filteredRewards = [...mockRewards];
  
  // Filter by reward type
  if (rewardType) {
    filteredRewards = filteredRewards.filter(reward => reward.rewardType === rewardType);
  }
  
  // Filter by category
  if (category) {
    filteredRewards = filteredRewards.filter(reward => reward.category === category);
  }
  
  // Filter by tier level
  if (tierLevel) {
    filteredRewards = filteredRewards.filter(reward => {
      const tierLevels = Object.values(TierLevel);
      const rewardTierIndex = tierLevels.indexOf(reward.tierRequired);
      const userTierIndex = tierLevels.indexOf(tierLevel);
      return rewardTierIndex <= userTierIndex;
    });
  }
  
  // Filter by partner
  if (partnerId) {
    filteredRewards = filteredRewards.filter(reward => reward.partnerId === partnerId);
  }
  
  // Filter by search term
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredRewards = filteredRewards.filter(reward => {
      return (
        reward.title.toLowerCase().includes(term) ||
        reward.description.toLowerCase().includes(term) ||
        (reward.tags && reward.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    });
  }
  
  // Filter by max points
  if (maxPoints) {
    filteredRewards = filteredRewards.filter(reward => reward.pointsCost <= maxPoints);
  }
  
  return filteredRewards;
};

export const getPartnerById = (partnerId: string): Partner | undefined => {
  return partners.find(partner => partner.id === partnerId);
};
