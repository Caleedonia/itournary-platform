# iTournary AI Chatbot Integration Plan

## Integration Overview

This document outlines how the AI chatbot component will integrate with the existing iTournary Next.js platform architecture, ensuring seamless functionality and user experience.

```
┌─────────────────────────────────────────────────────────────────┐
│                      iTournary Platform                          │
│                                                                 │
│  ┌─────────────────┐    ┌──────────────────┐    ┌────────────┐  │
│  │   Existing      │◄──►│  New AI Chatbot  │◄──►│  Existing  │  │
│  │   Next.js UI    │    │  Components      │    │  Itinerary │  │
│  └─────────────────┘    └──────────────────┘    └────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Integration Points

### 1. Frontend Integration

#### UI Component Integration
- **Entry Points**
  - Add chatbot launcher to main navigation
  - Create dedicated chatbot route (/plan-with-ai)
  - Add entry points from homepage and itinerary creation flows
  
- **Component Structure**
  ```
  /src
    /components
      /AIChatbot
        ChatInterface.tsx
        ChatMessage.tsx
        ChatInput.tsx
        ChatHeader.tsx
        TypingIndicator.tsx
        ChatContext.tsx
        useChatbot.tsx
        chatbot.module.css
      /ItineraryBuilder
        ItineraryView.tsx  (enhanced to accept AI-generated data)
        ItineraryEditor.tsx (enhanced with AI suggestions)
        ItineraryContext.tsx (updated to handle AI-generated content)
  ```

- **Styling Integration**
  - Extend existing theme tokens for chatbot components
  - Ensure responsive design matches platform standards
  - Create smooth transitions between chat and itinerary views
  - Maintain accessibility standards across new components

#### State Management Integration
- **Context Providers**
  - Create ChatbotProvider to manage conversation state
  - Extend existing ItineraryContext to accept AI-generated data
  - Implement state synchronization between contexts

- **Data Flow**
  ```jsx
  // Example integration in _app.tsx
  function MyApp({ Component, pageProps }) {
    return (
      <UserProvider>
        <ItineraryProvider>
          <ChatbotProvider>
            <Component {...pageProps} />
          </ChatbotProvider>
        </ItineraryProvider>
      </UserProvider>
    );
  }
  ```

### 2. Backend Integration

#### API Routes
- **New API Endpoints**
  ```
  /src
    /app
      /api
        /chatbot
          /conversation
            route.ts (POST to start/continue conversation)
          /itinerary
            route.ts (POST to generate itinerary from conversation)
          /suggestions
            route.ts (GET contextual suggestions during editing)
  ```

- **External Service Integration**
  - Create secure proxy for AI service API calls
  - Implement rate limiting and error handling
  - Set up caching for common queries and responses

#### Database Schema Updates
- **Conversation Storage**
  - Add conversations table to store chat history
  - Create conversation_messages table for individual messages
  - Add user_id foreign key to link conversations to users

- **Itinerary Enhancements**
  - Add source_type field to itineraries table (manual, ai-generated, template)
  - Create itinerary_suggestions table for AI recommendations
  - Add conversation_id foreign key to link itineraries to conversations

### 3. Authentication & Authorization Integration

- **User Context**
  - Extend user authentication to chatbot conversations
  - Store conversation history with user profiles
  - Implement guest conversations with conversion path

- **Permission Handling**
  - Define access controls for AI-generated content
  - Implement sharing permissions for collaborative editing
  - Set up usage limits based on user tier/subscription

### 4. External Services Integration

#### AI Service Integration
- **Service Configuration**
  - Set up environment variables for API keys
  - Configure service endpoints and fallbacks
  - Implement retry logic and error handling

- **Prompt Engineering**
  - Create prompt templates that incorporate iTournary brand voice
  - Design system prompts for consistent conversation handling
  - Implement context window management for long conversations

#### Data Services Integration
- **Weather API**
  - Connect to existing weather service or implement new one
  - Create data transformation for conversational insights
  - Implement caching for performance optimization

- **Destination Information**
  - Integrate with existing destination database
  - Create conversational access patterns for destination data
  - Implement content filtering for relevance

### 5. Analytics Integration

- **Event Tracking**
  - Track conversation starts, completions, and abandonment
  - Measure itinerary generation and customization rates
  - Analyze common user questions and pain points

- **Performance Monitoring**
  - Monitor AI service response times
  - Track conversation length and complexity
  - Measure user satisfaction with generated itineraries

## Implementation Approach

### Phase 1: Core Chat Interface
- Implement basic chat UI components
- Set up conversation state management
- Create initial API routes for conversation handling
- Integrate with AI service for basic responses

### Phase 2: Contextual Intelligence
- Implement context management
- Integrate with weather and destination APIs
- Enhance prompt engineering for better responses
- Add typing indicators and response streaming

### Phase 3: Itinerary Generation
- Develop itinerary generation algorithm
- Create transition from chat to itinerary view
- Implement initial customization capabilities
- Add vendor recommendation integration

### Phase 4: Advanced Features
- Add collaborative features
- Implement advanced customization tools
- Enhance analytics and performance monitoring
- Optimize for mobile experience

## Technical Implementation Details

### Next.js Integration

```jsx
// pages/plan-with-ai.tsx
import { useEffect } from 'react';
import { ChatInterface } from '../components/AIChatbot/ChatInterface';
import { useChatbot } from '../components/AIChatbot/useChatbot';
import { useItinerary } from '../components/ItineraryBuilder/useItinerary';

export default function PlanWithAIPage() {
  const { conversation, startConversation, sendMessage } = useChatbot();
  const { setItinerary } = useItinerary();
  
  useEffect(() => {
    if (!conversation.id) {
      startConversation();
    }
  }, [conversation.id, startConversation]);
  
  const handleItineraryGeneration = async (conversationId) => {
    const response = await fetch('/api/chatbot/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId })
    });
    
    const data = await response.json();
    setItinerary(data.itinerary);
    // Navigate to itinerary view
    router.push('/itinerary/edit');
  };
  
  return (
    <div className="container">
      <h1>Plan Your Perfect Trip</h1>
      <ChatInterface 
        onComplete={handleItineraryGeneration} 
        conversation={conversation}
        sendMessage={sendMessage}
      />
    </div>
  );
}
```

### API Route Implementation

```typescript
// src/app/api/chatbot/conversation/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/database';
import { getAIService } from '@/lib/ai-service';

export async function POST(request: Request) {
  const session = await getServerSession();
  const { message, conversationId } = await request.json();
  
  // Get or create conversation
  const db = await connectToDatabase();
  let conversation;
  
  if (conversationId) {
    conversation = await db.collection('conversations').findOne({ 
      _id: conversationId,
      userId: session?.user?.id || 'guest' 
    });
  } else {
    const result = await db.collection('conversations').insertOne({
      userId: session?.user?.id || 'guest',
      startedAt: new Date(),
      status: 'active'
    });
    conversation = { _id: result.insertedId, messages: [] };
  }
  
  // Store user message
  await db.collection('conversation_messages').insertOne({
    conversationId: conversation._id,
    role: 'user',
    content: message,
    timestamp: new Date()
  });
  
  // Get conversation history
  const messages = await db.collection('conversation_messages')
    .find({ conversationId: conversation._id })
    .sort({ timestamp: 1 })
    .toArray();
  
  // Get AI response
  const aiService = getAIService();
  const aiResponse = await aiService.getResponse(messages);
  
  // Store AI response
  await db.collection('conversation_messages').insertOne({
    conversationId: conversation._id,
    role: 'assistant',
    content: aiResponse.content,
    timestamp: new Date()
  });
  
  return NextResponse.json({ 
    conversationId: conversation._id,
    message: aiResponse.content,
    suggestedActions: aiResponse.suggestedActions || []
  });
}
```

### Context Provider Implementation

```tsx
// components/AIChatbot/ChatContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type Conversation = {
  id: string | null;
  messages: Message[];
  status: 'idle' | 'active' | 'complete';
};

type ChatContextType = {
  conversation: Conversation;
  startConversation: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  resetConversation: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [conversation, setConversation] = useState<Conversation>({
    id: null,
    messages: [],
    status: 'idle'
  });
  
  const startConversation = useCallback(async () => {
    try {
      const response = await fetch('/api/chatbot/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'start' })
      });
      
      const data = await response.json();
      
      setConversation({
        id: data.conversationId,
        messages: [
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.message,
            timestamp: new Date()
          }
        ],
        status: 'active'
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, []);
  
  const sendMessage = useCallback(async (content: string) => {
    if (!conversation.id) return;
    
    // Optimistically update UI
    const tempId = Date.now().toString();
    setConversation(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: tempId,
          role: 'user',
          content,
          timestamp: new Date()
        }
      ]
    }));
    
    try {
      const response = await fetch('/api/chatbot/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          conversationId: conversation.id,
          message: content 
        })
      });
      
      const data = await response.json();
      
      setConversation(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.message,
            timestamp: new Date()
          }
        ]
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove optimistic update on error
      setConversation(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== tempId)
      }));
    }
  }, [conversation.id]);
  
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
      startConversation,
      sendMessage,
      resetConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}
```

## Deployment Considerations

### Environment Variables
- AI_SERVICE_API_KEY
- AI_SERVICE_ENDPOINT
- WEATHER_API_KEY
- DATABASE_URL

### Build Configuration
- Update Next.js build configuration for new components
- Configure module federation if using micro-frontends
- Set up proper tree-shaking for optimized bundles

### Testing Strategy
- Unit tests for chat components
- Integration tests for API routes
- End-to-end tests for complete conversation flows
- Performance testing for AI response times

### Monitoring Setup
- Configure error tracking for AI service failures
- Set up performance monitoring for response times
- Implement usage tracking for billing purposes
