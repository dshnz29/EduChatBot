// ChatHistory.js
import React from 'react';
import './ChatHistory.css'; // Import the styles for the chat history

const ChatHistory = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
