import React, { useState, useEffect } from 'react';
import styles from './gamification.module.css';
import { AchievementType, QuestCategory, QuestDifficulty } from '@/app/api/loyalty/schema';

interface Quest {
  questId: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  pointsReward: number;
  progress: number;
  isComplete: boolean;
  expirationDate?: Date;
  iconUrl: string;
}

interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  achievementType: AchievementType;
  earnedDate: Date;
  iconUrl: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

interface GamificationProps {
  userId: string;
  onQuestSelect: (quest: Quest) => void;
  onAchievementSelect: (achievement: Achievement) => void;
}

const Gamification: React.FC<GamificationProps> = ({
  userId,
  onQuestSelect,
  onAchievementSelect
}) => {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quests' | 'achievements'>('quests');
  const [questFilter, setQuestFilter] = useState<QuestCategory | 'all'>('all');
  const [achievementFilter, setAchievementFilter] = useState<AchievementType | 'all'>('all');

  // Fetch quests and achievements
  useEffect(() => {
    const fetchGamificationData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // For now, we'll simulate the responses
        
        // Simulate active quests
        const mockQuests: Quest[] = [
          {
            questId: 'quest-001',
            title: 'Sustainability Champion',
            description: 'Make 3 sustainable choices in your travel planning',
            category: QuestCategory.SUSTAINABILITY,
            difficulty: QuestDifficulty.MEDIUM,
            pointsReward: 500,
            progress: 2,
            isComplete: false,
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            iconUrl: '/quests/sustainability-icon.png'
          },
          {
            questId: 'quest-002',
            title: 'Memory Keeper',
            description: 'Document 5 emotional milestones in your journey',
            category: QuestCategory.EXPLORATION,
            difficulty: QuestDifficulty.EASY,
            pointsReward: 300,
            progress: 3,
            isComplete: false,
            iconUrl: '/quests/memory-icon.png'
          },
          {
            questId: 'quest-003',
            title: 'Community Contributor',
            description: 'Answer 3 questions from other travelers',
            category: QuestCategory.COMMUNITY,
            difficulty: QuestDifficulty.EASY,
            pointsReward: 250,
            progress: 1,
            isComplete: false,
            iconUrl: '/quests/community-icon.png'
          },
          {
            questId: 'quest-004',
            title: 'Budget Master',
            description: 'Complete a full budget plan with at least 10 items',
            category: QuestCategory.PLANNING,
            difficulty: QuestDifficulty.MEDIUM,
            pointsReward: 400,
            progress: 8,
            isComplete: false,
            iconUrl: '/quests/budget-icon.png'
          },
          {
            questId: 'quest-005',
            title: 'Summer Adventure',
            description: 'Plan a summer getaway with at least 3 outdoor activities',
            category: QuestCategory.SEASONAL,
            difficulty: QuestDifficulty.MEDIUM,
            pointsReward: 450,
            progress: 0,
            isComplete: false,
            expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            iconUrl: '/quests/summer-icon.png'
          }
        ];
        
        // Simulate achievements
        const mockAchievements: Achievement[] = [
          {
            achievementId: 'ach-001',
            title: 'First Journey',
            description: 'Created your first experience plan',
            achievementType: AchievementType.EXPERIENCE_MILESTONE,
            earnedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
            iconUrl: '/achievements/first-journey.png',
            rarity: 'common'
          },
          {
            achievementId: 'ach-002',
            title: 'Helpful Guide',
            description: 'Received 10 helpful votes on your contributions',
            achievementType: AchievementType.COMMUNITY_CONTRIBUTION,
            earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            iconUrl: '/achievements/helpful-guide.png',
            rarity: 'uncommon'
          },
          {
            achievementId: 'ach-003',
            title: 'Eco Warrior',
            description: 'Made 5 sustainable choices in your travel plans',
            achievementType: AchievementType.SUSTAINABILITY_CHAMPION,
            earnedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            iconUrl: '/achievements/eco-warrior.png',
            rarity: 'rare'
          },
          {
            achievementId: 'ach-004',
            title: 'Social Butterfly',
            description: 'Successfully referred 3 friends to the platform',
            achievementType: AchievementType.REFERRAL_SUCCESS,
            earnedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            iconUrl: '/achievements/social-butterfly.png',
            rarity: 'uncommon'
          }
        ];
        
        setActiveQuests(mockQuests);
        setAchievements(mockAchievements);
      } catch (error) {
        console.error('Error fetching gamification data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGamificationData();
  }, [userId]);

  // Filter quests based on selected category
  const filteredQuests = questFilter === 'all'
    ? activeQuests
    : activeQuests.filter(quest => quest.category === questFilter);
  
  // Filter achievements based on selected type
  const filteredAchievements = achievementFilter === 'all'
    ? achievements
    : achievements.filter(achievement => achievement.achievementType === achievementFilter);
  
  // Calculate quest completion percentage
  const calculateQuestCompletion = (quest: Quest) => {
    if (quest.isComplete) return 100;
    
    // For quests with progress tracking
    const requirements = quest.description.match(/\d+/);
    if (requirements && requirements.length > 0) {
      const total = parseInt(requirements[0], 10);
      return Math.min(100, Math.round((quest.progress / total) * 100));
    }
    
    return 0;
  };
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };
  
  // Format expiration date
  const formatExpirationDate = (date?: Date) => {
    if (!date) return 'No expiration';
    
    const now = new Date();
    const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return 'Expired';
    if (diffInDays === 0) return 'Expires today';
    if (diffInDays === 1) return 'Expires tomorrow';
    return `Expires in ${diffInDays} days`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your quests and achievements...</p>
      </div>
    );
  }

  return (
    <div className={styles.gamificationContainer}>
      <div className={styles.gamificationHeader}>
        <h2>Journey Quests & Achievements</h2>
        <p className={styles.gamificationTagline}>Complete quests, earn rewards, and showcase your achievements</p>
      </div>
      
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'quests' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('quests')}
          >
            Active Quests
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'achievements' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>
      </div>
      
      {activeTab === 'quests' && (
        <div className={styles.questsTab}>
          <div className={styles.filterBar}>
            <select 
              className={styles.filterDropdown}
              value={questFilter}
              onChange={(e) => setQuestFilter(e.target.value as QuestCategory | 'all')}
            >
              <option value="all">All Categories</option>
              <option value={QuestCategory.PLANNING}>Planning</option>
              <option value={QuestCategory.COMMUNITY}>Community</option>
              <option value={QuestCategory.EXPLORATION}>Exploration</option>
              <option value={QuestCategory.SUSTAINABILITY}>Sustainability</option>
              <option value={QuestCategory.SOCIAL}>Social</option>
              <option value={QuestCategory.SEASONAL}>Seasonal</option>
              <option value={QuestCategory.SPECIAL_EVENT}>Special Event</option>
            </select>
            
            <div className={styles.questCount}>
              {filteredQuests.length} {filteredQuests.length === 1 ? 'Quest' : 'Quests'} Available
            </div>
          </div>
          
          <div className={styles.questsList}>
            {filteredQuests.length === 0 ? (
              <div className={styles.noQuests}>
                <p>No quests available in this category. Check back soon for new challenges!</p>
              </div>
            ) : (
              filteredQuests.map(quest => (
                <div 
                  key={quest.questId} 
                  className={styles.questCard}
                  onClick={() => onQuestSelect(quest)}
                >
                  <div className={styles.questIcon}>
                    {/* In a real implementation, this would be an actual image */}
                    <div className={styles.questIconPlaceholder}></div>
                  </div>
                  
                  <div className={styles.questContent}>
                    <div className={styles.questHeader}>
                      <h3 className={styles.questTitle}>{quest.title}</h3>
                      <div className={styles.questDifficulty} data-difficulty={quest.difficulty}>
                        {quest.difficulty}
                      </div>
                    </div>
                    
                    <p className={styles.questDescription}>{quest.description}</p>
                    
                    <div className={styles.questProgress}>
                      <div className={styles.progressBarContainer}>
                        <div 
                          className={styles.progressBar} 
                          style={{ width: `${calculateQuestCompletion(quest)}%` }}
                        ></div>
                      </div>
                      <div className={styles.progressText}>
                        {quest.progress} / {quest.description.match(/\d+/)?.[0] || '?'}
                      </div>
                    </div>
                    
                    <div className={styles.questFooter}>
                      <div className={styles.questReward}>
                        <span className={styles.rewardValue}>{quest.pointsReward}</span> points
                      </div>
                      
                      {quest.expirationDate && (
                        <div className={styles.questExpiration}>
                          {formatExpirationDate(quest.expirationDate)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'achievements' && (
        <div className={styles.achievementsTab}>
          <div className={styles.filterBar}>
            <select 
              className={styles.filterDropdown}
              value={achievementFilter}
              onChange={(e) => setAchievementFilter(e.target.value as AchievementType | 'all')}
            >
              <option value="all">All Achievements</option>
              <option value={AchievementType.EXPERIENCE_MILESTONE}>Experience Milestones</option>
              <option value={AchievementType.COMMUNITY_CONTRIBUTION}>Community Contributions</option>
              <option value={AchievementType.REFERRAL_SUCCESS}>Referral Success</option>
              <option value={AchievementType.ENGAGEMENT_STREAK}>Engagement Streaks</option>
              <option value={AchievementType.SUSTAINABILITY_CHAMPION}>Sustainability</option>
              <option value={AchievementType.EXPLORER_BADGE}>Explorer Badges</option>
              <option value={AchievementType.SPECIAL_EVENT}>Special Events</option>
            </select>
            
            <div className={styles.achievementCount}>
              {achievements.length} {achievements.length === 1 ? 'Achievement' : 'Achievements'} Earned
            </div>
          </div>
          
          <div className={styles.achievementsList}>
            {filteredAchievements.length === 0 ? (
              <div className={styles.noAchievements}>
                <p>No achievements in this category yet. Keep exploring and completing quests to earn achievements!</p>
              </div>
            ) : (
              filteredAchievements.map(achievement => (
                <div 
                  key={achievement.achievementId} 
                  className={styles.achievementCard}
                  onClick={() => onAchievementSelect(achievement)}
                  data-rarity={achievement.rarity}
                >
                  <div className={styles.achievementIcon}>
                    {/* In a real implementation, this would be an actual image */}
                    <div className={styles.achievementIconPlaceholder}></div>
                  </div>
                  
                  <div className={styles.achievementContent}>
                    <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                    <p className={styles.achievementDescription}>{achievement.description}</p>
                    
                    <div className={styles.achievementFooter}>
                      <div className={styles.achievementDate}>
                        Earned {formatRelativeTime(achievement.earnedDate)}
                      </div>
                      <div className={styles.achievementRarity}>
                        {achievement.rarity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification;
