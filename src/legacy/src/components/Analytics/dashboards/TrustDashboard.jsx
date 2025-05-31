import React from 'react';
import styles from './trustDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import Table from '../visualizations/Table';

/**
 * Trust Ecosystem Dashboard Component
 * 
 * Provides detailed analytics on trust ecosystem feature usage and engagement
 */
const TrustDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.trustDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Trust Ecosystem Analytics</h2>
        <p className={styles.dashboardDescription}>
          Metrics on trust indicators, reviews, and safety features
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Reviews Submitted"
          value={data.reviewsSubmitted}
          change={data.reviewsSubmittedChange}
          changeLabel="vs previous period"
          icon="star"
        />
        <MetricCard
          title="Verification Rate"
          value={`${data.verificationRate}%`}
          change={data.verificationRateChange}
          changeLabel="vs previous period"
          icon="check-circle"
        />
        <MetricCard
          title="Trust Score"
          value={data.trustScore.toFixed(1)}
          change={data.trustScoreChange}
          changeLabel="vs previous period"
          icon="shield"
        />
        <MetricCard
          title="Safety Reports"
          value={data.safetyReports}
          change={data.safetyReportsChange}
          changeLabel="vs previous period"
          icon="alert-triangle"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Review Submission Trend</h3>
          <LineChart
            data={data.reviewSubmissionTrend}
            xAxis="date"
            yAxis="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Reviews by Rating</h3>
          <BarChart
            data={data.reviewsByRating}
            xAxis="rating"
            yAxis="count"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Verification Methods</h3>
          <PieChart
            data={data.verificationMethods}
            nameKey="method"
            valueKey="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Trust Badge Interactions</h3>
          <HeatMap
            data={data.trustBadgeInteractions}
            xAxis="badgeType"
            yAxis="pageContext"
            valueKey="interactionCount"
            height={300}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Top Reviewed Experiences</h3>
        <Table
          data={data.topReviewedExperiences}
          columns={[
            { key: 'rank', header: 'Rank' },
            { key: 'experienceName', header: 'Experience' },
            { key: 'reviewCount', header: 'Reviews' },
            { key: 'averageRating', header: 'Avg. Rating' },
            { key: 'verificationRate', header: 'Verification %' }
          ]}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Review Engagement</h3>
          <BarChart
            data={data.reviewEngagement}
            xAxis="engagementType"
            yAxis="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Safety Feature Usage</h3>
          <LineChart
            data={data.safetyFeatureUsage}
            xAxis="date"
            yAxis={['reportCount', 'guidelineViews', 'transparencyViews']}
            height={300}
            multiLine={true}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Trust Ecosystem Insights</h3>
        <div className={styles.insightsList}>
          {data.trustInsights.map((insight, index) => (
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

export default TrustDashboard;
