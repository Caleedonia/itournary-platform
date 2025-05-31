"use client";

import React from 'react';
import ChatInterface from './ChatInterface';
import useChatbot from './useChatbot';
import styles from './chatbotContainer.module.css';

const ChatbotContainer: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatbot();

  return (
    <div className={styles.container}>
      <ChatInterface
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatbotContainer;
