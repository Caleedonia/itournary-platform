"use client";

import { useState } from 'react';
import { ChatbotContainer } from '@/components/AIChatbot';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <h3 className="font-medium">AI Trip Planner</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="h-[calc(100%-56px)]">
            <ChatbotContainer />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
       )}
    </div>
  );
}
