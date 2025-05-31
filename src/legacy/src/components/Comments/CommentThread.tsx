"use client";

import React, { useState, useEffect } from 'react';
import styles from './commentThread.module.css';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentThreadProps {
  experienceId: string;
  objectId?: string;
  objectType?: 'timeline' | 'budget' | 'checklist';
  initialComments?: Comment[];
}

const CommentThread: React.FC<CommentThreadProps> = ({
  experienceId,
  objectId,
  objectType,
  initialComments = []
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        let url = `/api/comments?experienceId=${experienceId}`;
        if (objectId && objectType) {
          url += `&objectId=${objectId}&objectType=${objectType}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    
    // Only fetch if no initial comments were provided
    if (initialComments.length === 0) {
      fetchComments();
    }
  }, [experienceId, objectId, objectType, initialComments.length]);
  
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
  
  // Get initials from name
  const getInitials = (name?: string): string => {
    if (!name) return '??';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Handle submitting a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experienceId,
          objectId,
          objectType,
          content: newComment,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      
      const data = await response.json();
      
      setComments([...comments, data.comment]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle submitting a reply
  const handleSubmitReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    
    if (!replyContent.trim() || !parentId) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experienceId,
          objectId,
          objectType,
          content: replyContent,
          parentId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add reply');
      }
      
      const data = await response.json();
      
      // Update the comments state with the new reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), data.comment]
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      setReplyContent('');
      setReplyingTo(null);
    } catch (err) {
      setError('Failed to add reply. Please try again.');
      console.error('Error adding reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.commentSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          Comments {comments.length > 0 && `(${comments.length})`}
        </h3>
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
      
      <div className={styles.newCommentForm}>
        <form onSubmit={handleSubmitComment}>
          <textarea
            className={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
            rows={3}
          />
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>
      
      {comments.length === 0 ? (
        <div className={styles.emptyComments}>
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className={styles.commentsList}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentAvatar}>
                {comment.userAvatar ? (
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.userName || "User"} 
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.avatarInitials}>
                    {getInitials(comment.userName)}
                  </div>
                )}
              </div>
              
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{comment.userName || "Unknown User"}</span>
                  <span className={styles.commentTime}>
                    {formatRelativeTime(comment.timestamp)}
                  </span>
                </div>
                
                <div className={styles.commentText}>
                  {comment.content}
                </div>
                
                <div className={styles.commentActions}>
                  <button 
                    className={styles.replyButton}
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                  </button>
                </div>
                
                {replyingTo === comment.id && (
                  <div className={styles.replyForm}>
                    <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                      <textarea
                        className={styles.replyInput}
                        placeholder={`Reply to ${comment.userName || "User"}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        disabled={isSubmitting}
                        rows={2}
                        autoFocus
                      />
                      <div className={styles.formActions}>
                        <button 
                          type="submit" 
                          className={styles.submitButton}
                          disabled={isSubmitting || !replyContent.trim()}
                        >
                          {isSubmitting ? 'Posting...' : 'Post Reply'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className={styles.repliesList}>
                    {comment.replies.map(reply => (
                      <div key={reply.id} className={styles.replyItem}>
                        <div className={styles.commentAvatar}>
                          {reply.userAvatar ? (
                            <img 
                              src={reply.userAvatar} 
                              alt={reply.userName || "User"} 
                              className={styles.avatarImage}
                            />
                          ) : (
                            <div className={styles.avatarInitials}>
                              {getInitials(reply.userName)}
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.commentContent}>
                          <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{reply.userName || "Unknown User"}</span>
                            <span className={styles.commentTime}>
                              {formatRelativeTime(reply.timestamp)}
                            </span>
                          </div>
                          
                          <div className={styles.commentText}>
                            {reply.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread;

