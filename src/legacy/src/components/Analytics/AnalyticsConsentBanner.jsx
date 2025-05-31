/**
 * Analytics Consent Banner Component
 * 
 * This component displays a consent banner for analytics tracking
 */

import React, { useState, useEffect } from 'react';
import styles from './analyticsConsentBanner.module.css';
import { useAnalytics } from './AnalyticsProvider';

/**
 * Analytics Consent Banner Component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onAccept - Callback function when consent is accepted
 * @param {Function} props.onDecline - Callback function when consent is declined
 * @param {Function} props.onSettings - Callback function when settings button is clicked
 */
const AnalyticsConsentBanner = ({ onAccept, onDecline, onSettings }) => {
  const { initialized, consentGiven, updateConsent } = useAnalytics();
  const [visible, setVisible] = useState(false);

  // Show banner if analytics is initialized but consent is not given
  useEffect(() => {
    if (initialized && consentGiven === null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [initialized, consentGiven]);

  // Handle accept
  const handleAccept = () => {
    updateConsent(true);
    setVisible(false);
    if (onAccept) {
      onAccept();
    }
  };

  // Handle decline
  const handleDecline = () => {
    updateConsent(false);
    setVisible(false);
    if (onDecline) {
      onDecline();
    }
  };

  // Handle settings
  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerText}>
          <h3>We Value Your Privacy</h3>
          <p>
            We use analytics to improve your experience and understand how you use our platform.
            This helps us make iTournary better for everyone.
          </p>
        </div>
        <div className={styles.bannerActions}>
          <button className={`${styles.bannerButton} ${styles.settingsButton}`} onClick={handleSettings}>
            Customize Settings
          </button>
          <button className={`${styles.bannerButton} ${styles.declineButton}`} onClick={handleDecline}>
            Decline
          </button>
          <button className={`${styles.bannerButton} ${styles.acceptButton}`} onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsConsentBanner;
