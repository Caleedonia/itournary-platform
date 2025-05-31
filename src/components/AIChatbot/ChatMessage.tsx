"use client";

import React from 'react';
import styles from './chatMessage.module.css';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.avatar}>
        {isUser ? 'You' : 'AI'}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
