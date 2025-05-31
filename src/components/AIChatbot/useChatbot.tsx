"use client";

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your perfect trip?' 
    }
  ]);
  const [conversationId, setConversationId] = useState<string>(uuidv4());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (messageContent: string) => {
    // Add user message to the chat
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: messageContent }
    ]);
    
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await fetch('/api/chatbot/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          conversationId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add assistant response to chat
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: data.response }
      ]);
      
      // Save conversation ID if it's new
      if (data.conversationId && data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, I'm having trouble connecting. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};

export default useChatbot;
