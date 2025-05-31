"use client";

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import styles from './userEngagementMetrics.module.css';

interface UserEngagementMetricsProps {
  userId?: string;
  adminView?: boolean;
}

interface EngagementMetrics {
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  userRetention: {
    day7: number;
    day30: number;
    day90: number;
  };
  averageSessionDuration: number;
  averageActionsPerSession: number;
  featureUsage: Array<{
    feature: string;
    usageCount: number;
    percentageOfUsers: number;
  }>;
  userJourney: {
    conversionRate: number;
    dropOffPoints: Array<{
      stage: string;
      dropOffRate: number;
    }>;
  };
}

const UserEngagementMetrics: React.FC<UserEngagementMetricsProps> = ({
  userId,
  adminView = false
}) => {
  const analytics = useAnalytics();
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Track view of engagement metrics
    if (adminView) {
      analytics.trackFeatureUsage('engagement_metrics', 'view', { timeRange });
    }
    
    // Fetch engagement metrics
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockMetrics: EngagementMetrics = {
          activeUsers: {
            daily: Math.floor(Math.random() * 500) + 100,
            weekly: Math.floor(Math.random() * 2000) + 500,
            monthly: Math.floor(Math.random() * 5000) + 2000
          },
          userRetention: {
            day7: Math.random() * 0.4 + 0.5, // 50-90%
            day30: Math.random() * 0.3 + 0.3, // 30-60%
            day90: Math.random() * 0.2 + 0.1 // 10-30%
          },
          averageSessionDuration: Math.floor(Math.random() * 15) + 5, // 5-20 minutes
          averageActionsPerSession: Math.floor(Math.random() * 20) + 10, // 10-30 actions
          featureUsage: [
            {
              feature: 'Timeline Planning',
              usageCount: Math.floor(Math.random() * 3000) + 1000,
              percentageOfUsers: Math.random() * 0.4 + 0.5 // 50-90%
            },
            {
              feature: 'Budget Management',
              usageCount: Math.floor(Math.random() * 2500) + 800,
              percentageOfUsers: Math.random() * 0.3 + 0.4 // 40-70%
            },
            {
              feature: 'Collaboration',
              usageCount: Math.floor(Math.random() * 2000) + 600,
              percentageOfUsers: Math.random() * 0.3 + 0.3 // 30-60%
            },
            {
              feature: 'Template Selection',
              usageCount: Math.floor(Math.random() * 1500) + 500,
              percentageOfUsers: Math.random() * 0.2 + 0.7 // 70-90%
            },
            {
              feature: 'Destination Research',
              usageCount: Math.floor(Math.random() * 1200) + 400,
              percentageOfUsers: Math.random() * 0.2 + 0.5 // 50-70%
            }
          ],
          userJourney: {
            conversionRate: Math.random() * 0.3 + 0.1, // 10-40%
            dropOffPoints: [
              {
                stage: 'Template Selection',
                dropOffRate: Math.random() * 0.2 + 0.1 // 10-30%
              },
              {
                stage: 'Initial Planning',
                dropOffRate: Math.random() * 0.3 + 0.2 // 20-50%
              },
              {
                stage: 'Collaboration Setup',
                dropOffRate: Math.random() * 0.4 + 0.3 // 30-70%
              },
              {
                stage: 'Final Review',
                dropOffRate: Math.random() * 0.2 + 0.1 // 10-30%
              }
            ]
          }
        };
        
        // Sort feature usage by count
        mockMetrics.featureUsage.sort((a, b) => b.usageCount - a.usageCount);
        
        setMetrics(mockMetrics);
        setError(null);
      } catch (err) {
        console.error('Error fetching engagement metrics:', err);
        setError('Failed to load engagement metrics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [timeRange, adminView, analytics]);

  // Handle time range change
  const handleTimeRangeChange = (range: '7d' | '30d' | '90d') => {
    setTimeRange(range);
    analytics.trackFeatureUsage('engagement_metrics', 'change_time_range', { range });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading engagement metrics...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error || 'Failed to load metrics'}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.metricsContainer}>
      {adminView && (
        <div className={styles.metricsHeader}>
          <h2 className={styles.metricsTitle}>User Engagement Metrics</h2>
          <div className={styles.timeRangeSelector}>
            <button 
              className={`${styles.timeRangeButton} ${timeRange === '7d' ? styles.active : ''}`}
              onClick={() => handleTimeRangeChange('7d')}
            >
              7 Days
            </button>
            <button 
              className={`${styles.timeRangeButton} ${timeRange === '30d' ? styles.active : ''}`}
              onClick={() => handleTimeRangeChange('30d')}
            >
              30 Days
            </button>
            <button 
              className={`${styles.timeRangeButton} ${timeRange === '90d' ? styles.active : ''}`}
              onClick={() => handleTimeRangeChange('90d')}
            >
              90 Days
            </button>
          </div>
        </div>
      )}
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Active Users</h3>
          <div className={styles.activeUsersGrid}>
            <div className={styles.activeUserMetric}>
              <span className={styles.activeUserValue}>{metrics.activeUsers.daily.toLocaleString()}</span>
              <span className={styles.activeUserLabel}>Daily</span>
            </div>
            <div className={styles.activeUserMetric}>
              <span className={styles.activeUserValue}>{metrics.activeUsers.weekly.toLocaleString()}</span>
              <span className={styles.activeUserLabel}>Weekly</span>
            </div>
            <div className={styles.activeUserMetric}>
              <span className={styles.activeUserValue}>{metrics.activeUsers.monthly.toLocaleString()}</span>
              <span className={styles.activeUserLabel}>Monthly</span>
            </div>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>User Retention</h3>
          <div className={styles.retentionChart}>
            <div className={styles.retentionBar}>
              <div className={styles.retentionLabel}>7 Days</div>
              <div className={styles.retentionBarContainer}>
                <div 
                  className={styles.retentionBarFill}
                  style={{ width: `${metrics.userRetention.day7 * 100}%` }}
                ></div>
              </div>
              <div className={styles.retentionValue}>{(metrics.userRetention.day7 * 100).toFixed(1)}%</div>
            </div>
            <div className={styles.retentionBar}>
              <div className={styles.retentionLabel}>30 Days</div>
              <div className={styles.retentionBarContainer}>
                <div 
                  className={styles.retentionBarFill}
                  style={{ width: `${metrics.userRetention.day30 * 100}%` }}
                ></div>
              </div>
              <div className={styles.retentionValue}>{(metrics.userRetention.day30 * 100).toFixed(1)}%</div>
            </div>
            <div className={styles.retentionBar}>
              <div className={styles.retentionLabel}>90 Days</div>
              <div className={styles.retentionBarContainer}>
                <div 
                  className={styles.retentionBarFill}
                  style={{ width: `${metrics.userRetention.day90 * 100}%` }}
                ></div>
              </div>
              <div className={styles.retentionValue}>{(metrics.userRetention.day90 * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Session Metrics</h3>
          <div className={styles.sessionMetrics}>
            <div className={styles.sessionMetric}>
              <span className={styles.sessionMetricValue}>{metrics.averageSessionDuration}</span>
              <span className={styles.sessionMetricLabel}>Avg. Minutes per Session</span>
            </div>
            <div className={styles.sessionMetric}>
              <span className={styles.sessionMetricValue}>{metrics.averageActionsPerSession}</span>
              <span className={styles.sessionMetricLabel}>Avg. Actions per Session</span>
            </div>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <h3 className={styles.metricTitle}>User Journey</h3>
          <div className={styles.journeyMetrics}>
            <div className={styles.conversionRate}>
              <span className={styles.conversionValue}>{(metrics.userJourney.conversionRate * 100).toFixed(1)}%</span>
              <span className={styles.conversionLabel}>Completion Rate</span>
            </div>
            <div className={styles.dropOffPoints}>
              <h4 className={styles.dropOffTitle}>Drop-off Points</h4>
              {metrics.userJourney.dropOffPoints.map((point, index) => (
                <div key={index} className={styles.dropOffPoint}>
                  <span className={styles.dropOffStage}>{point.stage}</span>
                  <span className={styles.dropOffRate}>{(point.dropOffRate * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.featureUsageSection}>
        <h3 className={styles.sectionTitle}>Feature Usage</h3>
        <div className={styles.featureUsageChart}>
          {metrics.featureUsage.map((feature, index) => (
            <div key={index} className={styles.featureUsageBar}>
              <span className={styles.featureName}>{feature.feature}</span>
              <div className={styles.featureBarContainer}>
                <div 
                  className={styles.featureBarFill}
                  style={{ width: `${(feature.usageCount / metrics.featureUsage[0].usageCount) * 100}%` }}
                ></div>
              </div>
              <div className={styles.featureMetrics}>
                <span className={styles.featureCount}>{feature.usageCount.toLocaleString()}</span>
                <span className={styles.featurePercentage}>{(feature.percentageOfUsers * 100).toFixed(1)}% of users</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {adminView && (
        <div className={styles.adminActions}>
          <button 
            className={styles.exportButton}
            onClick={() => analytics.trackFeatureUsage('engagement_metrics', 'export')}
          >
            Export Data
          </button>
          <button 
            className={styles.detailsButton}
            onClick={() => analytics.trackFeatureUsage('engagement_metrics', 'view_details')}
          >
            View Detailed Report
          </button>
        </div>
      )}
    </div>
  );
};

export default UserEngagementMetrics;
