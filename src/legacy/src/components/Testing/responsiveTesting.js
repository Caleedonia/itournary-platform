/**
 * Responsive Design Testing Module
 * This file contains utilities for testing responsive behavior across different screen sizes
 */

import React from 'react';

// Screen size breakpoints matching our CSS media queries
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  widescreen: 1536
};

// Helper function to check if element is visible in current viewport
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Component to visualize current breakpoint for testing
export const ResponsiveIndicator = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState('');
  
  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < breakpoints.mobile) {
        setCurrentBreakpoint('xs');
      } else if (width < breakpoints.tablet) {
        setCurrentBreakpoint('sm');
      } else if (width < breakpoints.laptop) {
        setCurrentBreakpoint('md');
      } else if (width < breakpoints.desktop) {
        setCurrentBreakpoint('lg');
      } else {
        setCurrentBreakpoint('xl');
      }
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return (
    <div className="responsive-indicator" style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(44, 62, 80, 0.8)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      {currentBreakpoint} ({window.innerWidth}px)
    </div>
  );
};

// Test component to verify responsive layouts
export const ResponsiveTester = ({ children }) => {
  return (
    <div className="responsive-tester">
      {children}
      <ResponsiveIndicator />
    </div>
  );
};

// Accessibility checker component
export const AccessibilityChecker = ({ component }) => {
  const [issues, setIssues] = React.useState([]);
  
  React.useEffect(() => {
    // Basic accessibility checks
    const checkAccessibility = () => {
      const newIssues = [];
      const element = document.getElementById('accessibility-test-container');
      
      if (!element) return;
      
      // Check for images without alt text
      const images = element.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt) {
          newIssues.push(`Image #${index + 1} is missing alt text`);
        }
      });
      
      // Check for proper heading hierarchy
      const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastHeadingLevel = 0;
      headings.forEach((heading, index) => {
        const currentLevel = parseInt(heading.tagName.substring(1));
        if (currentLevel > lastHeadingLevel + 1 && index > 0) {
          newIssues.push(`Heading hierarchy skips from h${lastHeadingLevel} to h${currentLevel}`);
        }
        lastHeadingLevel = currentLevel;
      });
      
      // Check for sufficient color contrast (simplified)
      const elements = element.querySelectorAll('*');
      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        if (color === 'rgba(0, 0, 0, 0)' || bgColor === 'rgba(0, 0, 0, 0)') {
          // Skip elements with transparent colors
          return;
        }
      });
      
      setIssues(newIssues);
    };
    
    setTimeout(checkAccessibility, 1000);
  }, [component]);
  
  return (
    <div className="accessibility-checker">
      <div id="accessibility-test-container">
        {component}
      </div>
      {issues.length > 0 && (
        <div className="accessibility-issues" style={{
          margin: '20px',
          padding: '15px',
          border: '1px solid #ff6b6b',
          borderRadius: '4px',
          background: '#fff5f5'
        }}>
          <h3>Accessibility Issues</h3>
          <ul>
            {issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default {
  ResponsiveIndicator,
  ResponsiveTester,
  AccessibilityChecker,
  breakpoints,
  isElementInViewport
};
