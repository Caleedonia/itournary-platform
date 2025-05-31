/**
 * Analytics Dashboard Component
 * 
 * This component provides a comprehensive analytics dashboard for the iTournary platform,
 * displaying key metrics, visualizations, and insights across all platform features.
 */

import React, { useState, useEffect } from 'react';
import styles from './analyticsDashboard.module.css';
import { useAnalytics } from './AnalyticsProvider';

// Dashboard sections
import ExecutiveDashboard from './dashboards/ExecutiveDashboard';
import CommunityDashboard from './dashboards/CommunityDashboard';
import EmotionalDashboard from './dashboards/EmotionalDashboard';
import TrustDashboard from './dashboards/TrustDashboard';
import RetentionDashboard from './dashboards/RetentionDashboard';
import MobileDashboard from './dashboards/MobileDashboard';

// Mock data service - would be replaced with actual API calls
import { fetchAnalyticsData } from './services/analyticsDataService';

/**
 * Main Analytics Dashboard Component
 */
const AnalyticsDashboard = ({ userId, userRole }) => {
  const { initialized, consentGiven } = useAnalytics();
  const [activeTab, setActiveTab] = useState('executive');
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch dashboard data based on selected date range
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!initialized || !consentGiven) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAnalyticsData(activeTab, dateRange, userRole);
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [initialized, consentGiven, activeTab, dateRange, userRole]);

  // Handle date range change
  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  // Render appropriate dashboard based on active tab
  const renderDashboard = () => {
    if (!initialized) {
      return (
        <div className={styles.initializationMessage}>
          <h3>Analytics Not Initialized</h3>
          <p>The analytics system has not been properly initialized. Please check your configuration.</p>
        </div>
      );
    }

    if (!consentGiven) {
      return (
        <div className={styles.consentMessage}>
          <h3>Analytics Consent Required</h3>
          <p>To view analytics data, you must provide consent for data collection and analysis.</p>
          <button 
            className={styles.consentButton}
            onClick={() => window.updateConsentState({ analytics: true })}
          >
            Enable Analytics
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading analytics data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorMessage}>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => setDateRange(dateRange)} // Trigger a refresh
          >
            Retry
          </button>
        </div>
      );
    }

    if (!dashboardData) {
      return (
        <div className={styles.noDataMessage}>
          <h3>No Data Available</h3>
          <p>There is no analytics data available for the selected time period.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'executive':
        return <ExecutiveDashboard data={dashboardData} dateRange={dateRange} />;
      case 'community':
        return <CommunityDashboard data={dashboardData} dateRange={dateRange} />;
      case 'emotional':
        return <EmotionalDashboard data={dashboardData} dateRange={dateRange} />;
      case 'trust':
        return <TrustDashboard data={dashboardData} dateRange={dateRange} />;
      case 'retention':
        return <RetentionDashboard data={dashboardData} dateRange={dateRange} />;
      case 'mobile':
        return <MobileDashboard data={dashboardData} dateRange={dateRange} />;
      default:
        return <ExecutiveDashboard data={dashboardData} dateRange={dateRange} />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1>iTournary Analytics Dashboard</h1>
        <div className={styles.dashboardControls}>
          <select 
            className={styles.dateRangeSelector}
            value={dateRange}
            onChange={handleDateRangeChange}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
            <option value="allTime">All Time</option>
          </select>
          
          {userRole === 'admin' && (
            <button className={styles.exportButton}>
              Export Data
            </button>
          )}
        </div>
      </div>

      <div className={styles.dashboardTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'executive' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('executive')}
        >
          Executive Overview
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'community' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('community')}
        >
          Community Engagement
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'emotional' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('emotional')}
        >
          Emotional Experience
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'trust' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('trust')}
        >
          Trust Ecosystem
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'retention' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('retention')}
        >
          Retention
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'mobile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('mobile')}
        >
          Mobile Experience
        </button>
      </div>

      <div className={styles.dashboardContent}>
        {renderDashboard()}
      </div>

      <div className={styles.dashboardFooter}>
        <p>Data last updated: {dashboardData?.lastUpdated || 'Unknown'}</p>
        <p>Analytics Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
