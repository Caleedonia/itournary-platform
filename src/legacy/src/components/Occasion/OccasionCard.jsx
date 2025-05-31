import React from 'react';
import Link from 'next/link';
import styles from './occasionCard.module.css';

const OccasionCard = ({ title, description, image, color, category }) => {
  // Generate a URL-friendly slug from the title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Create a valid href for the Link component
  const href = `/occasions/${generateSlug(title)}`;

  return (
    <Link href={href} className={styles.occasionCard}>
      <div 
        className={styles.cardContent}
        style={{ 
          backgroundImage: `url(${image})`,
          borderColor: color
        }}
      >
        <div className={styles.cardOverlay} style={{ backgroundColor: `${color}80` }}>
          <div className={styles.cardCategory}>{category}</div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default OccasionCard;
