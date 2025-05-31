/**
 * Analytics Documentation Component
 * 
 * This component provides documentation for the analytics system
 */

import React from 'react';
import styles from './analyticsDocumentation.module.css';

/**
 * Analytics Documentation Component
 */
const AnalyticsDocumentation = () => {
  return (
    <div className={styles.documentationContainer}>
      <div className={styles.documentationHeader}>
        <h2>Analytics System Documentation</h2>
        <p>Comprehensive guide to using the iTournary Analytics System</p>
      </div>

      <div className={styles.documentationSection}>
        <h3>Getting Started</h3>
        <p>
          The iTournary Analytics System provides comprehensive tracking, visualization, and reporting
          capabilities for understanding user behavior and business performance. This documentation
          will guide you through integrating and using the analytics system in your components.
        </p>
      </div>

      <div className={styles.documentationSection}>
        <h3>Core Components</h3>
        <ul>
          <li>
            <strong>AnalyticsProvider</strong> - Context provider that initializes the analytics system
            and provides access to analytics functions and state.
          </li>
          <li>
            <strong>AnalyticsDashboard</strong> - Main dashboard component that displays analytics data
            based on the selected dashboard type.
          </li>
          <li>
            <strong>AnalyticsSettings</strong> - Component for managing analytics privacy settings.
          </li>
          <li>
            <strong>AnalyticsConsentBanner</strong> - Banner for obtaining user consent for analytics tracking.
          </li>
        </ul>
      </div>

      <div className={styles.documentationSection}>
        <h3>Integration</h3>
        <p>
          To integrate the analytics system into your application, wrap your root component with the
          AnalyticsProvider:
        </p>
        <pre className={styles.codeBlock}>
{`import { AnalyticsProvider } from './components/Analytics';

function App() {
  return (
    <AnalyticsProvider>
      <YourApp />
    </AnalyticsProvider>
  );
}`}
        </pre>
      </div>

      <div className={styles.documentationSection}>
        <h3>Tracking Events</h3>
        <p>
          Use the provided hooks and functions to track events in your components:
        </p>
        <pre className={styles.codeBlock}>
{`import { useAnalytics, trackUserAction } from './components/Analytics';

function YourComponent() {
  const { initialized, consentGiven } = useAnalytics();

  const handleButtonClick = () => {
    if (initialized && consentGiven) {
      trackUserAction('button_click', 'example_button', {
        // Additional properties
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <button onClick={handleButtonClick}>
      Click me
    </button>
  );
}`}
        </pre>
      </div>

      <div className={styles.documentationSection}>
        <h3>Feature-Specific Integration</h3>
        <p>
          Each feature has a dedicated analytics integration component that provides
          tracking functions specific to that feature:
        </p>
        <ul>
          <li><strong>TimelineAnalyticsIntegration</strong> - For timeline feature</li>
          <li><strong>BudgetAnalyticsIntegration</strong> - For budget feature</li>
          <li><strong>CommunityAnalyticsIntegration</strong> - For community feature</li>
          <li><strong>EmotionalAnalyticsIntegration</strong> - For emotional experience feature</li>
          <li><strong>TrustAnalyticsIntegration</strong> - For trust ecosystem feature</li>
          <li><strong>RetentionAnalyticsIntegration</strong> - For retention feature</li>
          <li><strong>MobileAnalyticsIntegration</strong> - For mobile experience feature</li>
        </ul>
      </div>

      <div className={styles.documentationSection}>
        <h3>Dashboards</h3>
        <p>
          The analytics system provides several dashboards for different aspects of the platform:
        </p>
        <ul>
          <li><strong>Executive Dashboard</strong> - Overview of key metrics for administrators</li>
          <li><strong>Community Dashboard</strong> - Metrics on community engagement and content</li>
          <li><strong>Emotional Dashboard</strong> - Metrics on emotional experience features</li>
          <li><strong>Trust Dashboard</strong> - Metrics on trust indicators and reviews</li>
          <li><strong>Retention Dashboard</strong> - Metrics on user retention and loyalty</li>
          <li><strong>Mobile Dashboard</strong> - Metrics on mobile usage and PWA performance</li>
        </ul>
      </div>

      <div className={styles.documentationSection}>
        <h3>Privacy Compliance</h3>
        <p>
          The analytics system is designed with privacy in mind and includes:
        </p>
        <ul>
          <li>User consent management</li>
          <li>Granular privacy settings</li>
          <li>Data anonymization options</li>
          <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
        </ul>
      </div>

      <div className={styles.documentationFooter}>
        <p>
          For more detailed information, please refer to the API documentation or contact the development team.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDocumentation;
