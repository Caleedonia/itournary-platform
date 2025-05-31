import React from 'react';
import styles from './funnelChart.module.css';

/**
 * Funnel Chart Component
 * 
 * Displays data as a funnel chart
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Data to display
 * @param {string} props.nameKey - Key for stage names
 * @param {string} props.valueKey - Key for stage values
 * @param {number} props.height - Height of the chart in pixels
 */
const FunnelChart = ({ data, nameKey, valueKey, height = 300 }) => {
  if (!data || data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  // In a real implementation, this would use a charting library like Chart.js or Recharts
  // This is a placeholder visualization
  return (
    <div className={styles.funnelChartContainer} style={{ height: `${height}px` }}>
      <div className={styles.chartPlaceholder}>
        <div className={styles.chartTitle}>Funnel Chart</div>
        <div className={styles.chartDescription}>
          <p>Name Key: {nameKey}</p>
          <p>Value Key: {valueKey}</p>
          <p>Stages: {data.length}</p>
        </div>
        <div className={styles.chartNote}>
          Note: This is a placeholder. In production, this would render an actual funnel chart using a library like Recharts.
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
