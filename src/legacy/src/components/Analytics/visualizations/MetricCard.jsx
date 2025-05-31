import React from 'react';
import styles from './metricCard.module.css';

/**
 * Metric Card Component
 * 
 * Displays a single metric with title, value, and change indicator
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the metric
 * @param {string|number} props.value - Value to display
 * @param {number} props.change - Percentage change from previous period
 * @param {string} props.changeLabel - Label for the change (e.g., "vs previous period")
 * @param {string} props.icon - Icon name to display
 */
const MetricCard = ({ title, value, change, changeLabel, icon }) => {
  // Determine change status for styling
  const changeStatus = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
  
  // Format change value with + or - sign
  const formattedChange = change > 0 
    ? `+${change}%` 
    : change < 0 
      ? `${change}%` 
      : '0%';

  return (
    <div className={styles.metricCard}>
      <div className={styles.metricHeader}>
        <div className={styles.metricTitle}>{title}</div>
        {icon && <div className={styles.metricIcon}>{renderIcon(icon)}</div>}
      </div>
      <div className={styles.metricValue}>{value}</div>
      <div className={`${styles.metricChange} ${styles[changeStatus]}`}>
        <span className={styles.changeValue}>{formattedChange}</span>
        {changeLabel && <span className={styles.changeLabel}>{changeLabel}</span>}
      </div>
    </div>
  );
};

/**
 * Render icon based on name
 * 
 * Note: In a real implementation, this would use an icon library like Feather Icons
 * 
 * @param {string} iconName - Name of the icon to render
 * @returns {JSX.Element} Icon element
 */
const renderIcon = (iconName) => {
  // This is a placeholder. In a real implementation, you would use an icon library
  return <span className={`icon icon-${iconName}`}>{iconName}</span>;
};

export default MetricCard;
