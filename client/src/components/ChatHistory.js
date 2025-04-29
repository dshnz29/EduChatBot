import React, { useEffect } from 'react';
import './ChatHistory.css';

function ChatHistory({ sessions, onSelect, activeSession }) {
  useEffect(() => {
    if (sessions.length > 0) {
      onSelect(0); // Select the first session by default if there are sessions
    }
  }, [sessions, onSelect]); // Added onSelect to the dependency array

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
