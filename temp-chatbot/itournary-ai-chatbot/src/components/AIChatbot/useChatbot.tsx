import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define types
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type ConversationStatus = 'idle' | 'active' | 'ready_for_itinerary' | 'complete';

export interface Conversation {
  id: string | null;
  messages: Message[];
  status: ConversationStatus;
}

interface ChatContextType {
  conversation: Conversation;
  isTyping: boolean;
  startConversation: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  generateItinerary: (conversationId: string) => Promise<void>;
  resetConversation: () => void;
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock AI responses for development
const getMockResponse = (message: string): string => {
  // Simple keyword-based responses for development
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! I'm your iTournary AI assistant. I'm here to help you plan the perfect trip. Where would you like to go?";
  }
  
  if (message.toLowerCase().includes('vacation') || message.toLowerCase().includes('holiday')) {
    return "Planning a vacation is exciting! To help you create the perfect itinerary, I'd like to know a few things. How many people will be traveling? And do you have specific dates in mind?";
  }
  
  if (message.toLowerCase().includes('family')) {
    return "Family trips are wonderful! How many adults and children will be traveling? And what kinds of activities do your family members enjoy?";
  }
  
  if (message.toLowerCase().includes('beach') || message.toLowerCase().includes('ocean')) {
    return "Beach destinations are perfect for relaxation! Some popular options include Bali, the Maldives, Hawaii, and the Caribbean. Do any of these interest you, or did you have a specific beach destination in mind?";
  }
  
  if (message.toLowerCase().includes('budget')) {
    return "It's great that you're thinking about budget. This helps me recommend suitable options. Would you describe your budget as budget-friendly, mid-range, or luxury? Also, what aspects of the trip are most important to you (accommodation, activities, dining)?";
  }
  
  if (message.toLowerCase().includes('hotel') || message.toLowerCase().includes('stay')) {
    return "For accommodations, do you prefer hotels, resorts, vacation rentals, or something else? And are there specific amenities that are important to you, like a pool, beach access, or kid-friendly facilities?";
  }
  
  // Default response if no keywords match
  return "Thank you for sharing that information. To help plan your perfect trip, could you tell me more about your travel preferences? For example, are you interested in cultural experiences, adventure activities, relaxation, or something else?";
};

// Provider component
export const ChatbotProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [conversation, setConversation] = useState<Conversation>({
    id: null,
    messages: [],
    status: 'idle'
  });
  
  const [isTyping, setIsTyping] = useState(false);
  
  // Start a new conversation
  const startConversation = useCallback(async () => {
    // Generate a unique ID for the conversation
    const newId = `conv_${Date.now()}`;
    
    // Initial welcome message
    const welcomeMessage = {
      id: `msg_${Date.now()}`,
      role: 'assistant' as MessageRole,
      content: "Welcome to iTournary! I'm your AI travel assistant, here to help you create the perfect itinerary for your upcoming trip. I'll ask you some questions about your travel plans, and together we'll build an itinerary tailored just for you. What type of trip are you planning?",
      timestamp: new Date()
    };
    
    setConversation({
      id: newId,
      messages: [welcomeMessage],
      status: 'active'
    });
    
    // In a real implementation, this would call the API to start a conversation
    return Promise.resolve();
  }, []);
  
  // Send a message in the conversation
  const sendMessage = useCallback(async (content: string) => {
    if (!conversation.id) {
      await startConversation();
    }
    
    // Add user message to the conversation
    const userMessageId = `msg_${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      role: 'user' as MessageRole,
      content,
      timestamp: new Date()
    };
    
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // In a real implementation, this would call the API to get a response
    // For now, we'll use a timeout to simulate network delay
    setTimeout(() => {
      // Get mock response
      const responseContent = getMockResponse(content);
      
      // Add AI response to the conversation
      const aiMessageId = `msg_${Date.now()}`;
      const aiMessage = {
        id: aiMessageId,
        role: 'assistant' as MessageRole,
        content: responseContent,
        timestamp: new Date()
      };
      
      setConversation(prev => {
        // Check if we have enough information to generate an itinerary
        // In a real implementation, this would be determined by the AI service
        const messageCount = prev.messages.length;
        const newStatus = messageCount > 4 ? 'ready_for_itinerary' : 'active';
        
        return {
          ...prev,
          messages: [...prev.messages, aiMessage],
          status: newStatus
        };
      });
      
      setIsTyping(false);
    }, 1500);
    
    return Promise.resolve();
  }, [conversation.id, startConversation]);
  
  // Generate an itinerary from the conversation
  const generateItinerary = useCallback(async (conversationId: string) => {
    setIsTyping(true);
    
    // In a real implementation, this would call the API to generate an itinerary
    // For now, we'll use a timeout to simulate network delay
    setTimeout(() => {
      setConversation(prev => ({
        ...prev,
        status: 'complete'
      }));
      
      setIsTyping(false);
    }, 2000);
    
    return Promise.resolve();
  }, []);
  
  // Reset the conversation
  const resetConversation = useCallback(() => {
    setConversation({
      id: null,
      messages: [],
      status: 'idle'
    });
  }, []);
  
  return (
    <ChatContext.Provider value={{
      conversation,
      isTyping,
      startConversation,
      sendMessage,
      generateItinerary,
      resetConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the chat context
export const useChatbot = () => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  
  return context;
};

export default useChatbot;
