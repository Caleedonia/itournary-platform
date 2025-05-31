'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import { useGuest } from '../context/GuestContext';
import styles from './home.module.css';

export default function Home() {
  const { isGuest, promptSignUp } = useGuest();
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Plan Your Perfect <span className={styles.highlight}>Journey</span>
            </h1>
            <p className={styles.subtitle}>
              Create personalized itineraries for weddings, sports tournaments, and more
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/create-itinerary" className={styles.primaryButton}>
                Start Planning
              </Link>
              {isGuest && (
                <button 
                  className={styles.secondaryButton}
                  onClick={() => promptSignUp("Create an account to unlock all features.")}
                >
                  Sign Up Free
                </button>
              )}
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <img 
              src="/images/hero-placeholder.jpg" 
              alt="Scenic travel destination" 
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}></div>
          </div>
        </div>
        
        <div className={styles.featuredOccasions}>
          <div className={styles.sectionHeader}>
            <h2>Plan Your Perfect Occasion</h2>
            <p>Specialized planning tools for every type of event</p>
          </div>
          
          <div className={styles.occasionGrid}>
            <div className={styles.occasionCard}>
              <div className={styles.occasionImageContainer}>
                <img 
                  src="/images/occasion-wedding-placeholder.jpg" 
                  alt="Wedding Planning" 
                  className={styles.occasionImage}
                />
                <div className={styles.occasionOverlay}></div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Wedding Planning</h3>
                <p>Create unforgettable wedding experiences with our comprehensive planning tools.</p>
                <ul className={styles.occasionFeatures}>
                  <li>Venue selection assistance</li>
                  <li>Guest management</li>
                  <li>Budget tracking</li>
                  <li>Timeline planning</li>
                </ul>
                <Link href="/occasions/wedding" className={styles.occasionLink}>
                  Explore Wedding Planning
                  <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className={styles.occasionCard}>
              <div className={styles.occasionImageContainer}>
                <img 
                  src="/images/occasion-sports-placeholder.jpg" 
                  alt="Sports Tournament" 
                  className={styles.occasionImage}
                />
                <div className={styles.occasionOverlay}></div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Sports Tournaments</h3>
                <p>Organize team travel and accommodations with specialized tournament planning.</p>
                <ul className={styles.occasionFeatures}>
                  <li>Team registration</li>
                  <li>Accommodation coordination</li>
                  <li>Transportation planning</li>
                  <li>Tournament scheduling</li>
                </ul>
                <Link href="/occasions/sports" className={styles.occasionLink}>
                  Explore Tournament Planning
                  <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className={styles.occasionCard}>
              <div className={styles.occasionImageContainer}>
                <img 
                  src="/images/occasion-corporate-placeholder.jpg" 
                  alt="Corporate Retreat" 
                  className={styles.occasionImage}
                />
                <div className={styles.occasionOverlay}></div>
                <div className={styles.comingSoonBadge}>Coming Soon</div>
              </div>
              <div className={styles.occasionContent}>
                <h3>Corporate Retreats</h3>
                <p>Plan productive and engaging corporate retreats and team-building events.</p>
                <ul className={styles.occasionFeatures}>
                  <li>Venue selection</li>
                  <li>Activity planning</li>
                  <li>Meeting scheduling</li>
                  <li>Travel coordination</li>
                </ul>
                <Link href="/occasions/corporate" className={styles.occasionLink}>
                  Learn More
                  <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.howItWorks}>
          <div className={styles.sectionHeader}>
            <h2>How iTournary Works</h2>
            <p>Simple steps to plan your perfect occasion</p>
          </div>
          
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <span role="img" aria-label="Choose Occasion" style={{fontSize: '2.5rem'}}>🎯</span>
                </div>
                <h3>Choose Your Occasion</h3>
                <p>Select the type of event you're planning, whether it's a wedding, sports tournament, or other occasion.</p>
              </div>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <span role="img" aria-label="Customize Plan" style={{fontSize: '2.5rem'}}>✏️</span>
                </div>
                <h3>Customize Your Plan</h3>
                <p>Input your preferences, dates, and requirements to create a personalized itinerary.</p>
              </div>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <span role="img" aria-label="Collaborate" style={{fontSize: '2.5rem'}}>👥</span>
                </div>
                <h3>Collaborate & Share</h3>
                <p>Invite others to view and contribute to your plans, ensuring everyone is on the same page.</p>
              </div>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>
                  <span role="img" aria-label="Enjoy Trip" style={{fontSize: '2.5rem'}}>🎉</span>
                </div>
                <h3>Enjoy Your Trip</h3>
                <p>Access your itinerary anytime, anywhere, and make the most of your perfectly planned occasion.</p>
              </div>
            </div>
          </div>
          
          <div className={styles.ctaContainer}>
            <Link href="/create-itinerary" className={styles.primaryButton}>
              Start Planning Now
            </Link>
          </div>
        </div>
        
        <div className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2>Why Choose iTournary?</h2>
            <p>Tools designed to make your planning experience seamless</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🗺️</div>
              <h3>All-in-One Planning</h3>
              <p>
                Manage accommodations, transportation, activities, and more in one place.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👥</div>
              <h3>Group Coordination</h3>
              <p>
                Easily coordinate travel plans with friends, family, or team members.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Budget Tracking</h3>
              <p>
                Keep track of expenses and stay within your budget.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Mobile Access</h3>
              <p>
                Access your itineraries on any device, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <h2>What Our Users Say</h2>
            <p>Real experiences from iTournary planners</p>
          </div>
          
          <div className={styles.testimonialsSlider}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className={styles.testimonialText}>
                  "iTournary made planning our destination wedding so much easier. The guest management features saved us countless hours of work, and the budget tracking kept us on target."
                </p>
                <div className={styles.testimonialRating}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialInfo}>
                  <h4>Sarah J.</h4>
                  <p>Wedding Planner</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className={styles.testimonialText}>
                  "As a coach, coordinating team travel for tournaments was always a headache until we found iTournary. Now our players and parents always know exactly where to be and when."
                </p>
                <div className={styles.testimonialRating}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialInfo}>
                  <h4>Michael T.</h4>
                  <p>Youth Soccer Coach</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className={styles.testimonialText}>
                  "The collaboration features are fantastic! Our entire family contributed to planning our reunion, and everyone could see the itinerary updates in real-time."
                </p>
                <div className={styles.testimonialRating}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                </div>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialInfo}>
                  <h4>Jennifer R.</h4>
                  <p>Family Reunion Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isGuest && (
          <div className={styles.signUpBanner}>
            <div className={styles.bannerContent}>
              <h2>Ready to unlock all features?</h2>
              <p>
                Create a free account to save your itineraries, collaborate with travel companions, and access premium features.
              </p>
            </div>
            <button 
              className={styles.bannerButton}
              onClick={() => promptSignUp("Create an account to unlock all features.")}
            >
              Sign Up Now
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
