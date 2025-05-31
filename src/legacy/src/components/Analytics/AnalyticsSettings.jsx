/**
 * Analytics Settings Component
 * 
 * This component allows users to manage their analytics preferences
 */

import React, { useState, useEffect } from 'react';
import styles from './analyticsSettings.module.css';
import { useAnalytics } from './AnalyticsProvider';

/**
 * Analytics Settings Component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Callback function when settings are saved
 */
const AnalyticsSettings = ({ onSave }) => {
  const { initialized, consentGiven, updateConsent, privacySettings, updatePrivacySettings } = useAnalytics();
  
  const [settings, setSettings] = useState({
    basicAnalytics: true,
    usageTracking: true,
    personalization: true,
    marketingAnalytics: false,
    thirdPartySharing: false
  });

  // Initialize settings from provider
  useEffect(() => {
    if (initialized && privacySettings) {
      setSettings({
        basicAnalytics: privacySettings.basicAnalytics ?? true,
        usageTracking: privacySettings.usageTracking ?? true,
        personalization: privacySettings.personalization ?? true,
        marketingAnalytics: privacySettings.marketingAnalytics ?? false,
        thirdPartySharing: privacySettings.thirdPartySharing ?? false
      });
    }
  }, [initialized, privacySettings]);

  // Handle toggle change
  const handleToggleChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle save
  const handleSave = () => {
    // Update consent based on settings
    const newConsentGiven = settings.basicAnalytics || 
                           settings.usageTracking || 
                           settings.personalization || 
                           settings.marketingAnalytics || 
                           settings.thirdPartySharing;
    
    updateConsent(newConsentGiven);
    updatePrivacySettings(settings);
    
    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h2>Analytics Settings</h2>
        <p>Manage how we collect and use your data to improve your experience</p>
      </div>

      <div className={styles.settingsList}>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3>Basic Analytics</h3>
            <p>Essential analytics to ensure the platform functions properly</p>
          </div>
          <div className={styles.settingToggle}>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={settings.basicAnalytics} 
                onChange={() => handleToggleChange('basicAnalytics')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3>Usage Tracking</h3>
            <p>Track how you use features to help us improve them</p>
          </div>
          <div className={styles.settingToggle}>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={settings.usageTracking} 
                onChange={() => handleToggleChange('usageTracking')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3>Personalization</h3>
            <p>Allow us to personalize your experience based on your usage</p>
          </div>
          <div className={styles.settingToggle}>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={settings.personalization} 
                onChange={() => handleToggleChange('personalization')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3>Marketing Analytics</h3>
            <p>Help us understand which marketing channels are most effective</p>
          </div>
          <div className={styles.settingToggle}>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={settings.marketingAnalytics} 
                onChange={() => handleToggleChange('marketingAnalytics')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3>Third-Party Data Sharing</h3>
            <p>Allow sharing of anonymized data with trusted partners</p>
          </div>
          <div className={styles.settingToggle}>
            <label className={styles.toggle}>
              <input 
                type="checkbox" 
                checked={settings.thirdPartySharing} 
                onChange={() => handleToggleChange('thirdPartySharing')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.settingsFooter}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Preferences
        </button>
        <p className={styles.privacyNote}>
          View our <a href="/privacy-policy">Privacy Policy</a> for more information on how we handle your data
        </p>
      </div>
    </div>
  );
};

export default AnalyticsSettings;
