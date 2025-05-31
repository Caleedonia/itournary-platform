import React, { useState, useEffect } from 'react';
import styles from './sustainabilityFeatures.module.css';

interface SustainabilityAction {
  id: string;
  title: string;
  description: string;
  impactScore: number;
  carbonSaved: number;
  pointsReward: number;
  isCompleted: boolean;
  category: 'transportation' | 'accommodation' | 'activities' | 'food' | 'general';
}

interface SustainabilityImpact {
  totalCarbonSaved: number;
  totalActions: number;
  completedActions: number;
  impactLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  nextMilestone: number;
  progressToNextMilestone: number;
}

interface SustainabilityFeaturesProps {
  userId: string;
  experienceId?: string;
  onActionSelect: (action: SustainabilityAction) => void;
}

const SustainabilityFeatures: React.FC<SustainabilityFeaturesProps> = ({
  userId,
  experienceId,
  onActionSelect
}) => {
  const [sustainabilityActions, setSustainabilityActions] = useState<SustainabilityAction[]>([]);
  const [impact, setImpact] = useState<SustainabilityImpact | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'transportation' | 'accommodation' | 'activities' | 'food' | 'general'>('all');

  // Fetch sustainability data
  useEffect(() => {
    const fetchSustainabilityData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // For now, we'll simulate the responses
        
        // Simulate sustainability actions
        const mockActions: SustainabilityAction[] = [
          {
            id: 'sus-001',
            title: 'Choose Eco-Friendly Accommodation',
            description: 'Select accommodations with green certifications or sustainable practices',
            impactScore: 8.5,
            carbonSaved: 120,
            pointsReward: 200,
            isCompleted: true,
            category: 'accommodation'
          },
          {
            id: 'sus-002',
            title: 'Opt for Public Transportation',
            description: 'Use public transportation instead of private vehicles or taxis',
            impactScore: 7.8,
            carbonSaved: 85,
            pointsReward: 150,
            isCompleted: true,
            category: 'transportation'
          },
          {
            id: 'sus-003',
            title: 'Choose Plant-Based Meals',
            description: 'Select vegetarian or vegan options for at least 50% of your meals',
            impactScore: 9.2,
            carbonSaved: 160,
            pointsReward: 250,
            isCompleted: false,
            category: 'food'
          },
          {
            id: 'sus-004',
            title: 'Support Local Businesses',
            description: 'Choose locally-owned businesses and experiences that benefit the community',
            impactScore: 6.5,
            carbonSaved: 40,
            pointsReward: 100,
            isCompleted: true,
            category: 'activities'
          },
          {
            id: 'sus-005',
            title: 'Minimize Single-Use Plastics',
            description: 'Bring reusable water bottles, bags, and utensils to reduce waste',
            impactScore: 7.0,
            carbonSaved: 30,
            pointsReward: 100,
            isCompleted: false,
            category: 'general'
          },
          {
            id: 'sus-006',
            title: 'Choose Direct Flights',
            description: 'When flying, choose direct routes to reduce carbon emissions from takeoffs and landings',
            impactScore: 8.0,
            carbonSaved: 200,
            pointsReward: 180,
            isCompleted: false,
            category: 'transportation'
          },
          {
            id: 'sus-007',
            title: 'Participate in Conservation Activities',
            description: 'Join local conservation efforts or eco-tours that support environmental protection',
            impactScore: 9.0,
            carbonSaved: 50,
            pointsReward: 220,
            isCompleted: false,
            category: 'activities'
          }
        ];
        
        // Simulate sustainability impact
        const completedActions = mockActions.filter(action => action.isCompleted);
        const totalCarbonSaved = completedActions.reduce((total, action) => total + action.carbonSaved, 0);
        
        const mockImpact: SustainabilityImpact = {
          totalCarbonSaved,
          totalActions: mockActions.length,
          completedActions: completedActions.length,
          impactLevel: totalCarbonSaved > 500 ? 'expert' : 
                      totalCarbonSaved > 300 ? 'advanced' : 
                      totalCarbonSaved > 100 ? 'intermediate' : 'beginner',
          nextMilestone: totalCarbonSaved > 500 ? 1000 : 
                        totalCarbonSaved > 300 ? 500 : 
                        totalCarbonSaved > 100 ? 300 : 100,
          progressToNextMilestone: totalCarbonSaved > 500 ? (totalCarbonSaved / 1000) * 100 : 
                                  totalCarbonSaved > 300 ? (totalCarbonSaved / 500) * 100 : 
                                  totalCarbonSaved > 100 ? (totalCarbonSaved / 300) * 100 : 
                                  (totalCarbonSaved / 100) * 100
        };
        
        setSustainabilityActions(mockActions);
        setImpact(mockImpact);
      } catch (error) {
        console.error('Error fetching sustainability data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSustainabilityData();
  }, [userId, experienceId]);

  // Filter actions based on selected category
  const filteredActions = activeCategory === 'all'
    ? sustainabilityActions
    : sustainabilityActions.filter(action => action.category === activeCategory);
  
  // Calculate carbon visualization size based on total saved
  const getCarbonVisualizationSize = () => {
    if (!impact) return 100;
    
    // Base size is 100px, grows based on carbon saved
    const baseSize = 100;
    const growthFactor = impact.totalCarbonSaved / 100;
    
    // Cap at 200px
    return Math.min(baseSize + growthFactor * 20, 200);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading sustainability features...</p>
      </div>
    );
  }

  return (
    <div className={styles.sustainabilityContainer}>
      <div className={styles.sustainabilityHeader}>
        <h2>Sustainability Impact</h2>
        <p className={styles.sustainabilityTagline}>Make eco-friendly choices and earn rewards while reducing your carbon footprint</p>
      </div>
      
      {impact && (
        <div className={styles.impactDashboard}>
          <div className={styles.carbonVisualization}>
            <div 
              className={styles.carbonBubble}
              style={{ 
                width: `${getCarbonVisualizationSize()}px`,
                height: `${getCarbonVisualizationSize()}px`
              }}
            >
              <div className={styles.carbonValue}>{impact.totalCarbonSaved}</div>
              <div className={styles.carbonUnit}>kg CO₂ saved</div>
            </div>
          </div>
          
          <div className={styles.impactStats}>
            <div className={styles.impactStat}>
              <div className={styles.statValue}>{impact.completedActions}/{impact.totalActions}</div>
              <div className={styles.statLabel}>Actions Completed</div>
            </div>
            
            <div className={styles.impactStat}>
              <div className={styles.statValue}>{impact.impactLevel}</div>
              <div className={styles.statLabel}>Impact Level</div>
            </div>
            
            <div className={styles.impactStat}>
              <div className={styles.statValue}>
                {Math.round(impact.progressToNextMilestone)}%
              </div>
              <div className={styles.statLabel}>To Next Milestone</div>
            </div>
          </div>
          
          <div className={styles.milestoneProgress}>
            <div className={styles.milestoneLabel}>
              Next Milestone: {impact.nextMilestone} kg CO₂ saved
            </div>
            <div className={styles.milestoneBarContainer}>
              <div 
                className={styles.milestoneBar}
                style={{ width: `${Math.min(100, impact.progressToNextMilestone)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.actionsSection}>
        <h3>Sustainable Actions</h3>
        
        <div className={styles.categoryTabs}>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'transportation' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('transportation')}
          >
            Transportation
          </button>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'accommodation' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('accommodation')}
          >
            Accommodation
          </button>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'activities' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('activities')}
          >
            Activities
          </button>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'food' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('food')}
          >
            Food
          </button>
          <button 
            className={`${styles.categoryTab} ${activeCategory === 'general' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('general')}
          >
            General
          </button>
        </div>
        
        <div className={styles.actionsList}>
          {filteredActions.length === 0 ? (
            <div className={styles.noActions}>
              <p>No sustainable actions available in this category.</p>
            </div>
          ) : (
            filteredActions.map(action => (
              <div 
                key={action.id} 
                className={`${styles.actionCard} ${action.isCompleted ? styles.completedAction : ''}`}
                onClick={() => onActionSelect(action)}
              >
                <div className={styles.actionStatus}>
                  {action.isCompleted ? (
                    <div className={styles.completedBadge}>✓</div>
                  ) : (
                    <div className={styles.pendingBadge}>+</div>
                  )}
                </div>
                
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>{action.title}</h4>
                  <p className={styles.actionDescription}>{action.description}</p>
                  
                  <div className={styles.actionMetrics}>
                    <div className={styles.actionMetric}>
                      <span className={styles.metricLabel}>Impact:</span>
                      <span className={styles.metricValue}>{action.impactScore}/10</span>
                    </div>
                    <div className={styles.actionMetric}>
                      <span className={styles.metricLabel}>CO₂ Saved:</span>
                      <span className={styles.metricValue}>{action.carbonSaved} kg</span>
                    </div>
                    <div className={styles.actionMetric}>
                      <span className={styles.metricLabel}>Reward:</span>
                      <span className={styles.metricValue}>{action.pointsReward} points</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.actionButton}>
                  {action.isCompleted ? (
                    <button className={styles.viewDetailsButton}>View Details</button>
                  ) : (
                    <button className={styles.commitButton}>Commit to Action</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className={styles.sustainabilityTips}>
        <h3>Sustainability Tips</h3>
        <div className={styles.tipsList}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>💧</div>
            <div className={styles.tipContent}>
              <h4>Water Conservation</h4>
              <p>Reuse hotel towels and limit shower time to reduce water usage during your travels.</p>
            </div>
          </div>
          
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🔌</div>
            <div className={styles.tipContent}>
              <h4>Energy Saving</h4>
              <p>Turn off lights, AC, and electronics when leaving your accommodation to reduce energy consumption.</p>
            </div>
          </div>
          
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🛍️</div>
            <div className={styles.tipContent}>
              <h4>Responsible Shopping</h4>
              <p>Purchase souvenirs made by local artisans using sustainable materials and avoid products made from endangered species.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityFeatures;
