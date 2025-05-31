import React, { useState, useEffect } from 'react';
import styles from './rewardsCatalog.module.css';
import { Reward, getFilteredRewards, getPartnerById } from './partnerRewardsData';
import { RewardType, ExperienceCategory, TierLevel } from '@/app/api/loyalty/schema';

interface RewardsCatalogProps {
  userTier?: TierLevel;
  userPoints?: number;
}

const RewardsCatalog: React.FC<RewardsCatalogProps> = ({
  userTier = TierLevel.EXPLORER,
  userPoints = 0
}) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedType, setSelectedType] = useState<RewardType | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  
  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Fetch rewards data
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would be an API call
        // For now, we'll use the mock data directly
        const mockRewardsData = await import('./partnerRewardsData').then(module => module.mockRewards);
        
        setRewards(mockRewardsData);
        setFilteredRewards(mockRewardsData);
      } catch (err) {
        console.error('Error fetching rewards:', err);
        setError('Failed to load rewards catalog.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRewards();
  }, []);
  
  // Apply filters when any filter changes
  useEffect(() => {
    if (rewards.length === 0) return;
    
    let filtered = [...rewards];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reward => 
        reward.title.toLowerCase().includes(term) || 
        reward.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by reward type
    if (selectedType) {
      filtered = filtered.filter(reward => reward.rewardType === selectedType);
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(reward => reward.category === selectedCategory);
    }
    
    // Filter by availability
    if (showOnlyAvailable) {
      filtered = filtered.filter(reward => reward.available);
    }
    
    // Filter by user's tier level
    filtered = filtered.filter(reward => {
      const tierLevels = Object.values(TierLevel);
      const rewardTierIndex = tierLevels.indexOf(reward.tierRequired);
      const userTierIndex = tierLevels.indexOf(userTier);
      return rewardTierIndex <= userTierIndex;
    });
    
    setFilteredRewards(filtered);
  }, [rewards, searchTerm, selectedType, selectedCategory, showOnlyAvailable, userTier]);
  
  // Format point cost
  const formatPoints = (points: number): string => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " pts";
  };
  
  // Get badge text based on tier required
  const getTierBadge = (tier: TierLevel): JSX.Element => {
    let color = '';
    
    switch (tier) {
      case TierLevel.EXPLORER:
        color = 'bg-slate-100 text-slate-800';
        break;
      case TierLevel.VOYAGER:
        color = 'bg-blue-100 text-blue-800';
        break;
      case TierLevel.NAVIGATOR:
        color = 'bg-teal-100 text-teal-800';
        break;
      case TierLevel.PIONEER:
        color = 'bg-purple-100 text-purple-800';
        break;
      case TierLevel.LUMINARY:
        color = 'bg-amber-100 text-amber-800';
        break;
      default:
        color = 'bg-slate-100 text-slate-800';
    }
    
    return (
      <span className={`${color} text-xs font-medium px-2 py-1 rounded-full`}>
        {tier} Tier
      </span>
    );
  };
  
  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading rewards catalog...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.rewardsCatalog}>
      <div className={styles.filtersBar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        
        <div className={styles.filters}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as RewardType | '')}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            {Object.values(RewardType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ExperienceCategory | '')}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {Object.values(ExperienceCategory).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              className="mr-2"
            />
            <span>Show available only</span>
          </label>
        </div>
        
        <div className={styles.viewToggle}>
          <button 
            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100' : 'bg-gray-100'}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button 
            className={`p-2 ${viewMode === 'list' ? 'bg-blue-100' : 'bg-gray-100'}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.resultsCount}>
        {filteredRewards.length} {filteredRewards.length === 1 ? 'reward' : 'rewards'} found
      </div>
      
      {filteredRewards.length === 0 ? (
        <div className={styles.noResults}>
          <p>No rewards match your criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? styles.rewardsGrid : styles.rewardsList}>
          {filteredRewards.map(reward => {
            const partner = getPartnerById(reward.partnerId);
            const isAffordable = userPoints >= reward.pointsCost;
            
            // Fix by adding this line - ensure the reward has a limitedQuantity property
            const isLimited = reward.limitedQuantity || false;
            
            return (
              <div key={reward.id} className={viewMode === 'grid' ? styles.rewardCard : styles.rewardRow}>
                <div className={styles.rewardImage}>
                  <img 
                    src={reward.image || 'https://placehold.co/300x200?text=Reward'} 
                    alt={reward.title}
                  />
                  {reward.featured && <span className={styles.featuredBadge}>Featured</span>}
                  {isLimited && <span className={styles.limitedBadge}>Limited</span>}
                </div>
                
                <div className={styles.rewardContent}>
                  <div className={styles.rewardHeader}>
                    <h3 className={styles.rewardTitle}>{reward.title}</h3>
                    <div className={styles.partnerInfo}>
                      By {partner?.name || 'Partner'}
                    </div>
                  </div>
                  
                  <p className={styles.rewardDescription}>
                    {reward.description}
                  </p>
                  
                  <div className={styles.rewardMeta}>
                    <div className={styles.pointsCost}>
                      <span className={isAffordable ? styles.affordable : styles.notAffordable}>
                        {formatPoints(reward.pointsCost)}
                      </span>
                      {reward.cashValue && (
                        <span className={styles.cashValue}>
                          + ${reward.cashValue}
                        </span>
                      )}
                    </div>
                    
                    <div className={styles.badges}>
                      {getTierBadge(reward.tierRequired)}
                      <span className={`bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full`}>
                        {reward.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.rewardActions}>
                    <button 
                      className={`${isAffordable ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-300 cursor-not-allowed'} text-white px-4 py-2 rounded`}
                      disabled={!isAffordable}
                    >
                      {isAffordable ? 'Redeem' : 'Not Enough Points'}
                    </button>
                    
                    {!isAffordable && (
                      <span className={styles.pointsNeeded}>
                        You need {formatPoints(reward.pointsCost - userPoints)} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RewardsCatalog;
