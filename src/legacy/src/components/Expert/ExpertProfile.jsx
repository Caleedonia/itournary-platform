import React, { useState } from 'react';
import styles from './expertProfile.module.css';

// Mock data - in a real app, would come from an API based on expertId prop
const ExpertProfile = ({ expertId }) => {
  const [selectedTab, setSelectedTab] = useState('expertise');
  
  // Sample expert data
  const expertData = {
    id: 'expert-1',
    name: 'Olivia Rodriguez',
    role: 'Destination Wedding Specialist',
    location: 'Barcelona, Spain',
    yearsExperience: 12,
    bio: "As a certified destination wedding planner with over a decade of experience, I've helped couples create magical celebrations across Europe, the Caribbean, and Southeast Asia. My passion is transforming meaningful occasions into unforgettable experiences that honor both personal significance and cultural authenticity.",
    profileImage: '/images/experts/olivia.jpg',
    coverImage: '/images/experts/expert-cover.jpg',
    expertise: [
      {
        category: 'Destinations',
        items: ['Mediterranean', 'Caribbean', 'Southeast Asia', 'Pacific Islands']
      },
      {
        category: 'Occasion Types',
        items: ['Destination Weddings', 'Vow Renewals', 'Milestone Anniversaries', 'Elopements']
      },
      {
        category: 'Services',
        items: ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Vendor Curation']
      }
    ],
    credentials: [
      'Certified Destination Wedding Specialist',
      'Member of Association of Bridal Consultants',
      'International Event Planning Certification',
      'Fluent in English, Spanish, and Italian'
    ],
    successMetrics: {
      occasionsPlanned: 150,
      countriesWorked: 12,
      averageRating: 4.9,
      clientTestimonials: 87
    },
    testimonials: [
      {
        id: 1,
        name: 'Sarah & Michael',
        occasion: 'Wedding in Santorini',
        text: "Olivia turned our dream destination wedding into reality. Her attention to detail and cultural knowledge made our wedding in Santorini absolutely perfect. She thought of things we never would have considered!",
        rating: 5
      },
      {
        id: 2,
        name: 'The Johnson Family',
        occasion: 'Anniversary in Bali',
        text: "Planning our 30th anniversary celebration from across the world seemed impossible until we found Olivia. She handled everything with such care and created an experience our entire family will cherish forever.",
        rating: 5
      },
      {
        id: 3,
        name: 'James & David',
        occasion: 'Wedding in Barcelona',
        text: "Olivia's local knowledge and vendor relationships in Barcelona made our wedding planning process smooth and stress-free. She created a beautiful event that perfectly represented us as a couple.",
        rating: 5
      }
    ],
    insights: [
      {
        title: "Planning a Destination Wedding During Shoulder Season",
        description: "Why the months just before and after peak season offer better value and still-beautiful weather for your celebration.",
        likes: 142,
        comments: 38
      },
      {
        title: "Incorporating Local Traditions Into Your Destination Event",
        description: "How to respectfully blend local cultural elements with your personal celebration for a unique experience.",
        likes: 187,
        comments: 52
      },
      {
        title: "Essential Timeline for Destination Wedding Planning",
        description: "Month-by-month planning guidance to ensure nothing is forgotten when planning across borders.",
        likes: 215,
        comments: 64
      }
    ]
  };
  
  // Calculate aggregate rating
  const aggregateRating = expertData.testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0) / expertData.testimonials.length;
  
  return (
    <div className={styles.profileContainer}>
      {/* Expert Header Section */}
      <div 
        className={styles.expertHeader} 
        style={{ backgroundImage: `url(${expertData.coverImage})` }}
      >
        <div className={styles.headerOverlay}>
          <div className={styles.expertBasics}>
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImage}>
                {/* This would be an actual image in production */}
                {expertData.name.split(" ")[0][0] + expertData.name.split(" ")[1][0]}
              </div>
            </div>
            <div className={styles.expertInfo}>
              <h1 className={styles.expertName}>{expertData.name}</h1>
              <div className={styles.expertMeta}>
                <span className={styles.expertRole}>{expertData.role}</span>
                <span className={styles.expertLocation}>{expertData.location}</span>
                <span className={styles.expertExperience}>{expertData.yearsExperience} Years Experience</span>
              </div>
              <div className={styles.expertRating}>
                <div className={styles.ratingStars}>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < Math.round(aggregateRating) ? styles.filledStar : styles.emptyStar}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.ratingText}>{aggregateRating.toFixed(1)} ({expertData.testimonials.length} reviews)</span>
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.primaryButton}>Contact Olivia</button>
            <button className={styles.secondaryButton}>Save to Favorites</button>
          </div>
        </div>
      </div>
      
      {/* Expert Navigation */}
      <div className={styles.expertNavigation}>
        <button 
          className={`${styles.navButton} ${selectedTab === 'expertise' ? styles.active : ''}`}
          onClick={() => setSelectedTab('expertise')}
        >
          Expertise
        </button>
        <button 
          className={`${styles.navButton} ${selectedTab === 'about' ? styles.active : ''}`}
          onClick={() => setSelectedTab('about')}
        >
          About
        </button>
        <button 
          className={`${styles.navButton} ${selectedTab === 'testimonials' ? styles.active : ''}`}
          onClick={() => setSelectedTab('testimonials')}
        >
          Testimonials
        </button>
        <button 
          className={`${styles.navButton} ${selectedTab === 'insights' ? styles.active : ''}`}
          onClick={() => setSelectedTab('insights')}
        >
          Insights
        </button>
      </div>
      
      {/* Expert Content */}
      <div className={styles.expertContent}>
        {/* Expertise Tab */}
        {selectedTab === 'expertise' && (
          <div className={styles.expertiseContainer}>
            <div className={styles.expertiseGrid}>
              {expertData.expertise.map((category, index) => (
                <div key={index} className={styles.expertiseCategory}>
                  <h3 className={styles.categoryTitle}>{category.category}</h3>
                  <ul className={styles.expertiseList}>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={styles.expertiseItem}>
                        <span className={styles.expertiseCheck}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className={styles.credentialsSection}>
              <h3 className={styles.sectionTitle}>Credentials & Certifications</h3>
              <ul className={styles.credentialsList}>
                {expertData.credentials.map((credential, index) => (
                  <li key={index} className={styles.credentialItem}>
                    <div className={styles.credentialBadge}>
                      <i className="fas fa-certificate"></i>
                    </div>
                    <span className={styles.credentialText}>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.metricsSection}>
              <h3 className={styles.sectionTitle}>Experience at a Glance</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricNumber}>{expertData.successMetrics.occasionsPlanned}+</span>
                  <span className={styles.metricLabel}>Occasions Planned</span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricNumber}>{expertData.successMetrics.countriesWorked}</span>
                  <span className={styles.metricLabel}>Countries</span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricNumber}>{expertData.successMetrics.averageRating}</span>
                  <span className={styles.metricLabel}>Avg. Rating</span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricNumber}>{expertData.successMetrics.clientTestimonials}</span>
                  <span className={styles.metricLabel}>Testimonials</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* About Tab */}
        {selectedTab === 'about' && (
          <div className={styles.aboutContainer}>
            <div className={styles.bioSection}>
              <h3 className={styles.sectionTitle}>About {expertData.name.split(" ")[0]}</h3>
              <p className={styles.bioText}>{expertData.bio}</p>
              <p className={styles.bioText}>
                My approach combines meticulous planning with emotional intelligence. I believe that truly memorable celebrations honor both the significance of your occasion and the authentic culture of your chosen destination. Every detail is thoughtfully curated to tell your unique story.
              </p>
              <p className={styles.bioText}>
                When not planning unforgettable celebrations for my clients, you can find me exploring new destinations, studying local traditions, and building relationships with exceptional vendors around the world.
              </p>
            </div>
            
            <div className={styles.philosophySection}>
              <h3 className={styles.sectionTitle}>My Planning Philosophy</h3>
              <div className={styles.philosophyPoints}>
                <div className={styles.philosophyPoint}>
                  <div className={styles.philosophyIcon}>❤️</div>
                  <div className={styles.philosophyContent}>
                    <h4 className={styles.philosophyTitle}>Emotion-Centered</h4>
                    <p className={styles.philosophyText}>
                      Creating moments of genuine emotion and connection is at the heart of every occasion I plan.
                    </p>
                  </div>
                </div>
                <div className={styles.philosophyPoint}>
                  <div className={styles.philosophyIcon}>🏞️</div>
                  <div className={styles.philosophyContent}>
                    <h4 className={styles.philosophyTitle}>Destination Authentic</h4>
                    <p className={styles.philosophyText}>
                      I honor local cultures and traditions while creating experiences that feel authentic to both the location and to you.
                    </p>
                  </div>
                </div>
                <div className={styles.philosophyPoint}>
                  <div className={styles.philosophyIcon}>✨</div>
                  <div className={styles.philosophyContent}>
                    <h4 className={styles.philosophyTitle}>Meaningfully Detailed</h4>
                    <p className={styles.philosophyText}>
                      Every detail serves a purpose in creating a cohesive, significant experience that reflects your values.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Testimonials Tab */}
        {selectedTab === 'testimonials' && (
          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialsList}>
              {expertData.testimonials.map(testimonial => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <div className={styles.testimonialClient}>{testimonial.name}</div>
                    <div className={styles.testimonialOccasion}>{testimonial.occasion}</div>
                  </div>
                  <div className={styles.testimonialStars}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < testimonial.rating ? styles.filledStar : styles.emptyStar}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Insights Tab */}
        {selectedTab === 'insights' && (
          <div className={styles.insightsContainer}>
            <div className={styles.insightsList}>
              {expertData.insights.map((insight, index) => (
                <div key={index} className={styles.insightCard}>
                  <h3 className={styles.insightTitle}>{insight.title}</h3>
                  <p className={styles.insightDescription}>{insight.description}</p>
                  <div className={styles.insightMeta}>
                    <span className={styles.insightLikes}>
                      <i className="far fa-heart"></i> {insight.likes}
                    </span>
                    <span className={styles.insightComments}>
                      <i className="far fa-comment"></i> {insight.comments}
                    </span>
                  </div>
                  <button className={styles.readMoreButton}>Read Full Article</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className={styles.expertCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Create Your Memorable Experience?</h2>
          <p className={styles.ctaText}>
            Let Olivia help you plan an unforgettable destination celebration that honors your special occasion.
          </p>
          <button className={styles.ctaButton}>Schedule a Consultation</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
