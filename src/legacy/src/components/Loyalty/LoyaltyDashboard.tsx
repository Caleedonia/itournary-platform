import React, { useState, useEffect } from 'react';
import styles from './loyaltyDashboard.module.css';
import { TierLevel } from '@/app/api/loyalty/schema';

interface LoyaltyProfileData {
  userId: string;
  currentTier: TierLevel;
  currentPoints: number;
  lifetimePoints: number;
  pointsToNextTier: number;
  tierProgressPercentage: number;
  referralCode: string;
  referralCount: number;
  completedExperiences: number;
}

interface TierProgressData {
  points: { current: number; required: number; percentage: number };
  experiences: { current: number; required: number; percentage: number };
  referrals: { current: number; required: number; percentage: number };
}

interface TierData {
  tierId: string;
  tierName: string;
  tierLevel: TierLevel;
  pointsRequired: number;
  experiencesRequired: number;
  referralsRequired: number;
  pointsMultiplier: number;
  benefits: string[];
  exclusiveRewards: string[];
}

const LoyaltyDashboard: React.FC = () => {
  const [profile, setProfile] = useState<LoyaltyProfileData | null>(null);
  const [currentTier, setCurrentTier] = useState<TierData | null>(null);
  const [nextTier, setNextTier] = useState<TierData | null>(null);
  const [tierProgress, setTierProgress] = useState<TierProgressData | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user ID for development
  const userId = 'user-123';

  useEffect(() => {
    // Fetch user profile and tier information
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be actual API calls
        // For now, we'll simulate the responses
        
        // Simulate profile data
        const mockProfile: LoyaltyProfileData = {
          userId: 'user-123',
          currentTier: TierLevel.VOYAGER,
          currentPoints: 2500,
          lifetimePoints: 3200,
          pointsToNextTier: 1800,
          tierProgressPercentage: 64,
          referralCode: 'FRIEND123',
          referralCount: 2,
          completedExperiences: 3
        };
        
        // Simulate tier data
        const mockCurrentTier: TierData = {
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
        };
        
        const mockNextTier: TierData = {
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
        };
        
        // Simulate tier progress
        const mockTierProgress: TierProgressData = {
          points: {
            current: 3200,
            required: 5000,
            percentage: 64
          },
          experiences: {
            current: 3,
            required: 3,
            percentage: 100
          },
          referrals: {
            current: 2,
            required: 2,
            percentage: 100
          }
        };
        
        // Simulate recent transactions
        const mockTransactions = [
          {
            transactionId: 'tx-001',
            actionType: 'COMPLETE_EXPERIENCE',
            pointsEarned: 500,
            multiplier: 1.2,
            totalPoints: 600,
            description: 'Completed experience: Summer Family Reunion',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            transactionId: 'tx-002',
            actionType: 'SHARE_STORY',
            pointsEarned: 150,
            multiplier: 1.2,
            totalPoints: 180,
            description: 'Shared story: Our Amazing Beach Wedding',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          },
          {
            transactionId: 'tx-003',
            actionType: 'REFER_FRIEND',
            pointsEarned: 500,
            multiplier: 1.2,
            totalPoints: 600,
            description: 'Referred a friend: Sarah Johnson',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          }
        ];
        
        setProfile(mockProfile);
        setCurrentTier(mockCurrentTier);
        setNextTier(mockNextTier);
        setTierProgress(mockTierProgress);
        setRecentTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching loyalty data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your Journey Collective status...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1>Journey Collective</h1>
        <p className={styles.tagline}>Your travel loyalty program that rewards meaningful experiences</p>
      </div>
      
      <div className={styles.tierBanner}>
        <div className={styles.tierInfo}>
          <h2>{currentTier?.tierName} Status</h2>
          <div className={styles.pointsDisplay}>
            <span className={styles.currentPoints}>{profile?.currentPoints}</span>
            <span className={styles.pointsLabel}>Current Points</span>
          </div>
        </div>
        
        <div className={styles.tierProgress}>
          <div className={styles.progressLabel}>
            <span>Progress to {nextTier?.tierName}</span>
            <span>{tierProgress?.points.current} / {tierProgress?.points.required} points</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${tierProgress?.points.percentage || 0}%` }}
            ></div>
          </div>
          <div className={styles.progressDetails}>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>Experiences</span>
              <div className={styles.progressBarSmall}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${tierProgress?.experiences.percentage || 0}%` }}
                ></div>
              </div>
              <span className={styles.progressValue}>
                {tierProgress?.experiences.current}/{tierProgress?.experiences.required}
              </span>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>Referrals</span>
              <div className={styles.progressBarSmall}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${tierProgress?.referrals.percentage || 0}%` }}
                ></div>
              </div>
              <span className={styles.progressValue}>
                {tierProgress?.referrals.current}/{tierProgress?.referrals.required}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.multiplierBadge}>
          <span className={styles.multiplierValue}>{currentTier?.pointsMultiplier}x</span>
          <span className={styles.multiplierLabel}>Points Multiplier</span>
        </div>
      </div>
      
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'rewards' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            Rewards
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'tiers' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tiers')}
          >
            Tier Benefits
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'history' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Points History
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.statsCards}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{profile?.lifetimePoints}</div>
                  <div className={styles.statLabel}>Lifetime Points</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{profile?.completedExperiences}</div>
                  <div className={styles.statLabel}>Completed Experiences</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{profile?.referralCount}</div>
                  <div className={styles.statLabel}>Successful Referrals</div>
                </div>
              </div>
              
              <div className={styles.recentActivitySection}>
                <h3>Recent Activity</h3>
                <div className={styles.transactionsList}>
                  {recentTransactions.map(transaction => (
                    <div key={transaction.transactionId} className={styles.transactionItem}>
                      <div className={styles.transactionInfo}>
                        <div className={styles.transactionDescription}>{transaction.description}</div>
                        <div className={styles.transactionDate}>
                          {transaction.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                      <div className={styles.transactionPoints}>
                        +{transaction.totalPoints} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.referralSection}>
                <h3>Refer Friends & Earn Points</h3>
                <p>Share your referral code and earn 500 points for each friend who joins!</p>
                <div className={styles.referralCode}>
                  <span>{profile?.referralCode}</span>
                  <button className={styles.copyButton}>Copy</button>
                </div>
                <div className={styles.shareButtons}>
                  <button className={styles.shareButton}>Share via Email</button>
                  <button className={styles.shareButton}>Share via WhatsApp</button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'rewards' && (
            <div className={styles.rewardsTab}>
              <h3>Available Rewards</h3>
              <div className={styles.rewardsFilter}>
                <select className={styles.filterDropdown}>
                  <option value="all">All Rewards</option>
                  <option value="experiences">Experiences</option>
                  <option value="travel">Travel</option>
                  <option value="sustainability">Sustainability</option>
                </select>
                <div className={styles.sortOptions}>
                  <span>Sort by:</span>
                  <button className={styles.sortButton}>Newest</button>
                  <button className={`${styles.sortButton} ${styles.activeSort}`}>Points: Low to High</button>
                  <button className={styles.sortButton}>Points: High to Low</button>
                </div>
              </div>
              
              <div className={styles.rewardsList}>
                <div className={styles.rewardCard}>
                  <div className={styles.rewardImage}></div>
                  <div className={styles.rewardCategory}>Micro-Experience</div>
                  <h4 className={styles.rewardTitle}>Virtual Cooking Class: Italian Cuisine</h4>
                  <p className={styles.rewardDescription}>
                    Learn to cook authentic Italian dishes with a professional chef from Florence.
                  </p>
                  <div className={styles.rewardFooter}>
                    <span className={styles.rewardPoints}>1,500 points</span>
                    <button className={styles.redeemButton}>Redeem</button>
                  </div>
                </div>
                
                <div className={styles.rewardCard}>
                  <div className={styles.rewardImage}></div>
                  <div className={styles.rewardCategory}>Local Experience</div>
                  <h4 className={styles.rewardTitle}>Guided Food Tour: Hidden Gems</h4>
                  <p className={styles.rewardDescription}>
                    Discover local culinary treasures with a 3-hour guided food tour in your city.
                  </p>
                  <div className={styles.rewardFooter}>
                    <span className={styles.rewardPoints}>3,500 points</span>
                    <button className={styles.redeemButton}>Redeem</button>
                  </div>
                </div>
                
                <div className={styles.rewardCard}>
                  <div className={styles.rewardImage}></div>
                  <div className={styles.rewardCategory}>Sustainability</div>
                  <h4 className={styles.rewardTitle}>Carbon Offset Package</h4>
                  <p className={styles.rewardDescription}>
                    Offset your travel carbon footprint with certified carbon credits.
                  </p>
                  <div className={styles.rewardFooter}>
                    <span className={styles.rewardPoints}>2,000 points</span>
                    <button className={styles.redeemButton}>Redeem</button>
                  </div>
                </div>
                
                <div className={styles.rewardCard}>
                  <div className={styles.rewardImage}></div>
                  <div className={styles.rewardCategory}>Travel</div>
                  <h4 className={styles.rewardTitle}>Hotel Room Upgrade</h4>
                  <p className={styles.rewardDescription}>
                    Upgrade your next hotel stay to a premium room or suite.
                  </p>
                  <div className={styles.rewardFooter}>
                    <span className={styles.rewardPoints}>5,000 points</span>
                    <button className={styles.redeemButton}>Redeem</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tiers' && (
            <div className={styles.tiersTab}>
              <h3>Journey Collective Tier Benefits</h3>
              <div className={styles.tiersList}>
                <div className={`${styles.tierCard} ${currentTier?.tierLevel === TierLevel.EXPLORER ? styles.currentTierCard : ''}`}>
                  <div className={styles.tierHeader}>
                    <h4>Explorer</h4>
                    {currentTier?.tierLevel === TierLevel.EXPLORER && (
                      <span className={styles.currentTierBadge}>Current</span>
                    )}
                  </div>
                  <div className={styles.tierRequirements}>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Points:</span>
                      <span className={styles.requirementValue}>0</span>
                    </div>
                  </div>
                  <ul className={styles.benefitsList}>
                    <li>Basic planning tools and community access</li>
                    <li>Digital "Journey Passport" to track experiences</li>
                    <li>Access to curated occasion templates</li>
                    <li>Sustainability impact tracker</li>
                  </ul>
                </div>
                
                <div className={`${styles.tierCard} ${currentTier?.tierLevel === TierLevel.VOYAGER ? styles.currentTierCard : ''}`}>
                  <div className={styles.tierHeader}>
                    <h4>Voyager</h4>
                    {currentTier?.tierLevel === TierLevel.VOYAGER && (
                      <span className={styles.currentTierBadge}>Current</span>
                    )}
                  </div>
                  <div className={styles.tierRequirements}>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Points:</span>
                      <span className={styles.requirementValue}>1,000</span>
                    </div>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Experiences:</span>
                      <span className={styles.requirementValue}>1</span>
                    </div>
                  </div>
                  <ul className={styles.benefitsList}>
                    <li>All Explorer benefits</li>
                    <li>Exclusive templates and partner perks</li>
                    <li>Monthly "Micro-Experience" rewards</li>
                    <li>Personalized occasion recommendations</li>
                    <li>Carbon offset options for travel plans</li>
                  </ul>
                </div>
                
                <div className={`${styles.tierCard} ${currentTier?.tierLevel === TierLevel.NAVIGATOR ? styles.currentTierCard : ''}`}>
                  <div className={styles.tierHeader}>
                    <h4>Navigator</h4>
                    {currentTier?.tierLevel === TierLevel.NAVIGATOR && (
                      <span className={styles.currentTierBadge}>Current</span>
                    )}
                  </div>
                  <div className={styles.tierRequirements}>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Points:</span>
                      <span className={styles.requirementValue}>5,000</span>
                    </div>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Experiences:</span>
                      <span className={styles.requirementValue}>3</span>
                    </div>
                    <div className={styles.tierRequirement}>
                      <span className={styles.requirementLabel}>Referrals:</span>
                      <span className={styles.requirementValue}>2</span>
                    </div>
                  </div>
                  <ul className={styles.benefitsList}>
                    <li>All Voyager benefits</li>
                    <li>Priority support and early access to features</li>
                    <li>Quarterly "Local Experience" rewards</li>
                    <li>AI-powered personalization engine</li>
                    <li>Exclusive community forums access</li>
                    <li>Sustainable travel partner discounts</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.viewAllTiersLink}>
                <a href="#">View all 5 tiers</a>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className={styles.historyTab}>
              <h3>Points History</h3>
              <div className={styles.historyFilters}>
                <div className={styles.dateFilter}>
                  <label>Date Range:</label>
                  <select className={styles.filterDropdown}>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="year">Last Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                <div className={styles.categoryFilter}>
                  <label>Category:</label>
                  <select className={styles.filterDropdown}>
                    <option value="all">All Categories</option>
                    <option value="planning">Planning</option>
                    <option value="community">Community</option>
                    <option value="completion">Completion</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.historyTable}>
                <div className={styles.historyTableHeader}>
                  <div className={styles.historyHeaderCell}>Date</div>
                  <div className={styles.historyHeaderCell}>Activity</div>
                  <div className={styles.historyHeaderCell}>Base Points</div>
                  <div className={styles.historyHeaderCell}>Multiplier</div>
                  <div className={styles.historyHeaderCell}>Total</div>
                </div>
                
                <div className={styles.historyTableBody}>
                  {recentTransactions.map(transaction => (
                    <div key={transaction.transactionId} className={styles.historyRow}>
                      <div className={styles.historyCell}>
                        {transaction.timestamp.toLocaleDateString()}
                      </div>
                      <div className={styles.historyCell}>
                        {transaction.description}
                      </div>
                      <div className={styles.historyCell}>
                        {transaction.pointsEarned}
                      </div>
                      <div className={styles.historyCell}>
                        {transaction.multiplier}x
                      </div>
                      <div className={styles.historyCell}>
                        +{transaction.totalPoints}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.paginationControls}>
                <button className={styles.paginationButton} disabled>Previous</button>
                <span className={styles.paginationInfo}>Page 1 of 1</span>
                <button className={styles.paginationButton} disabled>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;
