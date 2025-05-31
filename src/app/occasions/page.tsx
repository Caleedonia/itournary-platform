'use client';

import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import styles from './occasions.module.css';

export default function OccasionsHub() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Occasions</h1>
        <p className={styles.description}>
          Choose the type of occasion you're planning
        </p>
        
        <div className={styles.occasionGrid}>
          <div className={styles.occasionCard}>
            <h2>Wedding Planning</h2>
            <p>Plan your perfect wedding day with comprehensive tools for venues, guests, and more</p>
            <a href="/occasions/wedding" className={styles.occasionLink}>
              Start Planning
            </a>
          </div>
          
          <div className={styles.occasionCard}>
            <h2>Sports Tournaments</h2>
            <p>Coordinate team travel, accommodations, and activities for sports events</p>
            <a href="/occasions/sports" className={styles.occasionLink}>
              Start Planning
            </a>
          </div>
          
          <div className={styles.occasionCard}>
            <h2>Corporate Retreats</h2>
            <p>Organize memorable company events and team-building experiences</p>
            <a href="/occasions/corporate" className={styles.occasionLink}>
              Coming Soon
            </a>
          </div>
          
          <div className={styles.occasionCard}>
            <h2>Family Reunions</h2>
            <p>Bring everyone together with coordinated travel and accommodation planning</p>
            <a href="/occasions/family" className={styles.occasionLink}>
              Coming Soon
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}