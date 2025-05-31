import React from 'react';
import styles from './pieChart.module.css';

/**
 * Pie Chart Component
 * 
 * Displays data as a pie chart
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Data to display
 * @param {string} props.nameKey - Key for segment names
 * @param {string} props.valueKey - Key for segment values
 * @param {number} props.height - Height of the chart in pixels
 */
const PieChart = ({ data, nameKey, valueKey, height = 300 }) => {
  if (!data || data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  // In a real implementation, this would use a charting library like Chart.js or Recharts
  // This is a placeholder visualization
  return (
    <div className={styles.pieChartContainer} style={{ height: `${height}px` }}>
      <div className={styles.chartPlaceholder}>
        <div className={styles.chartTitle}>Pie Chart</div>
        <div className={styles.chartDescription}>
          <p>Name Key: {nameKey}</p>
          <p>Value Key: {valueKey}</p>
          <p>Segments: {data.length}</p>
        </div>
        <div className={styles.chartNote}>
          Note: This is a placeholder. In production, this would render an actual chart using a library like Recharts.
        </div>
      </div>
    </div>
  );
};

export default PieChart;
