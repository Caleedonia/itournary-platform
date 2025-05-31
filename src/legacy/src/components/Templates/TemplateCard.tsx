"use client";

import React from 'react';
import Image from 'next/image';
import styles from './templateCard.module.css';
import { OccasionTemplate } from '@/types/templates';

interface TemplateCardProps {
  template: OccasionTemplate;
  onClick: (template: OccasionTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const {
    name,
    description,
    image,
    checklistItemCount,
    timelinePhaseCount,
    budgetCategoryCount,
    popularityScore,
    isFeatured,
    estimatedTimeSavings
  } = template;

  return (
    <div 
      className={styles.card} 
      onClick={() => onClick(template)}
      data-testid="template-card"
    >
      <div className={styles.imageContainer}>
        {image && (
          <Image
            src={image}
            alt={`${name} template`}
            width={300}
            height={200}
            className={styles.image}
          />
        )}
        {isFeatured && <span className={styles.featuredBadge}>Featured</span>}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>✓</span>
            <span className={styles.statValue}>{checklistItemCount} checklist items</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🕒</span>
            <span className={styles.statValue}>{timelinePhaseCount} timeline phases</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💰</span>
            <span className={styles.statValue}>{budgetCategoryCount} budget categories</span>
          </div>
        </div>
        
        {estimatedTimeSavings && (
          <div className={styles.timeSavings}>
            <span className={styles.timeSavingsIcon}>⏱️</span>
            <span className={styles.timeSavingsText}>Saves approximately {estimatedTimeSavings} of planning time</span>
          </div>
        )}
        
        {popularityScore > 8 && (
          <div className={styles.popularBadge}>
            <span className={styles.popularIcon}>🔥</span>
            <span className={styles.popularText}>Popular Choice</span>
          </div>
        )}
      </div>
      
      <button className={styles.previewButton}>
        Preview Template
      </button>
    </div>
  );
};

export default TemplateCard;
