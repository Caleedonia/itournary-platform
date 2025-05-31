"use client";

import React, { useState, useEffect } from 'react';
import styles from './collaborationPanel.module.css';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  avatar?: string;
  isPending?: boolean;
}

interface CollaborationPanelProps {
  experienceId: string;
  onClose: () => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
  experienceId, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'collaborators' | 'settings'>('collaborators');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [invitingEmail, setInvitingEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch collaborators on component mount
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with mock data
        // In a real app, you'd make an actual fetch call
        setTimeout(() => {
          const mockCollaborators: Collaborator[] = [
            {
              id: '1',
              name: 'You (Current User)',
              email: 'you@example.com',
              role: 'Owner',
              avatar: null,
            },
            {
              id: '2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              role: 'Editor',
              avatar: null,
            },
            {
              id: '3',
              name: 'John Smith',
              email: 'john@example.com',
              role: 'Viewer',
              avatar: null,
              isPending: true,
            },
          ];
          
          setCollaborators(mockCollaborators);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch collaborators:', error);
        setError('Failed to load collaborators. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCollaborators();
  }, [experienceId]);
  
  // Handle invite submission
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || invitingEmail === email) {
      return;
    }
    
    try {
      setInvitingEmail(email);
      setError(null);
      
      // Simulate API call
      // In a real app, you'd make an actual API call here
      setTimeout(() => {
        const newCollaborator: Collaborator = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email: email,
          role: 'Viewer',
          isPending: true,
        };
        
        setCollaborators([...collaborators, newCollaborator]);
        setEmail('');
        setInvitingEmail('');
      }, 1000);
    } catch (error) {
      console.error('Failed to invite collaborator:', error);
      setError('Failed to send invitation. Please try again.');
      setInvitingEmail('');
    }
  };
  
  // Handle removing a collaborator
  const handleRemove = async (id: string) => {
    try {
      // Prevent removing yourself (the owner)
      if (id === '1') {
        setError("You can't remove yourself as the owner");
        return;
      }
      
      setCollaborators(collaborators.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
      setError('Failed to remove collaborator. Please try again.');
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
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Collaboration</h3>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close panel"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'collaborators' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('collaborators')}
        >
          Collaborators
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'settings' ? styles.activeTab : ''}`} 
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      <div className={styles.content}>
        {activeTab === 'collaborators' && (
          <>
            {error && (
              <div className="bg-red-50 text-red-700 p-2 mb-4 rounded text-sm">
                {error}
                <button 
                  className="float-right font-bold"
                  onClick={() => setError(null)}
                >
                  &times;
                </button>
              </div>
            )}
          
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Current Collaborators</h4>
              
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading collaborators...</div>
              ) : collaborators.length === 0 ? (
                <div className={styles.emptyList}>No collaborators yet</div>
              ) : (
                <div className={styles.collaboratorsList}>
                  {collaborators.map(collaborator => (
                    <div key={collaborator.id} className={styles.collaborator}>
                      <div className={styles.collaboratorInfo}>
                        <div className={styles.avatar}>
                          {collaborator.avatar ? (
                            <img 
                              src={collaborator.avatar} 
                              alt={collaborator.name} 
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            getInitials(collaborator.name)
                          )}
                        </div>
                        <div className={styles.userDetails}>
                          <p className={styles.name}>{collaborator.name}</p>
                          <p className={styles.email}>{collaborator.email}</p>
                        </div>
                      </div>
                      <div className={styles.collaboratorActions}>
                        {collaborator.isPending && (
                          <span className={styles.pendingTag}>Pending</span>
                        )}
                        <span className={styles.roleTag}>{collaborator.role}</span>
                        <button 
                          className={styles.removeButton}
                          onClick={() => handleRemove(collaborator.id)}
                          disabled={collaborator.role === 'Owner'}
                          title={collaborator.role === 'Owner' ? "Can't remove owner" : "Remove collaborator"}
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Invite People</h4>
              <form onSubmit={handleInvite} className={styles.inviteForm}>
                <div className="flex gap-2 w-full">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={!!invitingEmail}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!email.trim() || !!invitingEmail}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium disabled:bg-blue-300"
                  >
                    {invitingEmail ? 'Inviting...' : 'Invite'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        
        {activeTab === 'settings' && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Collaboration Settings</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Default Role for New Collaborators</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Viewer (can only view)</option>
                  <option>Editor (can edit content)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded-sm" />
                  <span className="text-sm">Allow commenters to edit collaborator notes</span>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded-sm" />
                  <span className="text-sm">Notify me when collaborators make changes</span>
                </label>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="text-sm font-semibold mb-2">Advanced Settings</h5>
                
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  Reset all collaborator permissions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;
