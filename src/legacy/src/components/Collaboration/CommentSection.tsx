"use client";

import React, { useState } from 'react';
import styles from './commentSection.module.css';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  experienceId: string;
  itemId?: string;
  itemType?: 'timeline' | 'budget' | 'checklist';
  initialComments: Comment[];
  onAddComment: (content: string, parentId?: string) => Promise<Comment>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  experienceId,
  itemId,
  itemType,
  initialComments,
  onAddComment
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
  const getInitials = (name: string): string => {
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
      
      const addedComment = await onAddComment(newComment);
      
      setComments([...comments, addedComment]);
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
      
      const addedReply = await onAddComment(replyContent, parentId);
      
      // Update the comments state with the new reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), addedReply]
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
                    alt={comment.userName} 
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
                  <span className={styles.commentAuthor}>{comment.userName}</span>
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
                        placeholder={`Reply to ${comment.userName}...`}
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
                              alt={reply.userName} 
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
                            <span className={styles.commentAuthor}>{reply.userName}</span>
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

export default CommentSection;
