
import React, { useState } from 'react';
import OccasionCard from './OccasionCard';
import styles from './occasionHub.module.css';

const OccasionHub = () => {
  const [filter, setFilter] = useState('all');
  
  // Sample occasion data - in a real app, this would come from an API
  const occasions = [
    {
      id: 1,
      title: 'Wedding',
      description: 'Create unforgettable memories for your special day.',
      image: '/images/occasions/wedding.jpg',
      color: '#E83E8C', // Romantic Rose
      category: 'Celebrations'
    },
    {
      id: 2,
      title: 'Family Reunion',
      description: 'Reconnect with loved ones in remarkable destinations.',
      image: '/images/occasions/family-reunion.jpg',
      color: '#FFA000', // Warm Amber
      category: 'Family'
    },
    {
      id: 3,
      title: 'Milestone Birthday',
      description: "Celebrate life's significant moments in style.",
      image: '/images/occasions/milestone-birthday.jpg',
      color: '#9B59B6', // Festive Purple
      category: 'Celebrations'
    },
    {
      id: 4,
      title: 'Anniversary',
      description: 'Honor your journey together with an exceptional experience.',
      image: '/images/occasions/anniversary.jpg',
      color: '#FF6B6B', // Vibrant Coral
      category: 'Celebrations'
    },
    {
      id: 5,
      title: 'Graduation',
      description: 'Commemorate academic achievements with remarkable journeys.',
      image: '/images/occasions/graduation.jpg',
      color: '#3498DB', // Professional Blue
      category: 'Milestones'
    }
  ];
  
  const categories = ['all', 'Celebrations', 'Family', 'Milestones'];
  
  const filteredOccasions = filter === 'all'
    ? occasions
    : occasions.filter(occasion => occasion.category === filter);
  
  return (
    <div className={styles.occasionHubContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Find Your Perfect Occasion</h1>
        <p className={styles.subtitle}>
          Choose from our curated collection of extraordinary occasions designed to create lasting memories
        </p>
      </div>
      
      <div className={styles.filterContainer}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'All Occasions' : category}
          </button>
        ))}
      </div>
      
      <div className={styles.occasionsGrid}>
        {filteredOccasions.map(occasion => (
          <OccasionCard 
            key={occasion.id} 
            title={occasion.title}
            description={occasion.description}
            image={occasion.image}
            color={occasion.color}
            category={occasion.category}
          />
        ))}
      </div>
      
      <div className={styles.personalizationSection}>
        <h2 className={styles.sectionTitle}>Cannot Find Your Occasion?</h2>
        <p className={styles.sectionText}>
          We specialize in creating personalized experiences for any meaningful moment in your life.
        </p>
        <button className={styles.customButton}>
          Create Custom Occasion
        </button>
      </div>
      
      <div className={styles.communitySection}>
        <h2 className={styles.sectionTitle}>From Our Community</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonial}>
            <p className={styles.testimonialText}>
              "Our destination wedding was absolutely magical! The entire experience exceeded our expectations."
            </p>
            <p className={styles.testimonialAuthor}>- Emily & David, Wedding in Santorini</p>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonialText}>
              "Planning our family reunion through this platform made everything so simple. Memories we will cherish forever!"
            </p>
            <p className={styles.testimonialAuthor}>- The Williams Family, Costa Rica</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccasionHub;
