import React from 'react';
import styles from './retentionDashboard.module.css';

// Import visualization components
import MetricCard from '../visualizations/MetricCard';
import LineChart from '../visualizations/LineChart';
import BarChart from '../visualizations/BarChart';
import PieChart from '../visualizations/PieChart';
import HeatMap from '../visualizations/HeatMap';
import Table from '../visualizations/Table';

/**
 * Retention Dashboard Component
 * 
 * Provides detailed analytics on retention features and membership programs
 */
const RetentionDashboard = ({ data, dateRange }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.retentionDashboard}>
      <div className={styles.dashboardHeader}>
        <h2>Retention Analytics</h2>
        <p className={styles.dashboardDescription}>
          Metrics on membership, loyalty, and referral programs
        </p>
      </div>

      <div className={styles.metricsOverview}>
        <MetricCard
          title="Retention Rate"
          value={`${data.retentionRate}%`}
          change={data.retentionRateChange}
          changeLabel="vs previous period"
          icon="repeat"
        />
        <MetricCard
          title="Membership Conversions"
          value={data.membershipConversions}
          change={data.membershipConversionsChange}
          changeLabel="vs previous period"
          icon="award"
        />
        <MetricCard
          title="Referral Conversions"
          value={data.referralConversions}
          change={data.referralConversionsChange}
          changeLabel="vs previous period"
          icon="share-2"
        />
        <MetricCard
          title="Loyalty Points Issued"
          value={data.loyaltyPointsIssued.toLocaleString()}
          change={data.loyaltyPointsIssuedChange}
          changeLabel="vs previous period"
          icon="gift"
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Retention Rate Trend</h3>
          <LineChart
            data={data.retentionRateTrend}
            xAxis="date"
            yAxis="rate"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Membership Tier Distribution</h3>
          <PieChart
            data={data.membershipTierDistribution}
            nameKey="tier"
            valueKey="userCount"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Referral Program Performance</h3>
          <BarChart
            data={data.referralProgramPerformance}
            xAxis="channel"
            yAxis="conversionRate"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Loyalty Point Economy</h3>
          <LineChart
            data={data.loyaltyPointEconomy}
            xAxis="date"
            yAxis={['pointsIssued', 'pointsRedeemed']}
            height={300}
            multiLine={true}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Top Reward Redemptions</h3>
        <Table
          data={data.topRewardRedemptions}
          columns={[
            { key: 'rank', header: 'Rank' },
            { key: 'rewardName', header: 'Reward' },
            { key: 'category', header: 'Category' },
            { key: 'redemptionCount', header: 'Redemptions' },
            { key: 'pointsRequired', header: 'Points Cost' }
          ]}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Membership Upgrade Funnel</h3>
          <BarChart
            data={data.membershipUpgradeFunnel}
            xAxis="stage"
            yAxis="userCount"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Points Earned by Activity</h3>
          <PieChart
            data={data.pointsEarnedByActivity}
            nameKey="activity"
            valueKey="points"
            height={300}
          />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Membership Benefits Engagement</h3>
          <HeatMap
            data={data.membershipBenefitsEngagement}
            xAxis="benefit"
            yAxis="tier"
            valueKey="engagementScore"
            height={300}
          />
        </div>
        <div className={styles.chartContainer}>
          <h3>Churn Risk Analysis</h3>
          <LineChart
            data={data.churnRiskAnalysis}
            xAxis="riskLevel"
            yAxis="userCount"
            height={300}
          />
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h3>Retention Insights</h3>
        <div className={styles.insightsList}>
          {data.retentionInsights.map((insight, index) => (
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

export default RetentionDashboard;
