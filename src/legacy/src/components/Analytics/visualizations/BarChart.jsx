import React from 'react';
import styles from './barChart.module.css';

/**
 * Bar Chart Component
 * 
 * Displays data as a bar chart
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Data to display
 * @param {string} props.xAxis - Key for x-axis values
 * @param {string} props.yAxis - Key for y-axis values
 * @param {number} props.height - Height of the chart in pixels
 */
const BarChart = ({ data, xAxis, yAxis, height = 300 }) => {
  if (!data || data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  // In a real implementation, this would use a charting library like Chart.js or Recharts
  // This is a placeholder visualization
  return (
    <div className={styles.barChartContainer} style={{ height: `${height}px` }}>
      <div className={styles.chartPlaceholder}>
        <div className={styles.chartTitle}>Bar Chart</div>
        <div className={styles.chartDescription}>
          <p>X-Axis: {xAxis}</p>
          <p>Y-Axis: {yAxis}</p>
          <p>Data Points: {data.length}</p>
        </div>
        <div className={styles.chartNote}>
          Note: This is a placeholder. In production, this would render an actual chart using a library like Recharts.
        </div>
      </div>
    </div>
  );
};

export default BarChart;
