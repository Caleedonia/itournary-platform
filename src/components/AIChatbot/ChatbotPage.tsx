"use client";

import React from 'react';
import ChatbotContainer from './ChatbotContainer';
import styles from './chatbotPage.module.css';

const ChatbotPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>Plan Your Trip with AI</h1>
        <p>Chat with our AI travel assistant to create your perfect itinerary.</p>
      </div>
      <div className={styles.chatbotWrapper}>
        <ChatbotContainer />
      </div>
    </div>
  );
};

export default ChatbotPage;
