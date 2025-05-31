"use client";

import React, { useState, useEffect } from 'react';
import styles from './notificationSystem.module.css';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  relatedTo?: {
    type: 'experience' | 'timeline' | 'budget' | 'checklist' | 'comment';
    id: string;
    name?: string;
  };
}

interface NotificationSystemProps {
  userId: string;
  initialNotifications: Notification[];
  onMarkAsRead: (notificationId: string) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
  onDeleteNotification: (notificationId: string) => Promise<void>;
  onFetchNotifications?: () => Promise<Notification[]>;
  pollingInterval?: number; // in milliseconds
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  userId,
  initialNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onFetchNotifications,
  pollingInterval = 30000 // default to 30 seconds
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
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
  
  // Poll for new notifications
  useEffect(() => {
    if (!onFetchNotifications) return;
    
    const fetchNotifications = async () => {
      try {
        const newNotifications = await onFetchNotifications();
        setNotifications(newNotifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    
    const intervalId = setInterval(fetchNotifications, pollingInterval);
    
    return () => clearInterval(intervalId);
  }, [onFetchNotifications, pollingInterval]);
  
  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await onMarkAsRead(notificationId);
      
      // Update the notification in the local state
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (err) {
      setError('Failed to mark notification as read.');
      console.error('Error marking notification as read:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle marking all notifications as read
  const handleMarkAllAsRead = async () => {
    if (notifications.length === 0 || notifications.every(n => n.read)) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      await onMarkAllAsRead();
      
      // Update all notifications in the local state
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      setError('Failed to mark all notifications as read.');
      console.error('Error marking all notifications as read:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle deleting a notification
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await onDeleteNotification(notificationId);
      
      // Remove the notification from the local state
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (err) {
      setError('Failed to delete notification.');
      console.error('Error deleting notification:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle clicking a notification
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    
    // If there's a link, navigate to it
    if (notification.link) {
      window.location.href = notification.link;
    }
    
    // Close the dropdown
    setIsOpen(false);
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
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
            className={`${styles.notificationIcon} ${styles.infoIcon}`}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case 'success':
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
            className={`${styles.notificationIcon} ${styles.successIcon}`}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'warning':
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
            className={`${styles.notificationIcon} ${styles.warningIcon}`}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'error':
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
            className={`${styles.notificationIcon} ${styles.errorIcon}`}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.notificationSystem}>
      <button 
        className={styles.notificationButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={styles.bellIcon}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        
        {unreadCount > 0 && (
          <span className={styles.notificationBadge}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className={styles.notificationDropdown}>
          <div className={styles.dropdownHeader}>
            <h3 className={styles.dropdownTitle}>Notifications</h3>
            {notifications.length > 0 && (
              <button 
                className={styles.markAllReadButton}
                onClick={handleMarkAllAsRead}
                disabled={isLoading || notifications.every(n => n.read)}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          {error && (
            <div className={styles.errorMessage}>
              <span>{error}</span>
              <button 
                className={styles.dismissButton}
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}
          
          {notifications.length === 0 ? (
            <div className={styles.emptyNotifications}>
              <p>No notifications</p>
            </div>
          ) : (
            <div className={styles.notificationsList}>
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationHeader}>
                      {getNotificationIcon(notification.type)}
                      <div className={styles.notificationTitle}>
                        {notification.title}
                      </div>
                      <div className={styles.notificationTime}>
                        {formatRelativeTime(notification.timestamp)}
                      </div>
                    </div>
                    
                    <div className={styles.notificationMessage}>
                      {notification.message}
                    </div>
                    
                    {notification.relatedTo && notification.relatedTo.name && (
                      <div className={styles.notificationRelated}>
                        <span className={styles.relatedLabel}>
                          {notification.relatedTo.type.charAt(0).toUpperCase() + notification.relatedTo.type.slice(1)}:
                        </span>
                        <span className={styles.relatedName}>
                          {notification.relatedTo.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                    aria-label="Delete notification"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
