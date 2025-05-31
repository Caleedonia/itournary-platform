import React from 'react';
import styles from './chatbotTest.module.css';
import ChatbotContainer from './ChatbotContainer';

const ChatbotTest: React.FC = () => {
  return (
    <div className={styles.testContainer}>
      <div className={styles.testHeader}>
        <h1>iTournary AI Chatbot Test</h1>
        <p>This page allows you to test the AI chatbot and itinerary generation functionality.</p>
      </div>
      
      <div className={styles.testInstructions}>
        <h2>Test Instructions</h2>
        <ol>
          <li>Start a conversation with the AI assistant</li>
          <li>Provide travel details (destination, dates, travelers, preferences)</li>
          <li>Continue the conversation until the "Generate My Itinerary" button appears</li>
          <li>Click the button to generate an itinerary</li>
          <li>Test the itinerary editor functionality</li>
          <li>Use the "Back to Chat" button to return to the conversation</li>
        </ol>
      </div>
      
      <div className={styles.testCases}>
        <h2>Test Cases</h2>
        <div className={styles.testCase}>
          <h3>Test Case 1: Basic Conversation Flow</h3>
          <p>Sample inputs:</p>
          <ul>
            <li>"I want to plan a trip to Bali"</li>
            <li>"We'll be traveling in June for 7 days"</li>
            <li>"There will be 2 adults"</li>
            <li>"We're interested in beaches and cultural experiences"</li>
            <li>"Our budget is mid-range"</li>
          </ul>
        </div>
        
        <div className={styles.testCase}>
          <h3>Test Case 2: Undecided Destination</h3>
          <p>Sample inputs:</p>
          <ul>
            <li>"I'm planning an anniversary trip but not sure where to go"</li>
            <li>"We want a romantic destination with good food"</li>
            <li>"Our budget is around $3000"</li>
            <li>"We can travel for about 5 days in September"</li>
          </ul>
        </div>
        
        <div className={styles.testCase}>
          <h3>Test Case 3: Family Vacation</h3>
          <p>Sample inputs:</p>
          <ul>
            <li>"I need to plan a family vacation"</li>
            <li>"We have 2 adults and 2 children ages 8 and 10"</li>
            <li>"We want something with activities for kids"</li>
            <li>"We're thinking of Orlando or similar"</li>
            <li>"Budget is flexible but we want good value"</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.chatbotWrapper}>
        <ChatbotContainer />
      </div>
      
      <div className={styles.testResults}>
        <h2>Test Results</h2>
        <div className={styles.testResult}>
          <h3>Conversation Flow</h3>
          <div className={styles.resultStatus}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Testing required</span>
          </div>
        </div>
        
        <div className={styles.testResult}>
          <h3>Contextual Responses</h3>
          <div className={styles.resultStatus}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Testing required</span>
          </div>
        </div>
        
        <div className={styles.testResult}>
          <h3>Itinerary Generation</h3>
          <div className={styles.resultStatus}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Testing required</span>
          </div>
        </div>
        
        <div className={styles.testResult}>
          <h3>Itinerary Editing</h3>
          <div className={styles.resultStatus}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Testing required</span>
          </div>
        </div>
        
        <div className={styles.testResult}>
          <h3>UI Responsiveness</h3>
          <div className={styles.resultStatus}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Testing required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotTest;
