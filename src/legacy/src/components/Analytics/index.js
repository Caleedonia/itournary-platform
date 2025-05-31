/**
 * Analytics Integration Module
 * 
 * This module exports all analytics components for easy integration
 */

// Core analytics components
import { AnalyticsProvider, useAnalytics, withPageTracking, useComponentTracking } from './AnalyticsProvider';
import AnalyticsDashboard from './AnalyticsDashboard';

// Dashboard components
import ExecutiveDashboard from './dashboards/ExecutiveDashboard';
import CommunityDashboard from './dashboards/CommunityDashboard';
import EmotionalDashboard from './dashboards/EmotionalDashboard';
import TrustDashboard from './dashboards/TrustDashboard';
import RetentionDashboard from './dashboards/RetentionDashboard';
import MobileDashboard from './dashboards/MobileDashboard';

// Visualization components
import MetricCard from './visualizations/MetricCard';
import LineChart from './visualizations/LineChart';
import BarChart from './visualizations/BarChart';
import PieChart from './visualizations/PieChart';
import HeatMap from './visualizations/HeatMap';
import FunnelChart from './visualizations/FunnelChart';
import Table from './visualizations/Table';

// Services
import { fetchAnalyticsData } from './services/analyticsDataService';
import { pushToDataLayer, trackPageView, trackUserAction } from './dataLayer';
import { initializeProviders } from './providers';
import * as eventTracking from './eventTracking';

// Export all components and utilities
export {
  // Core components
  AnalyticsProvider,
  useAnalytics,
  withPageTracking,
  useComponentTracking,
  AnalyticsDashboard,
  
  // Dashboard components
  ExecutiveDashboard,
  CommunityDashboard,
  EmotionalDashboard,
  TrustDashboard,
  RetentionDashboard,
  MobileDashboard,
  
  // Visualization components
  MetricCard,
  LineChart,
  BarChart,
  PieChart,
  HeatMap,
  FunnelChart,
  Table,
  
  // Services
  fetchAnalyticsData,
  pushToDataLayer,
  trackPageView,
  trackUserAction,
  initializeProviders,
  eventTracking
};

// Default export
export default {
  AnalyticsProvider,
  AnalyticsDashboard,
  useAnalytics,
  eventTracking
};
