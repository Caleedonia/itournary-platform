import React from 'react';
import styles from './mobileDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import Table from '../visualizations/Table';

/**
 * Mobile Experience Dashboard Component
 * 
 * Provides detailed analytics on mobile usage and PWA performance
 */
const MobileDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.mobileDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Mobile Experience Analytics</h2>
        <p className={styles.dashboardDescription}>
          Metrics on mobile usage, PWA performance, and location-based features
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Mobile Users"
          value={`${data.mobileUserPercentage}%`}
          change={data.mobileUserChange}
          changeLabel="vs previous period"
          icon="smartphone"
        />
        <MetricCard
          title="PWA Installations"
          value={data.pwaInstallations}
          change={data.pwaInstallationsChange}
          changeLabel="vs previous period"
          icon="download"
        />
        <MetricCard
          title="Quick Captures"
          value={data.quickCaptures}
          change={data.quickCapturesChange}
          changeLabel="vs previous period"
          icon="camera"
        />
        <MetricCard
          title="Location Usage"
          value={`${data.locationUsageRate}%`}
          change={data.locationUsageChange}
          changeLabel="vs previous period"
          icon="map-pin"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Mobile vs Desktop Usage</h3>
          <LineChart
            data={data.mobileVsDesktopTrend}
            xAxis="date"
            yAxis={['mobile', 'desktop', 'tablet']}
            height={300}
            multiLine={true}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Device Distribution</h3>
          <PieChart
            data={data.deviceDistribution}
            nameKey="deviceType"
            valueKey="percentage"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>PWA Installation Funnel</h3>
          <BarChart
            data={data.pwaInstallationFunnel}
            xAxis="stage"
            yAxis="userCount"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>PWA Usage After Installation</h3>
          <LineChart
            data={data.pwaUsageAfterInstallation}
            xAxis="daysAfterInstall"
            yAxis="usageRate"
            height={300}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Top Mobile Features</h3>
        <Table
          data={data.topMobileFeatures}
          columns={[
            { key: 'rank', header: 'Rank' },
            { key: 'featureName', header: 'Feature' },
            { key: 'usageCount', header: 'Usage Count' },
            { key: 'growthRate', header: 'Growth Rate' },
            { key: 'satisfactionScore', header: 'Satisfaction' }
          ]}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Quick Capture Types</h3>
          <PieChart
            data={data.quickCaptureTypes}
            nameKey="captureType"
            valueKey="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Mobile Navigation Patterns</h3>
          <HeatMap
            data={data.mobileNavigationPatterns}
            xAxis="destination"
            yAxis="source"
            valueKey="frequency"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Location Services Usage</h3>
          <BarChart
            data={data.locationServicesUsage}
            xAxis="actionType"
            yAxis="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Offline vs Online Usage</h3>
          <LineChart
            data={data.offlineVsOnlineUsage}
            xAxis="date"
            yAxis={['online', 'offline']}
            height={300}
            multiLine={true}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Mobile Experience Insights</h3>
        <div className={styles.insightsList}>
          {data.mobileInsights.map((insight, index) => (
            <div key={index} className={styles.insightCard}>
              <div className={styles.insightIcon}>{insight.trend === 'up' ? '↑' : insight.trend === 'down' ? '↓' : '→'}</div>
              <div className={styles.insightContent}>
                <h4>{insight.title}</h4>
                <p>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
