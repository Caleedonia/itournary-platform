import React, { useState, useRef, useEffect } from 'react';
import styles from './chatInterface.module.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useChatbot } from './useChatbot';

interface ChatInterfaceProps {
  onComplete?: (conversationId: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onComplete }) => {
  const { conversation, sendMessage, isTyping, generateItinerary } = useChatbot();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') return;
    sendMessage(message);
  };

  const handleGenerateItinerary = () => {
    if (!conversation.id) return;
    
    generateItinerary(conversation.id)
      .then(() => {
        if (onComplete) {
          onComplete(conversation.id);
        }
      });
  };

  const commonSuggestions = [
    "I want to plan a family vacation",
    "I'm looking for a romantic getaway",
    "I need help planning a business trip",
    "I want to explore adventure activities"
  ];

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>iTournary Travel Assistant</h2>
        <p>Let's plan your perfect trip together</p>
      </div>
      
      <div className={styles.messagesContainer}>
        {conversation.messages.map((message, index) => (
          <ChatMessage 
            key={message.id || index}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {showSuggestions && conversation.messages.length <= 2 && (
        <div className={styles.suggestionContainer}>
          {commonSuggestions.map((suggestion, index) => (
            <button 
              key={index}
              className={styles.suggestionButton}
              onClick={() => handleSendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className={styles.inputContainer}>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {conversation.status === 'ready_for_itinerary' && (
          <button 
            className={styles.generateButton}
            onClick={handleGenerateItinerary}
          >
            Generate My Itinerary
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
