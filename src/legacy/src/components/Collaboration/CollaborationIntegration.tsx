"use client";

import React, { useState } from 'react';
import styles from './collaborationIntegration.module.css';
import CollaborationPanel from './CollaborationPanel';
import ActivityFeed from './ActivityFeed';
import CommentSection from './CommentSection';
import NotificationSystem from './NotificationSystem';

interface CollaborationIntegrationProps {
  experienceId: string;
  currentUserId: string;
  initialCollaborators: any[];
  initialActivities: any[];
  initialComments: any[];
  initialNotifications: any[];
  onAddCollaborator: (email: string, role: 'editor' | 'viewer') => Promise<void>;
  onUpdateCollaboratorRole: (collaboratorId: string, role: 'editor' | 'viewer') => Promise<void>;
  onRemoveCollaborator: (collaboratorId: string) => Promise<void>;
  onAddComment: (content: string, parentId?: string) => Promise<any>;
  onMarkNotificationAsRead: (notificationId: string) => Promise<void>;
  onMarkAllNotificationsAsRead: () => Promise<void>;
  onDeleteNotification: (notificationId: string) => Promise<void>;
}

const CollaborationIntegration: React.FC<CollaborationIntegrationProps> = ({
  experienceId,
  currentUserId,
  initialCollaborators,
  initialActivities,
  initialComments,
  initialNotifications,
  onAddCollaborator,
  onUpdateCollaboratorRole,
  onRemoveCollaborator,
  onAddComment,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onDeleteNotification
}) => {
  const [activeTab, setActiveTab] = useState<'collaborators' | 'activity' | 'comments'>('collaborators');
  
  return (
    <div className={styles.collaborationIntegration}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'collaborators' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('collaborators')}
          >
            Collaborators
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'activity' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'comments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </button>
        </div>
        
        <div className={styles.notificationContainer}>
          <NotificationSystem 
            userId={currentUserId}
            initialNotifications={initialNotifications}
            onMarkAsRead={onMarkNotificationAsRead}
            onMarkAllAsRead={onMarkAllNotificationsAsRead}
            onDeleteNotification={onDeleteNotification}
          />
        </div>
      </div>
      
      <div className={styles.content}>
        {activeTab === 'collaborators' && (
          <CollaborationPanel 
            experienceId={experienceId}
            currentUserId={currentUserId}
            initialCollaborators={initialCollaborators}
            onAddCollaborator={onAddCollaborator}
            onUpdateCollaboratorRole={onUpdateCollaboratorRole}
            onRemoveCollaborator={onRemoveCollaborator}
          />
        )}
        
        {activeTab === 'activity' && (
          <ActivityFeed 
            experienceId={experienceId}
            initialActivities={initialActivities}
          />
        )}
        
        {activeTab === 'comments' && (
          <CommentSection 
            experienceId={experienceId}
            initialComments={initialComments}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};

export default CollaborationIntegration;
