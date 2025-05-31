import React, { useState } from 'react';
import styles from './analyticsValidation.module.css';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { simulateUserActivity, validateAnalyticsData } from './testing';

/**
 * Analytics Validation Component
 * 
 * This component provides tools for testing and validating the analytics system.
 */
const AnalyticsValidation = () => {
  const analytics = useAnalytics();
  const [simulationResults, setSimulationResults] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [eventCount, setEventCount] = useState(10);
  
  // Run analytics simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResults(null);
    
    try {
      // Run simulation
      const results = simulateUserActivity(analytics, eventCount);
      setSimulationResults(results);
    } catch (error) {
      console.error('Simulation failed:', error);
      setSimulationResults({
        error: true,
        message: error.message || 'Simulation failed'
      });
    } finally {
      setIsSimulating(false);
    }
  };
  
  // Validate analytics data
  const handleValidateAnalytics = () => {
    setIsValidating(true);
    setValidationResults(null);
    
    try {
      // For demonstration, we'll create mock analytics data
      // In a real application, you would fetch this from your analytics system
      const mockAnalyticsData = {
        events: Array.from({ length: 25 }, (_, i) => ({
          type: ['pageView', 'click', 'formSubmit', 'featureUse'][Math.floor(Math.random() * 4)],
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          data: { testMode: true }
        })),
        userId: analytics.getUserId() || 'anonymous',
        sessionId: 'test-session-' + Math.random().toString(36).substring(2, 15),
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date().toISOString()
      };
      
      // Validate the data
      const results = validateAnalyticsData(mockAnalyticsData);
      setValidationResults(results);
    } catch (error) {
      console.error('Validation failed:', error);
      setValidationResults({
        success: false,
        errors: [error.message || 'Validation failed']
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <div className={styles.validationContainer}>
      <div className={styles.controlPanel}>
        <h3 className={styles.sectionTitle}>Analytics Testing Tools</h3>
        
        <div className={styles.controlSection}>
          <h4 className={styles.controlTitle}>User Activity Simulation</h4>
          <p className={styles.description}>
            Simulate user activity by triggering a series of analytics events.
          </p>
          
          <div className={styles.controlRow}>
            <label className={styles.label}>
              Number of Events:
              <input 
                type="number"
                className={styles.input}
                value={eventCount}
                onChange={(e) => setEventCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="100"
              />
            </label>
            
            <button 
              className={styles.button}
              onClick={handleRunSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
          
          {simulationResults && (
            <div className={simulationResults.error ? styles.errorResults : styles.results}>
              {simulationResults.error ? (
                <p className={styles.errorMessage}>{simulationResults.message}</p>
              ) : (
                <>
                  <h5 className={styles.resultsTitle}>Simulation Results</h5>
                  <p>Total Events: {simulationResults.totalEvents}</p>
                  <div className={styles.eventTypeBreakdown}>
                    <h6 className={styles.breakdownTitle}>Event Type Breakdown:</h6>
                    <ul className={styles.breakdownList}>
                      {Object.entries(simulationResults.eventsByType).map(([type, count]) => (
                        <li key={type} className={styles.breakdownItem}>
                          <span className={styles.eventType}>{type}:</span>
                          <span className={styles.eventCount}>{count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className={styles.note}>
                    Note: All events were recorded with testMode=true and will not affect production analytics.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className={styles.controlSection}>
          <h4 className={styles.controlTitle}>Analytics Data Validation</h4>
          <p className={styles.description}>
            Validate analytics data for correctness and completeness.
          </p>
          
          <div className={styles.controlRow}>
            <button 
              className={styles.button}
              onClick={handleValidateAnalytics}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Validate Mock Data'}
            </button>
          </div>
          
          {validationResults && (
            <div className={validationResults.success ? styles.successResults : styles.errorResults}>
              <h5 className={styles.resultsTitle}>
                Validation {validationResults.success ? 'Successful' : 'Failed'}
              </h5>
              
              {validationResults.errors && validationResults.errors.length > 0 && (
                <div className={styles.issueSection}>
                  <h6 className={styles.issueTitle}>Errors:</h6>
                  <ul className={styles.issueList}>
                    {validationResults.errors.map((error, index) => (
                      <li key={`error-${index}`} className={styles.errorItem}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationResults.warnings && validationResults.warnings.length > 0 && (
                <div className={styles.issueSection}>
                  <h6 className={styles.issueTitle}>Warnings:</h6>
                  <ul className={styles.issueList}>
                    {validationResults.warnings.map((warning, index) => (
                      <li key={`warning-${index}`} className={styles.warningItem}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationResults.success && !validationResults.warnings?.length && (
                <p className={styles.successMessage}>All validation checks passed successfully.</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.analyticsStatus}>
        <h3 className={styles.sectionTitle}>Analytics System Status</h3>
        
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Tracking Enabled:</span>
          <span className={analytics.isAnalyticsEnabled ? styles.statusEnabled : styles.statusDisabled}>
            {analytics.isAnalyticsEnabled ? 'Yes' : 'No'}
          </span>
        </div>
        
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>User ID:</span>
          <span className={styles.statusValue}>{analytics.getUserId() || 'Not Available'}</span>
        </div>
        
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Preferences:</span>
          <div className={styles.preferencesContainer}>
            {Object.entries(analytics.getUserPreferences()).map(([key, value]) => (
              <div key={key} className={styles.preference}>
                <span className={styles.preferenceName}>{key}:</span>
                <span className={value ? styles.preferenceEnabled : styles.preferenceDisabled}>
                  {value ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.controls}>
          <button 
            className={analytics.isAnalyticsEnabled ? styles.disableButton : styles.enableButton}
            onClick={() => analytics.setAnalyticsEnabled(!analytics.isAnalyticsEnabled)}
          >
            {analytics.isAnalyticsEnabled ? 'Disable Analytics' : 'Enable Analytics'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsValidation;
