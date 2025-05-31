"use client";

import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import styles from './chatInterface.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages,
  onSendMessage,
  isLoading
}) => {
  return (
    <div className={styles.chatInterface}>
      <div className={styles.messageContainer}>
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            role={message.role} 
            content={message.content} 
          />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <ChatInput onSendMessage={onSendMessage} isDisabled={isLoading} />
    </div>
  );
};

export default ChatInterface;
