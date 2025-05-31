import React, { useState, useEffect } from 'react';
import styles from './aiPersonalization.module.css';
import { ActionType } from '@/app/api/loyalty/schema';

interface UserPreference {
  category: string;
  weight: number;
}

interface PersonalizedRecommendation {
  id: string;
  type: 'reward' | 'quest' | 'partner' | 'activity';
  title: string;
  description: string;
  relevanceScore: number;
  imageUrl?: string;
  pointsValue?: number;
  expiresAt?: Date;
}

interface AIPersonalizationProps {
  userId: string;
  currentTier: string;
  onRecommendationSelect: (recommendation: PersonalizedRecommendation) => void;
}

const AIPersonalization: React.FC<AIPersonalizationProps> = ({
  userId,
  currentTier,
  onRecommendationSelect
}) => {
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [insightMode, setInsightMode] = useState<'rewards' | 'activities' | 'insights'>('rewards');

  // Fetch user preferences and generate recommendations
  useEffect(() => {
    const fetchPersonalizedData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // For now, we'll simulate the responses
        
        // Simulate user preferences based on past behavior
        const mockPreferences: UserPreference[] = [
          { category: 'culinary', weight: 0.8 },
          { category: 'adventure', weight: 0.6 },
          { category: 'sustainability', weight: 0.9 },
          { category: 'cultural', weight: 0.5 },
          { category: 'wellness', weight: 0.3 }
        ];
        
        // Simulate personalized recommendations
        const mockRecommendations: PersonalizedRecommendation[] = [
          {
            id: 'rec-001',
            type: 'reward',
            title: 'Farm-to-Table Cooking Experience',
            description: 'Based on your interest in culinary experiences and sustainability, we think you\'ll love this hands-on cooking class using locally-sourced ingredients.',
            relevanceScore: 0.95,
            imageUrl: '/recommendations/cooking-class.jpg',
            pointsValue: 3000
          },
          {
            id: 'rec-002',
            type: 'quest',
            title: 'Eco-Explorer Challenge',
            description: 'Complete 3 sustainability-focused activities to earn bonus points and unlock a special badge.',
            relevanceScore: 0.88,
            imageUrl: '/recommendations/eco-explorer.jpg',
            pointsValue: 500,
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
          },
          {
            id: 'rec-003',
            type: 'partner',
            title: 'EcoTravel Adventures Discount',
            description: 'Our sustainability partner is offering you a special 15% discount on their experiences based on your preferences.',
            relevanceScore: 0.85,
            imageUrl: '/recommendations/eco-travel.jpg'
          },
          {
            id: 'rec-004',
            type: 'activity',
            title: 'Document Your Adventure Memories',
            description: 'We noticed you haven\'t created a memory book for your recent hiking trip. Capture those moments now!',
            relevanceScore: 0.82,
            imageUrl: '/recommendations/memory-book.jpg',
            pointsValue: 200
          }
        ];
        
        setUserPreferences(mockPreferences);
        setRecommendations(mockRecommendations);
      } catch (error) {
        console.error('Error fetching personalized data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonalizedData();
  }, [userId]);

  // Sort preferences by weight (highest first)
  const sortedPreferences = [...userPreferences].sort((a, b) => b.weight - a.weight);
  
  // Filter recommendations based on selected mode
  const filteredRecommendations = recommendations.filter(rec => {
    if (insightMode === 'rewards') return rec.type === 'reward' || rec.type === 'partner';
    if (insightMode === 'activities') return rec.type === 'activity' || rec.type === 'quest';
    return true; // 'insights' mode shows all
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Personalizing your experience...</p>
      </div>
    );
  }

  return (
    <div className={styles.personalizationContainer}>
      <div className={styles.personalizationHeader}>
        <h2>Personalized For You</h2>
        <p className={styles.aiPowered}>AI-powered recommendations based on your preferences and behavior</p>
      </div>
      
      <div className={styles.preferencesSection}>
        <h3>Your Interest Profile</h3>
        <div className={styles.preferenceBars}>
          {sortedPreferences.map(pref => (
            <div key={pref.category} className={styles.preferenceBar}>
              <span className={styles.preferenceLabel}>{pref.category}</span>
              <div className={styles.preferenceBarContainer}>
                <div 
                  className={styles.preferenceBarFill} 
                  style={{ width: `${pref.weight * 100}%` }}
                ></div>
              </div>
              <span className={styles.preferenceValue}>{Math.round(pref.weight * 100)}%</span>
            </div>
          ))}
        </div>
        <button className={styles.updatePreferencesButton}>Update Preferences</button>
      </div>
      
      <div className={styles.recommendationsSection}>
        <div className={styles.recommendationsTabs}>
          <button 
            className={`${styles.tabButton} ${insightMode === 'rewards' ? styles.activeTab : ''}`}
            onClick={() => setInsightMode('rewards')}
          >
            Reward Recommendations
          </button>
          <button 
            className={`${styles.tabButton} ${insightMode === 'activities' ? styles.activeTab : ''}`}
            onClick={() => setInsightMode('activities')}
          >
            Activity Suggestions
          </button>
          <button 
            className={`${styles.tabButton} ${insightMode === 'insights' ? styles.activeTab : ''}`}
            onClick={() => setInsightMode('insights')}
          >
            All Insights
          </button>
        </div>
        
        <div className={styles.recommendationsList}>
          {filteredRecommendations.length === 0 ? (
            <div className={styles.noRecommendations}>
              <p>No personalized recommendations available at this time. Continue using the platform to receive tailored suggestions.</p>
            </div>
          ) : (
            filteredRecommendations.map(recommendation => (
              <div 
                key={recommendation.id} 
                className={styles.recommendationCard}
                onClick={() => onRecommendationSelect(recommendation)}
              >
                <div className={styles.recommendationHeader}>
                  <div className={styles.recommendationType}>{recommendation.type}</div>
                  <div className={styles.recommendationRelevance}>
                    <span className={styles.relevanceLabel}>Match</span>
                    <span className={styles.relevanceScore}>{Math.round(recommendation.relevanceScore * 100)}%</span>
                  </div>
                </div>
                
                <h4 className={styles.recommendationTitle}>{recommendation.title}</h4>
                <p className={styles.recommendationDescription}>{recommendation.description}</p>
                
                <div className={styles.recommendationFooter}>
                  {recommendation.pointsValue && (
                    <div className={styles.pointsValue}>
                      {recommendation.pointsValue} points
                    </div>
                  )}
                  
                  {recommendation.expiresAt && (
                    <div className={styles.expiryInfo}>
                      Expires in {Math.ceil((recommendation.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  )}
                  
                  <button className={styles.actionButton}>
                    {recommendation.type === 'reward' ? 'View Reward' : 
                     recommendation.type === 'quest' ? 'Start Quest' :
                     recommendation.type === 'partner' ? 'View Offer' : 'Take Action'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPersonalization;
