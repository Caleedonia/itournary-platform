import React from 'react';
import styles from './typingIndicator.module.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className={styles.typingContainer}>
      <div className={styles.avatar}>
        <div className={styles.assistantAvatar}>AI</div>
      </div>
      <div className={styles.typingIndicator}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
