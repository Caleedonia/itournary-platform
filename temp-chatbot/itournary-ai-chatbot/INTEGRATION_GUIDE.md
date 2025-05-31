# iTournary AI Chatbot Integration Guide

## Overview

This package contains a complete AI-powered conversational itinerary builder for the iTournary platform. The chatbot guides users through a natural conversation to build personalized travel itineraries, providing contextual insights and seamlessly transitioning to an editable itinerary interface.

## Features

- **Natural Conversation Interface**: Engage users in a friendly, natural dialogue about their travel plans
- **Contextual Intelligence**: Provide real-time insights about destinations, weather, and seasonal considerations
- **Personalized Recommendations**: Suggest activities and experiences based on user preferences
- **Itinerary Generation**: Convert conversations into structured, day-by-day itineraries
- **Customization Interface**: Allow users to edit, add, or remove activities in the generated itinerary

## Package Contents

```
/components/AIChatbot/
├── ChatbotContainer.tsx       # Main container component
├── ChatInterface.tsx          # Chat UI component
├── ChatMessage.tsx            # Individual message component
├── ChatInput.tsx              # User input component
├── TypingIndicator.tsx        # Typing animation component
├── ItineraryEditor.tsx        # Itinerary editing interface
├── ChatbotPage.tsx            # Full page implementation
├── ChatbotTest.tsx            # Testing interface
├── useChatbot.tsx             # Context and hooks for state management
├── index.tsx                  # Main export file
└── CSS Modules                # Styling for all components

/app/api/chatbot/
├── conversation/route.ts      # API endpoint for chat functionality
├── itinerary/route.ts         # API endpoint for itinerary generation
└── contextual-data/route.ts   # API endpoint for weather and destination data
```

## Installation

1. Copy the `/components/AIChatbot` directory to your project's components folder
2. Copy the `/app/api/chatbot` directory to your Next.js API routes folder
3. Install required dependencies:

```bash
npm install react react-dom next
```

## Integration

### Basic Integration

Add the AI chatbot to any page in your application:

```jsx
import { ChatbotContainer } from '../components/AIChatbot';

export default function TravelPlanningPage() {
  return (
    <div>
      <h1>Plan Your Trip</h1>
      <ChatbotContainer />
    </div>
  );
}
```

### Full Page Integration

Use the pre-built page component:

```jsx
import { ChatbotPage } from '../components/AIChatbot';

export default function TravelPlanningPage() {
  return <ChatbotPage />;
}
```

### Testing Integration

For development and testing:

```jsx
import { ChatbotTest } from '../components/AIChatbot';

export default function TestPage() {
  return <ChatbotTest />;
}
```

## Customization

### Styling

All components use CSS modules for styling. You can customize the appearance by modifying the corresponding `.module.css` files.

### AI Service Integration

The current implementation uses mock AI responses. To connect to a real AI service:

1. Update the `useChatbot.tsx` file to replace the mock response generation
2. Modify the `/app/api/chatbot/conversation/route.ts` file to integrate with your preferred AI service (OpenAI, Anthropic, etc.)

### External Data Services

To use real weather and destination data:

1. Update the `/app/api/chatbot/contextual-data/route.ts` file to connect to your preferred weather and travel information APIs

## Usage Flow

1. User starts conversation with the AI chatbot
2. Chatbot asks questions about travel preferences, dates, budget, etc.
3. Chatbot provides contextual insights during the conversation
4. Once sufficient information is gathered, the "Generate My Itinerary" button appears
5. User clicks the button to generate a personalized itinerary
6. User is presented with the itinerary editor interface
7. User can customize the itinerary by editing, adding, or removing activities
8. User can save the final itinerary or return to the conversation

## Technical Notes

- Built with React and TypeScript for type safety
- Uses React Context for state management
- Implements Next.js API routes for backend functionality
- Designed with responsive layouts for all device sizes
- Follows accessibility best practices

## Next Steps for Production

1. Implement authentication to associate conversations with user accounts
2. Connect to a production-ready database for storing conversations and itineraries
3. Integrate with a real AI service for natural language understanding
4. Connect to actual weather and destination information APIs
5. Implement analytics to track conversation completion and itinerary generation rates
