'use client';

import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import styles from './about.module.css';

export default function AboutUs() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>About iTournary</h1>
        
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            At iTournary, we're dedicated to simplifying group travel planning for all types of occasions. 
            Whether it's a wedding, sports tournament, corporate retreat, or family reunion, 
            our platform provides the tools and resources needed to create memorable experiences.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            iTournary was founded in 2023 with a simple idea: make group travel planning easier. 
            After experiencing the challenges of coordinating travel for a sports tournament, 
            our founders realized there was a need for a comprehensive platform that could handle 
            the unique requirements of different occasion types.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            {/* Team member cards would go here */}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}