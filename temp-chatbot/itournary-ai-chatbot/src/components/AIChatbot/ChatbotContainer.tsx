import React, { useState } from 'react';
import styles from './chatbotContainer.module.css';
import ChatInterface from './ChatInterface';
import ItineraryEditor from './ItineraryEditor';
import { ChatbotProvider } from './useChatbot';

interface ChatbotContainerProps {
  initialView?: 'chat' | 'itinerary';
}

const ChatbotContainer: React.FC<ChatbotContainerProps> = ({ 
  initialView = 'chat' 
}) => {
  const [view, setView] = useState<'chat' | 'itinerary'>(initialView);
  const [itineraryId, setItineraryId] = useState<string | null>(null);

  const handleItineraryGenerated = (generatedItineraryId: string) => {
    setItineraryId(generatedItineraryId);
    setView('itinerary');
  };

  const handleBackToChat = () => {
    setView('chat');
  };

  return (
    <ChatbotProvider>
      <div className={styles.container}>
        {view === 'chat' ? (
          <ChatInterface onComplete={handleItineraryGenerated} />
        ) : (
          <ItineraryEditor 
            itineraryId={itineraryId || ''} 
            onBack={handleBackToChat}
          />
        )}
      </div>
    </ChatbotProvider>
  );
};

export default ChatbotContainer;
