import React from 'react';
import styles from './chatbotPage.module.css';
import ChatbotContainer from './ChatbotContainer';

const ChatbotPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Plan Your Perfect Trip</h1>
        <p>Chat with our AI travel assistant to create a personalized itinerary</p>
      </div>
      
      <div className={styles.chatbotSection}>
        <ChatbotContainer />
      </div>
      
      <div className={styles.featuresSection}>
        <h2>How It Works</h2>
        <div className={styles.featuresList}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💬</div>
            <h3>Chat Naturally</h3>
            <p>Tell our AI assistant about your travel preferences in a natural conversation</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌦️</div>
            <h3>Get Real Insights</h3>
            <p>Receive destination information, weather forecasts, and local tips</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📋</div>
            <h3>Create Your Itinerary</h3>
            <p>Generate a complete day-by-day travel plan based on your conversation</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✏️</div>
            <h3>Customize Everything</h3>
            <p>Edit, add, or remove activities to make the itinerary perfect for you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
