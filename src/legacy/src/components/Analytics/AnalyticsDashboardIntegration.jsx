/**
 * Analytics Dashboard Integration Component
 * 
 * This component provides a wrapper for integrating analytics dashboards into the application
 */

import React, { useState, useEffect } from 'react';
import styles from './analyticsDashboardIntegration.module.css';
import { useAnalytics } from './AnalyticsProvider';
import AnalyticsDashboard from './AnalyticsDashboard';
import AnalyticsSettings from './AnalyticsSettings';
import AnalyticsConsentBanner from './AnalyticsConsentBanner';

/**
 * Analytics Dashboard Integration Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.defaultDashboard - Default dashboard to display
 * @param {string} props.userRole - User role for permission-based access
 */
const AnalyticsDashboardIntegration = ({ defaultDashboard = 'executive', userRole = 'user' }) => {
  const { initialized, consentGiven } = useAnalytics();
  const [currentDashboard, setCurrentDashboard] = useState(defaultDashboard);
  const [dateRange, setDateRange] = useState('30d');
  const [showSettings, setShowSettings] = useState(false);

  // Available dashboards based on user role
  const availableDashboards = getAvailableDashboards(userRole);

  // Handle dashboard change
  const handleDashboardChange = (dashboard) => {
    setCurrentDashboard(dashboard);
  };

  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // Handle settings toggle
  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  // Get available dashboards based on user role
  function getAvailableDashboards(role) {
    const dashboards = [
      { id: 'community', name: 'Community' },
      { id: 'emotional', name: 'Emotional Experience' },
      { id: 'trust', name: 'Trust Ecosystem' },
      { id: 'retention', name: 'Retention' },
      { id: 'mobile', name: 'Mobile Experience' }
    ];
    
    // Add executive dashboard for admin users
    if (role === 'admin') {
      dashboards.unshift({ id: 'executive', name: 'Executive Overview' });
    }
    
    return dashboards;
  }

  return (
    <div className={styles.integrationContainer}>
      {/* Consent Banner */}
      <AnalyticsConsentBanner 
        onSettings={handleSettingsToggle}
      />
      
      {/* Settings Modal */}
      {showSettings && (
        <div className={styles.settingsModal}>
          <div className={styles.settingsModalContent}>
            <button className={styles.closeButton} onClick={handleSettingsToggle}>×</button>
            <AnalyticsSettings onSave={handleSettingsToggle} />
          </div>
        </div>
      )}
      
      {/* Dashboard Controls */}
      <div className={styles.dashboardControls}>
        <div className={styles.dashboardSelector}>
          {availableDashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              className={`${styles.dashboardButton} ${currentDashboard === dashboard.id ? styles.active : ''}`}
              onClick={() => handleDashboardChange(dashboard.id)}
            >
              {dashboard.name}
            </button>
          ))}
        </div>
        
        <div className={styles.dateRangeSelector}>
          <select 
            value={dateRange} 
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className={styles.dateRangeSelect}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
        
        <button className={styles.settingsButton} onClick={handleSettingsToggle}>
          Privacy Settings
        </button>
      </div>
      
      {/* Dashboard Content */}
      <div className={styles.dashboardContent}>
        {initialized ? (
          consentGiven ? (
            <AnalyticsDashboard 
              dashboardType={currentDashboard}
              dateRange={dateRange}
              userRole={userRole}
            />
          ) : (
            <div className={styles.consentRequired}>
              <h3>Analytics Consent Required</h3>
              <p>
                Please enable analytics to view dashboards. Your privacy is important to us,
                and you can customize your settings at any time.
              </p>
              <button className={styles.enableButton} onClick={handleSettingsToggle}>
                Privacy Settings
              </button>
            </div>
          )
        ) : (
          <div className={styles.loading}>
            <p>Loading analytics system...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboardIntegration;
