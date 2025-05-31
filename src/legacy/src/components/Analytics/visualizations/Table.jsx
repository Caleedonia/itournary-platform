import React from 'react';
import styles from './table.module.css';

/**
 * Table Component
 * 
 * Displays data in a tabular format
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Data to display
 * @param {Array} props.columns - Column definitions
 */
const Table = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }

  if (!columns || columns.length === 0) {
    return <div className={styles.noData}>No columns defined</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.tableHeader}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={styles.tableCell}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
