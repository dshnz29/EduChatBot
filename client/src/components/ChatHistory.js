import React from 'react';
import './ChatHistory.css';

function ChatHistory({ sessions, onSelect, activeSession }) {
  return (
    <div className="chat-history">
      <div className="history-header">My Chats</div>
      {sessions.map((session, index) => (
        <div
          key={index}
          className={`history-item ${activeSession === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          Chat {index + 1}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
