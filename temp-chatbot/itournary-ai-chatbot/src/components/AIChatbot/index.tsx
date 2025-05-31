import React from 'react';
import styles from './index.module.css';

// Export all components
export { default as ChatbotContainer } from './ChatbotContainer';
export { default as ChatInterface } from './ChatInterface';
export { default as ChatMessage } from './ChatMessage';
export { default as ChatInput } from './ChatInput';
export { default as TypingIndicator } from './TypingIndicator';
export { default as ItineraryEditor } from './ItineraryEditor';
export { default as ChatbotPage } from './ChatbotPage';
export { default as ChatbotTest } from './ChatbotTest';
export { ChatbotProvider, useChatbot } from './useChatbot';

// Main entry component
const AIChatbot: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <ChatbotPage />
    </div>
  );
};

export default AIChatbot;
