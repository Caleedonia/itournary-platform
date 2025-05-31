'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/Layout/MainLayout';
import { useGuest } from '../../../context/GuestContext';
import styles from './wedding.module.css';

export default function WeddingPlanningPage() {
  const { isGuest, promptSignUp } = useGuest();
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Wedding Planning</h1>
            <p className={styles.subtitle}>
              Create the perfect wedding experience with our comprehensive planning tools
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/create-itinerary" className={styles.primaryButton}>
                Start Planning Your Wedding
              </Link>
              {isGuest && (
                <button 
                  className={styles.secondaryButton}
                  onClick={() => promptSignUp("Create an account to save your wedding plans.")}
                >
                  Sign Up for Full Features
                </button>
              )}
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <img 
              src="/images/wedding-hero-placeholder.jpg" 
              alt="Elegant wedding scene" 
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}></div>
          </div>
        </div>
        
        <div className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2>Comprehensive Wedding Planning Tools</h2>
            <p>Everything you need to plan your perfect day</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureImageContainer}>
                <img 
                  src="/images/venue-placeholder.jpg" 
                  alt="Venue Selection" 
                  className={styles.featureImage}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Venue Selection</h3>
                <p>Browse and compare wedding venues with detailed information, photos, and availability.</p>
                <ul className={styles.featureList}>
                  <li>Filter by location, capacity, and style</li>
                  <li>View virtual tours and photo galleries</li>
                  <li>Compare pricing and amenities</li>
                  <li>Check date availability in real-time</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImageContainer}>
                <img 
                  src="/images/guest-placeholder.jpg" 
                  alt="Guest Management" 
                  className={styles.featureImage}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Guest Management</h3>
                <p>Effortlessly manage your guest list, RSVPs, and special accommodations.</p>
                <ul className={styles.featureList}>
                  <li>Digital invitations and RSVP tracking</li>
                  <li>Meal preference and dietary restriction management</li>
                  <li>Accommodation recommendations for guests</li>
                  <li>Seating arrangement planning</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImageContainer}>
                <img 
                  src="/images/budget-placeholder.jpg" 
                  alt="Budget Tracker" 
                  className={styles.featureImage}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Budget Tracker</h3>
                <p>Stay on top of your wedding expenses with our comprehensive budget tools.</p>
                <ul className={styles.featureList}>
                  <li>Customizable budget categories</li>
                  <li>Expense tracking and payment scheduling</li>
                  <li>Vendor payment management</li>
                  <li>Budget analytics and reports</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureImageContainer}>
                <img 
                  src="/images/timeline-placeholder.jpg" 
                  alt="Timeline Planning" 
                  className={styles.featureImage}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Timeline Planning</h3>
                <p>Create a detailed schedule for your wedding day and the events leading up to it.</p>
                <ul className={styles.featureList}>
                  <li>Customizable wedding day timeline</li>
                  <li>Pre-wedding event scheduling</li>
                  <li>Vendor arrival and setup coordination</li>
                  <li>Automated reminders and notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.showcase}>
          <div className={styles.showcaseContent}>
            <h2>Your Dream Wedding, Perfectly Planned</h2>
            <p>
              From the engagement to the honeymoon, iTournary helps you plan every aspect of your wedding journey with ease and confidence.
            </p>
            <div className={styles.showcaseStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5,000+</span>
                <span className={styles.statLabel}>Weddings Planned</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Satisfaction Rate</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Planning Tools</span>
              </div>
            </div>
            <Link href="/create-itinerary" className={styles.primaryButton}>
              Start Planning Your Wedding
            </Link>
          </div>
          <div className={styles.showcaseImageContainer}>
            <img 
              src="/images/wedding-showcase-placeholder.jpg" 
              alt="Wedding planning showcase" 
              className={styles.showcaseImage}
            />
          </div>
        </div>
        
        <div className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <h2>Success Stories</h2>
            <p>Hear from couples who planned their perfect wedding with iTournary</p>
          </div>
          
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <img 
                src="/images/testimonial1-placeholder.jpg" 
                alt="Jessica and Michael" 
                className={styles.testimonialImage}
              />
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "iTournary made planning our destination wedding in Italy so much easier. The guest management features were a lifesaver!"
                </p>
                <div className={styles.testimonialAuthor}>
                  <h4>Jessica & Michael</h4>
                  <p>Destination Wedding in Rome</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <img 
                src="/images/testimonial2-placeholder.jpg" 
                alt="David and Sarah" 
                className={styles.testimonialImage}
              />
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "The budget tracking tools kept us on target and helped us save thousands on our dream wedding."
                </p>
                <div className={styles.testimonialAuthor}>
                  <h4>David & Sarah</h4>
                  <p>Beach Wedding in Hawaii</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <img 
                src="/images/testimonial3-placeholder.jpg" 
                alt="Emma and James" 
                className={styles.testimonialImage}
              />
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "From venue selection to day-of coordination, iTournary helped us create the perfect wedding weekend."
                </p>
                <div className={styles.testimonialAuthor}>
                  <h4>Emma & James</h4>
                  <p>Mountain Resort Wedding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isGuest && (
          <div className={styles.signUpBanner}>
            <div className={styles.bannerContent}>
              <h2>Ready to start planning your dream wedding?</h2>
              <p>
                Create a free account to save your wedding plans, collaborate with your partner, and access all our premium planning tools.
              </p>
            </div>
            <button 
              className={styles.bannerButton}
              onClick={() => promptSignUp("Create an account to start planning your wedding.")}
            >
              Sign Up Now
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
