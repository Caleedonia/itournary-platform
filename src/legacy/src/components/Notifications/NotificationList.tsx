"use client";

import React, { useState, useEffect } from 'react';
import styles from './notificationList.module.css';

interface Notification {
  id: string;
  userId: string;
  recipientId: string;
  type: 'comment' | 'mention' | 'share' | 'update';
  experienceId: string;
  itemId?: string;
  itemType?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface NotificationListProps {
  experienceId?: string;
  limit?: number;
}

const NotificationList: React.FC<NotificationListProps> = ({
  experienceId,
  limit = 5
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        let url = '/api/notifications';
        if (experienceId) {
          url += `?experienceId=${experienceId}`;
        }
        
        // Simulate API call with mock data
        // In a real app, you'd make an actual fetch call
        setTimeout(() => {
          const mockNotifications = [
            {
              id: '1',
              userId: 'user1',
              recipientId: 'currentUser',
              type: 'comment',
              experienceId: experienceId || 'exp1',
              content: 'Jane commented on your experience',
              timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
              read: false,
            },
            {
              id: '2',
              userId: 'user2',
              recipientId: 'currentUser',
              type: 'share',
              experienceId: experienceId || 'exp1',
              content: 'John shared an experience with you',
              timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
              read: false,
            },
            {
              id: '3',
              userId: 'user3',
              recipientId: 'currentUser',
              type: 'update',
              experienceId: experienceId || 'exp1',
              content: 'Alex updated the budget for your trip',
              timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
              read: true,
            },
          ] as Notification[];
          
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.read).length);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [experienceId]);
  
  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      // Simulate API call
      // In a real app, you'd make an actual API call here
      const updatedNotifications = notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Simulate API call
      // In a real app, you'd make an actual API call here
      const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
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
      return `${diffMin}m ago`;
    } else if (diffHour < 24) {
      return `${diffHour}h ago`;
    } else if (diffDay < 7) {
      return `${diffDay}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'mention':
        return (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
          </svg>
        );
      case 'share':
        return (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        );
      case 'update':
        return (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        );
      default:
        return (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
        );
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.notificationButton} ${unreadCount > 0 ? styles.hasUnread : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className={styles.markAllRead} 
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : notifications.length === 0 ? (
            <div className={styles.empty}>No notifications to display</div>
          ) : (
            <div className={styles.list}>
              {notifications.slice(0, limit).map(notification => (
                <div 
                  key={notification.id}
                  className={`${styles.notification} ${notification.read ? styles.read : styles.unread}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className={styles.iconContainer}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.content}>
                    <p>{notification.content}</p>
                    <span className={styles.time}>
                      {formatRelativeTime(notification.timestamp)}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className={styles.unreadDot}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
