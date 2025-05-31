"use client";

import React from 'react';
import styles from './enhancedOccasionSelector.module.css';
import { OccasionTemplate } from '@/types/templates';
import Image from 'next/image';

interface EnhancedOccasionSelectorProps {
  occasionTypes: Array<{
    _id: string;
    name: string;
    description?: string;
    template?: OccasionTemplate;
  }>;
  selectedOccasionTypeId: string;
  onChange: (occasionTypeId: string) => void;
}

const EnhancedOccasionSelector: React.FC<EnhancedOccasionSelectorProps> = ({
  occasionTypes,
  selectedOccasionTypeId,
  onChange
}) => {
  const selectedOccasion = occasionTypes.find(ot => ot._id === selectedOccasionTypeId);
  const hasTemplate = selectedOccasion?.template !== undefined;

  return (
    <div className={styles.container}>
      <div className={styles.selectorWrapper}>
        <select
          className={styles.selector}
          value={selectedOccasionTypeId}
          onChange={(e) => onChange(e.target.value)}
          data-testid="occasion-selector"
        >
          <option value="" disabled>Select an occasion...</option>
          {occasionTypes.map(ot => (
            <option key={ot._id} value={ot._id}>
              {ot.name} {ot.template ? "✓" : ""}
            </option>
          ))}
        </select>
        <div className={styles.selectorIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {hasTemplate && (
        <div className={styles.templatePreview}>
          <div className={styles.templateHeader}>
            <div className={styles.templateIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className={styles.templateInfo}>
              <h4 className={styles.templateTitle}>Template Available!</h4>
              <p className={styles.templateDescription}>
                This occasion includes a planning template with pre-populated items
              </p>
            </div>
          </div>

          <div className={styles.templateStats}>
            <div className={styles.templateStat}>
              <span className={styles.statIcon}>✓</span>
              <span className={styles.statLabel}>Checklist Items:</span>
              <span className={styles.statValue}>{selectedOccasion?.template?.checklistItemCount || 0}</span>
            </div>
            <div className={styles.templateStat}>
              <span className={styles.statIcon}>🕒</span>
              <span className={styles.statLabel}>Timeline Phases:</span>
              <span className={styles.statValue}>{selectedOccasion?.template?.timelinePhaseCount || 0}</span>
            </div>
            <div className={styles.templateStat}>
              <span className={styles.statIcon}>💰</span>
              <span className={styles.statLabel}>Budget Categories:</span>
              <span className={styles.statValue}>{selectedOccasion?.template?.budgetCategoryCount || 0}</span>
            </div>
          </div>

          {selectedOccasion?.template?.estimatedTimeSavings && (
            <div className={styles.timeSavings}>
              <span className={styles.timeSavingsIcon}>⏱️</span>
              <span className={styles.timeSavingsText}>
                Saves approximately {selectedOccasion.template.estimatedTimeSavings} of planning time
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedOccasionSelector;
