import React from 'react';
import Link from 'next/link';
import styles from './homepage.module.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import OccasionCard from '../Occasion/OccasionCard';

const Homepage = () => {
  // Sample occasion data
  const occasions = [
    {
      id: 1,
      title: 'Birthday',
      description: 'A perfect celebration to honor another year of life.',
      image: '/images/occasions/birthday.jpg',
      color: '#FF6B6B' // Vibrant Coral
    },
    {
      id: 2,
      title: 'Anniversary',
      description: 'Celebrate your special moments and milestones together.',
      image: '/images/occasions/anniversary.jpg',
      color: '#4ECDC4' // Soft Teal
    },
    {
      id: 3,
      title: 'Family Vacation',
      description: 'Create unforgettable experiences with your family.',
      image: '/images/occasions/family.jpg',
      color: '#FFA000' // Warm Amber
    },
    {
      id: 4,
      title: 'Friends Trip',
      description: 'Unforgettable adventures with friends.',
      image: '/images/occasions/friends.jpg',
      color: '#3498DB' // Professional Blue
    }
  ];

  // Sample community stories
  const stories = [
    {
      id: 1,
      title: 'Our Dream Wedding in Bali',
      author: 'Sarah & Michael',
      image: '/images/stories/wedding.jpg',
      excerpt: 'Planning our destination wedding seemed overwhelming until iTournary helped us organize everything perfectly.',
      likes: 245,
      occasion: 'Wedding'
    },
    {
      id: 2,
      title: 'Family Reunion in Tuscany',
      author: 'The Johnson Family',
      image: '/images/stories/family.jpg',
      excerpt: 'Bringing 18 family members from 4 countries together was made simple with collaborative planning.',
      likes: 189,
      occasion: 'Family Reunion'
    },
    {
      id: 3,
      title: 'Corporate Retreat Success',
      author: 'TechVision Inc.',
      image: '/images/stories/corporate.jpg',
      excerpt: 'Our team building retreat was seamlessly organized and created lasting bonds among our team.',
      likes: 156,
      occasion: 'Corporate Retreat'
    }
  ];

  return (
    <div className={styles.homepageContainer}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Plan Occasions That Matter</h1>
          <p className={styles.heroSubtitle}>Create meaningful travel experiences centered around life's special moments</p>
          <Link href="/occasions" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Occasions Section */}
      <section className={styles.occasionsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Choose Your Occasion</h2>
          <p className={styles.sectionSubtitle}>Every journey begins with a meaningful occasion</p>
          
          <div className={styles.occasionsGrid}>
            {occasions.map(occasion => (
              <OccasionCard 
                key={occasion.id}
                title={occasion.title}
                description={occasion.description}
                image={occasion.image}
                color={occasion.color}
                link={`/occasions/${occasion.id}`}
              />
            ))}
          </div>
          
          <Link href="/occasions" className={styles.viewAllLink}>
            View All Occasions <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className={styles.valueSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.valueContent}>
            <h2 className={styles.sectionTitle}>Why iTournary?</h2>
            
            <div className={styles.valueGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/occasion.svg" alt="Occasion-first approach" />
                </div>
                <h3 className={styles.valueTitle}>Occasion-First Approach</h3>
                <p className={styles.valueDescription}>We focus on the "why" behind your travel, not just the destination.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/community.svg" alt="Community wisdom" />
                </div>
                <h3 className={styles.valueTitle}>Community Wisdom</h3>
                <p className={styles.valueDescription}>Learn from others who've planned similar occasions successfully.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/emotional.svg" alt="Emotional intelligence" />
                </div>
                <h3 className={styles.valueTitle}>Emotional Intelligence</h3>
                <p className={styles.valueDescription}>Planning tools that understand the emotional significance of your journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className={styles.storiesSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Community Stories</h2>
          <p className={styles.sectionSubtitle}>Real experiences from our community members</p>
          
          <div className={styles.storiesGrid}>
            {stories.map(story => (
              <div key={story.id} className={styles.storyCard}>
                <div className={styles.storyImage}>
                  <img src={story.image} alt={story.title} />
                  <span className={styles.storyOccasion}>{story.occasion}</span>
                </div>
                <div className={styles.storyContent}>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyAuthor}>By {story.author}</p>
                  <p className={styles.storyExcerpt}>{story.excerpt}</p>
                  <div className={styles.storyFooter}>
                    <span className={styles.storyLikes}>{story.likes} people found this helpful</span>
                    <Link href={`/stories/${story.id}`} className={styles.storyLink}>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/community" className={styles.viewAllLink}>
            Explore All Stories <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Plan Your Next Meaningful Journey?</h2>
          <p className={styles.ctaDescription}>Join thousands of travelers who've created unforgettable experiences with iTournary</p>
          <Link href="/signup" className={styles.ctaButtonLarge}>
            Start Planning Today
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Homepage;
