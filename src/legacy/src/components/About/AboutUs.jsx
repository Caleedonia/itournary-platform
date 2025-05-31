import React from 'react';
import styles from './aboutUs.module.css';

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Emma Thompson',
      role: 'Founder & CEO',
      bio: 'With over 15 years in luxury travel and event planning, Emma founded iTournary to revolutionize how people plan meaningful travel experiences.',
      image: '/images/team/emma.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Experience Officer',
      bio: 'Michael combines his background in hospitality management and technology to create seamless, memorable journeys for our clients.',
      image: '/images/team/michael.jpg'
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Head of Partnerships',
      bio: 'Sophia cultivates our extensive network of premium partners who help make every iTournary occasion truly exceptional.',
      image: '/images/team/sophia.jpg'
    }
  ];

  // Core values data
  const coreValues = [
    {
      title: 'Occasion-First Thinking',
      icon: 'fas fa-calendar-star',
      description: 'We believe every journey should be centered around the meaningful occasion that inspired it.'
    },
    {
      title: 'Emotional Intelligence',
      icon: 'fas fa-heart',
      description: "We recognize that travel is about more than logistics—it's about creating meaningful emotional experiences."
    },
    {
      title: 'Community Connection',
      icon: 'fas fa-users',
      description: 'We foster authentic connections between travelers, experts, and destinations to enrich every journey.'
    },
    {
      title: 'Thoughtful Curation',
      icon: 'fas fa-gem',
      description: 'We carefully select experiences that honor both personal significance and destination authenticity.'
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Hero section */}
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Our Story</h1>
        <p className={styles.heroText}>
          iTournary was founded on a simple belief: travel is most meaningful when it celebrates the important occasions in our lives.
        </p>
      </div>
      
      {/* Mission section */}
      <div className={styles.missionSection}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            We help people create extraordinary travel experiences around lifes meaningful occasions, transforming standard trips into deeply personal, emotionally resonant journeys that celebrate the moments that matter most.
          </p>
          
          <div className={styles.statContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Occasions Celebrated</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>45+</span>
              <span className={styles.statLabel}>Destinations</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Satisfaction Rate</span>
            </div>
          </div>
        </div>
        <div className={styles.missionImageContainer}>
          <img 
            src="/images/about/team-hero.jpg" 
            alt="iTournary team celebrating" 
            className={styles.missionImage}
          />
        </div>
      </div>
      
      {/* Core values section */}
      <div className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          {coreValues.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIconContainer}>
                <i className={value.icon} aria-hidden="true"></i>
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Team section */}
      <div className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMemberCard}>
              <div className={styles.memberImageContainer}>
                <div className={styles.memberImagePlaceholder}>
                  {/* Replace with actual images when available */}
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Join us section */}
      <div className={styles.joinSection}>
        <div className={styles.joinContent}>
          <h2 className={styles.joinTitle}>Join Our Journey</h2>
          <p className={styles.joinText}>
            We are always looking for passionate individuals who share our vision of transforming travel through emotional intelligence and occasion-first thinking.
          </p>
          <button className={styles.joinButton}>
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
