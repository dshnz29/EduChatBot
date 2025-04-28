import React, { useState } from 'react';
import axios from 'axios';
import './ChatHistory.css';

function ChatWindow({ session, updateSession }) {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    const updated = [...session.messages, userMessage];

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      updated.push({ text: res.data.reply, sender: 'bot' });
    } catch {
      updated.push({ text: 'Sorry, an error occurred.', sender: 'bot' });
    }

    updateSession(updated);
    setInput('');
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="avatar1"></div>
        <div>
          <div className="agent-name">EduGenie</div>
          <div className="status">We are online!</div>
        </div>
      </div>
      <div className="chat-box">
        {session.messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <span>&#9658;</span>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
