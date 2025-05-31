
"use client";

import React from 'react';
import styles from './typingIndicator.module.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className={styles.typingIndicator}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default TypingIndicator;
