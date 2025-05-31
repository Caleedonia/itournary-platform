import React from 'react';
import styles from './chatMessage.module.css';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: Message;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.avatar}>
        {isUser ? (
          <div className={styles.userAvatar}>U</div>
        ) : (
          <div className={styles.assistantAvatar}>AI</div>
        )}
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageBubble}>
          {message.content.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              {i !== message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {message.timestamp && (
          <div className={styles.timestamp}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
