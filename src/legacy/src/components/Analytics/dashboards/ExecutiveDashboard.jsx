import React from 'react';
import styles from './executiveDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import FunnelChart from '../visualizations/FunnelChart';

/**
 * Executive Dashboard Component
 * 
 * Provides a high-level overview of platform performance metrics
 * for executive and management users.
 */
const ExecutiveDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.executiveDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Executive Overview</h2>
        <p className={styles.dashboardDescription}>
          High-level metrics and KPIs across all platform features
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Total Users"
          value={data.totalUsers}
          change={data.userGrowth}
          changeLabel="vs previous period"
          icon="users"
        />
        <MetricCard
          title="Active Users"
          value={data.activeUsers}
          change={data.activeUserGrowth}
          changeLabel="vs previous period"
          icon="activity"
        />
        <MetricCard
          title="Experiences Created"
          value={data.experiencesCreated}
          change={data.experienceGrowth}
          changeLabel="vs previous period"
          icon="map"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          change={data.conversionRateChange}
          changeLabel="vs previous period"
          icon="trending-up"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>User Growth Trend</h3>
          <LineChart
            data={data.userGrowthTrend}
            xAxis="date"
            yAxis="users"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Feature Adoption</h3>
          <BarChart
            data={data.featureAdoption}
            xAxis="feature"
            yAxis="usagePercentage"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>User Engagement by Feature</h3>
          <HeatMap
            data={data.engagementByFeature}
            xAxis="date"
            yAxis="feature"
            valueKey="engagementScore"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>User Retention</h3>
          <LineChart
            data={data.retentionData}
            xAxis="period"
            yAxis="retentionRate"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>User Acquisition Channels</h3>
          <PieChart
            data={data.acquisitionChannels}
            nameKey="channel"
            valueKey="users"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Conversion Funnel</h3>
          <FunnelChart
            data={data.conversionFunnel}
            nameKey="stage"
            valueKey="users"
            height={300}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Key Insights</h3>
        <div className={styles.insightsList}>
          {data.insights.map((insight, index) => (
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

export default ExecutiveDashboard;
