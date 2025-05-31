"use client";

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import styles from './templateAnalytics.module.css';

interface TemplateAnalyticsProps {
  templateId?: string;
  adminView?: boolean;
}

interface TemplateMetrics {
  views: number;
  selections: number;
  completions: number;
  modificationRate: number;
  averageCompletionTime: number;
  popularSections: Array<{section: string, interactionCount: number}>;
}

const TemplateAnalytics: React.FC<TemplateAnalyticsProps> = ({
  templateId,
  adminView = false
}) => {
  const analytics = useAnalytics();
  const [metrics, setMetrics] = useState<TemplateMetrics>({
    views: 0,
    selections: 0,
    completions: 0,
    modificationRate: 0,
    averageCompletionTime: 0,
    popularSections: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Track view of analytics if in user mode
    if (!adminView && templateId) {
      analytics.trackEvent('template_analytics_view', { templateId });
    }
    
    // Fetch template metrics
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockMetrics: TemplateMetrics = {
          views: Math.floor(Math.random() * 1000) + 100,
          selections: Math.floor(Math.random() * 500) + 50,
          completions: Math.floor(Math.random() * 200) + 20,
          modificationRate: Math.random() * 0.8 + 0.1, // 10-90%
          averageCompletionTime: Math.floor(Math.random() * 20) + 5, // 5-25 days
          popularSections: [
            { section: 'Timeline', interactionCount: Math.floor(Math.random() * 300) + 100 },
            { section: 'Budget', interactionCount: Math.floor(Math.random() * 250) + 80 },
            { section: 'Checklist', interactionCount: Math.floor(Math.random() * 200) + 60 },
            { section: 'Collaborators', interactionCount: Math.floor(Math.random() * 150) + 40 }
          ]
        };
        
        // Sort popular sections by interaction count
        mockMetrics.popularSections.sort((a, b) => b.interactionCount - a.interactionCount);
        
        setMetrics(mockMetrics);
        setError(null);
      } catch (err) {
        console.error('Error fetching template metrics:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [templateId, adminView, analytics]);

  // Calculate conversion rates
  const selectionRate = metrics.views > 0 ? (metrics.selections / metrics.views) * 100 : 0;
  const completionRate = metrics.selections > 0 ? (metrics.completions / metrics.selections) * 100 : 0;

  // Handle interaction with analytics features
  const handleInteraction = (feature: string) => {
    analytics.trackEvent('template_analytics_interaction', { feature });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
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
    <div className={styles.analyticsContainer}>
      {adminView && (
        <h2 className={styles.analyticsTitle}>Template Performance Analytics</h2>
      )}
      
      <div className={styles.metricsGrid}>
        <div 
          className={styles.metricCard}
          onClick={() => handleInteraction('views')}
        >
          <h3 className={styles.metricTitle}>Views</h3>
          <p className={styles.metricValue}>{metrics.views.toLocaleString()}</p>
        </div>
        
        <div 
          className={styles.metricCard}
          onClick={() => handleInteraction('selections')}
        >
          <h3 className={styles.metricTitle}>Selections</h3>
          <p className={styles.metricValue}>{metrics.selections.toLocaleString()}</p>
          <p className={styles.metricSubtext}>{selectionRate.toFixed(1)}% of views</p>
        </div>
        
        <div 
          className={styles.metricCard}
          onClick={() => handleInteraction('completions')}
        >
          <h3 className={styles.metricTitle}>Completions</h3>
          <p className={styles.metricValue}>{metrics.completions.toLocaleString()}</p>
          <p className={styles.metricSubtext}>{completionRate.toFixed(1)}% of selections</p>
        </div>
        
        <div 
          className={styles.metricCard}
          onClick={() => handleInteraction('modifications')}
        >
          <h3 className={styles.metricTitle}>Modification Rate</h3>
          <p className={styles.metricValue}>{(metrics.modificationRate * 100).toFixed(1)}%</p>
          <p className={styles.metricSubtext}>of template items</p>
        </div>
      </div>
      
      <div className={styles.detailedMetrics}>
        <div 
          className={styles.timeMetric}
          onClick={() => handleInteraction('completion_time')}
        >
          <h3 className={styles.metricTitle}>Average Completion Time</h3>
          <div className={styles.timeValue}>
            <span className={styles.timeNumber}>{metrics.averageCompletionTime}</span>
            <span className={styles.timeUnit}>days</span>
          </div>
        </div>
        
        <div 
          className={styles.popularSections}
          onClick={() => handleInteraction('popular_sections')}
        >
          <h3 className={styles.metricTitle}>Most Popular Sections</h3>
          <ul className={styles.sectionsList}>
            {metrics.popularSections.map((section, index) => (
              <li key={index} className={styles.sectionItem}>
                <span className={styles.sectionName}>{section.section}</span>
                <div className={styles.sectionBar}>
                  <div 
                    className={styles.sectionBarFill} 
                    style={{ 
                      width: `${(section.interactionCount / metrics.popularSections[0].interactionCount) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className={styles.sectionCount}>{section.interactionCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {adminView && (
        <div className={styles.adminActions}>
          <button 
            className={styles.exportButton}
            onClick={() => handleInteraction('export')}
          >
            Export Data
          </button>
          <button 
            className={styles.detailsButton}
            onClick={() => handleInteraction('details')}
          >
            View Detailed Report
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateAnalytics;
