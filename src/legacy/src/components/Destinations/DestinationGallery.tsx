"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './destinationGallery.module.css';

interface Destination {
  id: string;
  name: string;
  description?: string;
  images: string[];
  popularityScore?: number;
  region?: string;
  tags?: string[];
}

interface DestinationGalleryProps {
  selectedDestination?: string;
  onDestinationSelect: (destinationId: string) => void;
  compact?: boolean;
}

const DestinationGallery: React.FC<DestinationGalleryProps> = ({
  selectedDestination,
  onDestinationSelect,
  compact = false
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll use mock data
    const fetchDestinations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockDestinations: Destination[] = [
          {
            id: 'dest-bali',
            name: 'Bali, Indonesia',
            description: 'A tropical paradise known for its stunning beaches, vibrant culture, and lush landscapes.',
            images: ['/images/destinations/bali-1.jpg', '/images/destinations/bali-2.jpg'],
            popularityScore: 9.2,
            region: 'Asia',
            tags: ['Beach', 'Cultural', 'Tropical']
          },
          {
            id: 'dest-paris',
            name: 'Paris, France',
            description: 'The city of love, known for its iconic landmarks, art, and culinary excellence.',
            images: ['/images/destinations/paris-1.jpg', '/images/destinations/paris-2.jpg'],
            popularityScore: 9.5,
            region: 'Europe',
            tags: ['Romantic', 'Cultural', 'Urban']
          },
          {
            id: 'dest-santorini',
            name: 'Santorini, Greece',
            description: 'Famous for its stunning white buildings, blue domes, and breathtaking sunsets.',
            images: ['/images/destinations/santorini-1.jpg'],
            popularityScore: 9.0,
            region: 'Europe',
            tags: ['Beach', 'Romantic', 'Island']
          },
          {
            id: 'dest-kyoto',
            name: 'Kyoto, Japan',
            description: 'A city of ancient temples, traditional gardens, and rich cultural heritage.',
            images: ['/images/destinations/kyoto-1.jpg'],
            popularityScore: 8.8,
            region: 'Asia',
            tags: ['Cultural', 'Historical', 'Scenic']
          },
          {
            id: 'dest-cancun',
            name: 'Cancun, Mexico',
            description: 'Known for its beautiful beaches, vibrant nightlife, and nearby Mayan ruins.',
            images: ['/images/destinations/cancun-1.jpg'],
            popularityScore: 8.5,
            region: 'North America',
            tags: ['Beach', 'Resort', 'Nightlife']
          }
        ];
        
        setDestinations(mockDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDestinations();
  }, []);

  // Filter destinations based on search query and active region
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (destination.description && destination.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (destination.tags && destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesRegion = !activeRegion || destination.region === activeRegion;
    
    return matchesSearch && matchesRegion;
  });

  // Get unique regions for filter
  const regions = Array.from(new Set(destinations.map(dest => dest.region).filter(Boolean)));

  // Handle destination selection
  const handleDestinationClick = (destinationId: string) => {
    onDestinationSelect(destinationId);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading destinations...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.galleryContainer} ${compact ? styles.compactMode : ''}`}>
      {!compact && (
        <>
          <div className={styles.galleryHeader}>
            <h3 className={styles.galleryTitle}>Select Your Destination</h3>
            <p className={styles.galleryDescription}>
              Choose from our curated list of popular destinations
            </p>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.regionFilters}>
              <button 
                className={`${styles.regionButton} ${!activeRegion ? styles.active : ''}`}
                onClick={() => setActiveRegion(null)}
              >
                All Regions
              </button>
              {regions.map(region => (
                <button 
                  key={region} 
                  className={`${styles.regionButton} ${activeRegion === region ? styles.active : ''}`}
                  onClick={() => setActiveRegion(region as string)}
                >
                  {region}
                </button>
              ))}
            </div>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Search destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput} 
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.destinationsGrid} ${compact ? styles.compactGrid : ''}`}>
        {filteredDestinations.map(destination => (
          <div 
            key={destination.id} 
            className={`${styles.destinationCard} ${selectedDestination === destination.id ? styles.selected : ''}`}
            onClick={() => handleDestinationClick(destination.id)}
          >
            <div className={styles.destinationImageContainer}>
              {destination.images && destination.images.length > 0 ? (
                <div className={styles.imageWrapper}>
                  <Image 
                    src={destination.images[0]} 
                    alt={destination.name}
                    width={400}
                    height={300}
                    className={styles.destinationImage}
                  />
                </div>
              ) : (
                <div className={styles.placeholderImage}>
                  <span>No Image Available</span>
                </div>
              )}
              {destination.popularityScore && destination.popularityScore >= 9.0 && (
                <span className={styles.popularBadge}>Popular Choice</span>
              )}
            </div>
            
            <div className={styles.destinationInfo}>
              <h4 className={styles.destinationName}>{destination.name}</h4>
              {!compact && destination.description && (
                <p className={styles.destinationDescription}>{destination.description}</p>
              )}
              {!compact && destination.tags && (
                <div className={styles.tagContainer}>
                  {destination.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            
            {selectedDestination === destination.id && (
              <div className={styles.selectedIndicator}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationGallery;
