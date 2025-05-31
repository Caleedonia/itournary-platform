"use client";

import React, { useState, useEffect } from 'react';
import styles from './activityFeed.module.css';

interface ActivityItem {
  id: string;
  type: 'create' | 'update' | 'delete' | 'share' | 'comment' | 'join';
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  details: {
    itemType?: 'experience' | 'timeline' | 'budget' | 'checklist';
    itemId?: string;
    itemName?: string;
    message?: string;
    oldValue?: string;
    newValue?: string;
  };
}

interface ActivityFeedProps {
  experienceId: string;
  initialActivities: ActivityItem[];
  onLoadMore?: () => Promise<ActivityItem[]>;
  maxItems?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  experienceId,
  initialActivities,
  onLoadMore,
  maxItems = 10
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialActivities.length >= maxItems);
  
  // Function to load more activities
  const handleLoadMore = async () => {
    if (!onLoadMore || isLoading) return;
    
    try {
      setIsLoading(true);
      const moreActivities = await onLoadMore();
      
      if (moreActivities.length === 0) {
        setHasMore(false);
      } else {
        setActivities([...activities, ...moreActivities]);
        setHasMore(moreActivities.length >= maxItems);
      }
    } catch (error) {
      console.error('Error loading more activities:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format relative time
  const formatRelativeTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
      return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'create':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.createIcon}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        );
      case 'update':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.updateIcon}`}
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        );
      case 'delete':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.deleteIcon}`}
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        );
      case 'share':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.shareIcon}`}
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        );
      case 'comment':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.commentIcon}`}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'join':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.activityIcon} ${styles.joinIcon}`}
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Get activity message based on type and details
  const getActivityMessage = (activity: ActivityItem): React.ReactNode => {
    const { type, userName, details } = activity;
    
    switch (type) {
      case 'create':
        return (
          <>
            <span className={styles.userName}>{userName}</span> created 
            {details.itemType && (
              <span className={styles.itemType}> {details.itemType}</span>
            )}
            {details.itemName && (
              <span className={styles.itemName}> "{details.itemName}"</span>
            )}
          </>
        );
      case 'update':
        return (
          <>
            <span className={styles.userName}>{userName}</span> updated 
            {details.itemType && (
              <span className={styles.itemType}> {details.itemType}</span>
            )}
            {details.itemName && (
              <span className={styles.itemName}> "{details.itemName}"</span>
            )}
            {details.oldValue && details.newValue && (
              <span className={styles.valueChange}>
                {" from "}<span className={styles.oldValue}>{details.oldValue}</span>
                {" to "}<span className={styles.newValue}>{details.newValue}</span>
              </span>
            )}
          </>
        );
      case 'delete':
        return (
          <>
            <span className={styles.userName}>{userName}</span> deleted 
            {details.itemType && (
              <span className={styles.itemType}> {details.itemType}</span>
            )}
            {details.itemName && (
              <span className={styles.itemName}> "{details.itemName}"</span>
            )}
          </>
        );
      case 'share':
        return (
          <>
            <span className={styles.userName}>{userName}</span> shared this experience
            {details.message && (
              <div className={styles.shareMessage}>"{details.message}"</div>
            )}
          </>
        );
      case 'comment':
        return (
          <>
            <span className={styles.userName}>{userName}</span> commented
            {details.itemType && (
              <span className={styles.itemType}> on {details.itemType}</span>
            )}
            {details.itemName && (
              <span className={styles.itemName}> "{details.itemName}"</span>
            )}
            {details.message && (
              <div className={styles.commentMessage}>"{details.message}"</div>
            )}
          </>
        );
      case 'join':
        return (
          <>
            <span className={styles.userName}>{userName}</span> joined as a collaborator
          </>
        );
      default:
        return null;
    }
  };
  
  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className={styles.activityFeed}>
      <div className={styles.feedHeader}>
        <h3 className={styles.feedTitle}>Activity</h3>
      </div>
      
      {activities.length === 0 ? (
        <div className={styles.emptyFeed}>
          <p>No activity yet</p>
        </div>
      ) : (
        <div className={styles.activitiesList}>
          {activities.map(activity => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityAvatar}>
                {activity.userAvatar ? (
                  <img 
                    src={activity.userAvatar} 
                    alt={activity.userName} 
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.avatarInitials}>
                    {getInitials(activity.userName)}
                  </div>
                )}
              </div>
              
              <div className={styles.activityContent}>
                <div className={styles.activityHeader}>
                  {getActivityIcon(activity.type)}
                  <div className={styles.activityMessage}>
                    {getActivityMessage(activity)}
                  </div>
                </div>
                
                <div className={styles.activityTime}>
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button 
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
