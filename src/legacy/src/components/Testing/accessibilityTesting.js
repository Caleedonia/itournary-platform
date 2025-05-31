/**
 * Accessibility Testing Module
 * This file contains utilities for testing accessibility compliance
 */

import React from 'react';

// Component to check for common accessibility issues
export const AccessibilityValidator = ({ children }) => {
  const [validationResults, setValidationResults] = React.useState({
    errors: [],
    warnings: [],
    passed: []
  });
  
  React.useEffect(() => {
    // Run validation after component mounts and DOM is available
    setTimeout(() => {
      const container = document.getElementById('a11y-validation-container');
      if (!container) return;
      
      const errors = [];
      const warnings = [];
      const passed = [];
      
      // Check images for alt text
      const images = container.querySelectorAll('img');
      if (images.length > 0) {
        let allImagesHaveAlt = true;
        images.forEach((img, i) => {
          if (!img.hasAttribute('alt')) {
            errors.push(`Image #${i + 1} missing alt text`);
            allImagesHaveAlt = false;
          }
        });
        
        if (allImagesHaveAlt) {
          passed.push('All images have alt text');
        }
      }
      
      // Check for heading structure
      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      if (headings.length > 0) {
        const headingLevels = headings.map(h => parseInt(h.tagName[1]));
        
        // Check if there's an H1
        if (!headingLevels.includes(1)) {
          warnings.push('No H1 heading found');
        } else {
          passed.push('H1 heading present');
        }
        
        // Check for skipped heading levels
        let previousLevel = 0;
        let skippedLevels = false;
        
        headingLevels.forEach((level, i) => {
          if (i === 0) {
            previousLevel = level;
            return;
          }
          
          if (level > previousLevel + 1) {
            warnings.push(`Heading level skipped from H${previousLevel} to H${level}`);
            skippedLevels = true;
          }
          
          previousLevel = level;
        });
        
        if (!skippedLevels && headings.length > 1) {
          passed.push('Heading structure is sequential');
        }
      }
      
      // Check for keyboard navigability
      const interactiveElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]');
      let allInteractiveElementsAccessible = true;
      
      interactiveElements.forEach((el, i) => {
        if (el.tabIndex < 0 && !el.hasAttribute('aria-hidden')) {
          warnings.push(`Interactive element #${i + 1} not keyboard accessible`);
          allInteractiveElementsAccessible = false;
        }
      });
      
      if (allInteractiveElementsAccessible && interactiveElements.length > 0) {
        passed.push('All interactive elements are keyboard accessible');
      }
      
      // Check for form labels
      const formInputs = container.querySelectorAll('input, select, textarea');
      let allInputsLabeled = true;
      
      formInputs.forEach((input, i) => {
        const id = input.getAttribute('id');
        if (id) {
          const label = container.querySelector(`label[for="${id}"]`);
          if (!label && !input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
            errors.push(`Form input #${i + 1} has no associated label`);
            allInputsLabeled = false;
          }
        } else if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
          errors.push(`Form input #${i + 1} has no ID and no aria-label`);
          allInputsLabeled = false;
        }
      });
      
      if (allInputsLabeled && formInputs.length > 0) {
        passed.push('All form inputs have proper labels');
      }
      
      setValidationResults({ errors, warnings, passed });
    }, 1000);
  }, [children]);
  
  return (
    <div className="accessibility-validator">
      <div id="a11y-validation-container">
        {children}
      </div>
      
      <div className="validation-results" style={{ 
        position: 'fixed', 
        bottom: '10px', 
        left: '10px', 
        maxWidth: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        zIndex: 9999,
        fontSize: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Accessibility Check</h4>
        
        {validationResults.errors.length > 0 && (
          <div>
            <h5 style={{ color: '#d32f2f', margin: '5px 0' }}>Errors ({validationResults.errors.length})</h5>
            <ul style={{ margin: '0 0 10px 0', padding: '0 0 0 20px' }}>
              {validationResults.errors.map((error, i) => (
                <li key={`error-${i}`}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {validationResults.warnings.length > 0 && (
          <div>
            <h5 style={{ color: '#f57c00', margin: '5px 0' }}>Warnings ({validationResults.warnings.length})</h5>
            <ul style={{ margin: '0 0 10px 0', padding: '0 0 0 20px' }}>
              {validationResults.warnings.map((warning, i) => (
                <li key={`warning-${i}`}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
        
        {validationResults.passed.length > 0 && (
          <div>
            <h5 style={{ color: '#388e3c', margin: '5px 0' }}>Passed ({validationResults.passed.length})</h5>
            <ul style={{ margin: '0', padding: '0 0 0 20px' }}>
              {validationResults.passed.map((pass, i) => (
                <li key={`pass-${i}`}>{pass}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityValidator;
