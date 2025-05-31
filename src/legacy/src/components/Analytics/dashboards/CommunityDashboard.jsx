import React from 'react';
import styles from './communityDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import Table from '../visualizations/Table';

/**
 * Community Engagement Dashboard Component
 * 
 * Provides detailed analytics on community feature usage and engagement
 */
const CommunityDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.communityDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Community Engagement Analytics</h2>
        <p className={styles.dashboardDescription}>
          Detailed metrics on user engagement with community features
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Profile Completions"
          value={`${data.profileCompletionRate}%`}
          change={data.profileCompletionChange}
          changeLabel="vs previous period"
          icon="user-check"
        />
        <MetricCard
          title="Stories Shared"
          value={data.storiesShared}
          change={data.storiesSharedChange}
          changeLabel="vs previous period"
          icon="book-open"
        />
        <MetricCard
          title="Forum Activity"
          value={data.forumPosts}
          change={data.forumActivityChange}
          changeLabel="vs previous period"
          icon="message-square"
        />
        <MetricCard
          title="Community Engagement"
          value={`${data.engagementRate}%`}
          change={data.engagementRateChange}
          changeLabel="vs previous period"
          icon="users"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Profile Completion Trend</h3>
          <LineChart
            data={data.profileCompletionTrend}
            xAxis="date"
            yAxis="completionRate"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Story Engagement by Type</h3>
          <BarChart
            data={data.storyEngagementByType}
            xAxis="storyType"
            yAxis="engagementScore"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Forum Activity by Topic</h3>
          <PieChart
            data={data.forumActivityByTopic}
            nameKey="topic"
            valueKey="posts"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>User Engagement by Time</h3>
          <HeatMap
            data={data.engagementByTime}
            xAxis="hour"
            yAxis="day"
            valueKey="engagementScore"
            height={300}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Top Community Contributors</h3>
        <Table
          data={data.topContributors}
          columns={[
            { key: 'rank', header: 'Rank' },
            { key: 'username', header: 'Username' },
            { key: 'contributions', header: 'Contributions' },
            { key: 'engagementScore', header: 'Engagement Score' },
            { key: 'memberSince', header: 'Member Since' }
          ]}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Content Creation vs. Consumption</h3>
          <LineChart
            data={data.contentCreationVsConsumption}
            xAxis="date"
            yAxis={['creation', 'consumption']}
            height={300}
            multiLine={true}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Success Story Showcase Performance</h3>
          <BarChart
            data={data.successStoryPerformance}
            xAxis="story"
            yAxis="views"
            height={300}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Community Insights</h3>
        <div className={styles.insightsList}>
          {data.communityInsights.map((insight, index) => (
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

export default CommunityDashboard;
