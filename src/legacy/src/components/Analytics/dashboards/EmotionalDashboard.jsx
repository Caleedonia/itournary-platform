import React from 'react';
import styles from './emotionalDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import Table from '../visualizations/Table';

/**
 * Emotional Experience Dashboard Component
 * 
 * Provides detailed analytics on emotional experience feature usage and engagement
 */
const EmotionalDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.emotionalDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Emotional Experience Analytics</h2>
        <p className={styles.dashboardDescription}>
          Metrics on how users engage with emotional experience features
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Milestones Created"
          value={data.milestonesCreated}
          change={data.milestonesCreatedChange}
          changeLabel="vs previous period"
          icon="flag"
        />
        <MetricCard
          title="Memories Captured"
          value={data.memoriesCaptured}
          change={data.memoriesCapturedChange}
          changeLabel="vs previous period"
          icon="camera"
        />
        <MetricCard
          title="Memory Books Created"
          value={data.memoryBooksCreated}
          change={data.memoryBooksCreatedChange}
          changeLabel="vs previous period"
          icon="book"
        />
        <MetricCard
          title="Preference Completion"
          value={`${data.preferenceCompletionRate}%`}
          change={data.preferenceCompletionChange}
          changeLabel="vs previous period"
          icon="check-square"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Milestone Creation Trend</h3>
          <LineChart
            data={data.milestoneCreationTrend}
            xAxis="date"
            yAxis="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Milestones by Emotion Type</h3>
          <PieChart
            data={data.milestonesByEmotionType}
            nameKey="emotionType"
            valueKey="count"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Memory Capture by Media Type</h3>
          <BarChart
            data={data.memoryCaptureByMediaType}
            xAxis="mediaType"
            yAxis="count"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Memory Capture by Timeline Position</h3>
          <HeatMap
            data={data.memoryCaptureByTimelinePosition}
            xAxis="timelinePosition"
            yAxis="occasionType"
            valueKey="count"
            height={300}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Top Emotional Moments</h3>
        <Table
          data={data.topEmotionalMoments}
          columns={[
            { key: 'rank', header: 'Rank' },
            { key: 'momentType', header: 'Moment Type' },
            { key: 'emotionType', header: 'Emotion' },
            { key: 'engagementScore', header: 'Engagement Score' },
            { key: 'shareCount', header: 'Shares' }
          ]}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Preference Selection Distribution</h3>
          <BarChart
            data={data.preferenceSelectionDistribution}
            xAxis="preferenceType"
            yAxis="selectionCount"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Celebration Countdown Engagement</h3>
          <LineChart
            data={data.celebrationCountdownEngagement}
            xAxis="daysBeforeEvent"
            yAxis="engagementLevel"
            height={300}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Emotional Experience Insights</h3>
        <div className={styles.insightsList}>
          {data.emotionalInsights.map((insight, index) => (
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

export default EmotionalDashboard;
