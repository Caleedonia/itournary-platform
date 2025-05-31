'use client';

import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import styles from './home.module.css';

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to iTournary</h1>
        <p className={styles.description}>
          Your complete travel planning platform for all occasions
        </p>
        
        <div className={styles.featuredOccasions}>
          <h2>Plan Your Next Event</h2>
          <div className={styles.occasionGrid}>
            <div className={styles.occasionCard}>
              <h3>Wedding Planning</h3>
              <p>Create unforgettable wedding experiences</p>
              <a href="/occasions/wedding" className={styles.occasionLink}>
                Get Started
              </a>
            </div>
            
            <div className={styles.occasionCard}>
              <h3>Sports Tournaments</h3>
              <p>Organize team travel and accommodations</p>
              <a href="/occasions/sports" className={styles.occasionLink}>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}