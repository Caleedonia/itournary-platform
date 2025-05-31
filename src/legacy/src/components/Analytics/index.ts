"use client";

// Import analytics components
import AnalyticsConsentBanner from './AnalyticsConsentBanner';
import AnalyticsDashboard from './AnalyticsDashboard';
import AnalyticsDashboardIntegration from './AnalyticsDashboardIntegration';
import AnalyticsSettings from './AnalyticsSettings';
import AnalyticsDocumentation from './AnalyticsDocumentation';
import AnalyticsValidation from './AnalyticsValidation';
import TemplateAnalytics from './TemplateAnalytics';
import UserEngagementMetrics from './UserEngagementMetrics';

// Import the Analytics Provider from our context
import { AnalyticsProvider, useAnalytics } from '@/contexts/AnalyticsContext';

// Export all analytics components
export {
  AnalyticsConsentBanner,
  AnalyticsDashboard,
  AnalyticsDashboardIntegration,
  AnalyticsSettings,
  AnalyticsDocumentation,
  AnalyticsValidation,
  TemplateAnalytics,
  UserEngagementMetrics,
  AnalyticsProvider,
  useAnalytics
};
