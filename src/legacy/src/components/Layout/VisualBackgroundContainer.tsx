"use client";

import React, { useState, useEffect } from 'react';
import styles from './visualBackgroundContainer.module.css';

interface VisualBackgroundContainerProps {
  children: React.ReactNode;
  backgroundType?: 'destination' | 'occasion' | 'default';
  imageUrl?: string;
  destinationName?: string;
  occasionType?: string;
  isLoading?: boolean;
}

const VisualBackgroundContainer: React.FC<VisualBackgroundContainerProps> = ({
  children,
  backgroundType = 'default',
  imageUrl,
  destinationName,
  occasionType,
  isLoading = false
}) => {
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Set background based on type and provided data
    if (backgroundType === 'destination' && imageUrl) {
      // If we have a specific destination image
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setIsImageLoaded(true);
        setBackgroundStyle({
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        });
        // Adjust overlay opacity based on image brightness (simplified)
        setOverlayOpacity(0.6);
      };
      img.onerror = () => {
        // Fallback to default destination background
        setBackgroundStyle({
          backgroundImage: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
        });
        setOverlayOpacity(0.5);
      };
    } else if (backgroundType === 'occasion' && occasionType) {
      // Set background based on occasion type
      switch (occasionType.toLowerCase()) {
        case 'wedding':
        case 'destination wedding':
          setBackgroundStyle({
            backgroundImage: 'linear-gradient(135deg, #F687B3, #D53F8C)',
          });
          break;
        case 'corporate retreat':
          setBackgroundStyle({
            backgroundImage: 'linear-gradient(135deg, #4FD1C5, #319795)',
          });
          break;
        case 'anniversary':
        case 'anniversary celebration':
          setBackgroundStyle({
            backgroundImage: 'linear-gradient(135deg, #F6AD55, #DD6B20)',
          });
          break;
        default:
          setBackgroundStyle({
            backgroundImage: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
          });
      }
      setOverlayOpacity(0.5);
    } else {
      // Default background
      setBackgroundStyle({
        backgroundImage: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
      });
      setOverlayOpacity(0.5);
    }
  }, [backgroundType, imageUrl, occasionType]);

  return (
    <div 
      className={`${styles.backgroundContainer} ${isLoading ? styles.loading : ''}`}
      style={backgroundStyle}
    >
      <div 
        className={styles.overlay} 
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {(backgroundType === 'destination' && destinationName) && (
        <div className={styles.destinationLabel}>
          <span className={styles.destinationIcon}>📍</span>
          <span className={styles.destinationName}>{destinationName}</span>
        </div>
      )}
      
      {(backgroundType === 'occasion' && occasionType) && (
        <div className={styles.occasionLabel}>
          <span className={styles.occasionIcon}>🎉</span>
          <span className={styles.occasionName}>{occasionType}</span>
        </div>
      )}
      
      <div className={styles.contentContainer}>
        {children}
      </div>
      
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading your experience...</p>
        </div>
      )}
    </div>
  );
};

export default VisualBackgroundContainer;
