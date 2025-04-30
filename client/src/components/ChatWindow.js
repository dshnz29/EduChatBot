import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatWindow.css';
import user from './assets/user.png';
import logo from './assets/logo.png';

const BOT_WELCOME_MESSAGES = [
  { 
    text: "Welcome! Let's find the right career path for you. 🌟", 
    sender: "bot",
    sector: "career_guidance" 
  },
  { 
    text: "Discover fields like IT, Business, and Engineering! 🚀", 
    sender: "bot",
    sector: "explore_fields" 
  },
  { 
    text: "Explore job opportunities that match your passions. 💼", 
    sender: "bot",
    sector: "job_matching" 
  },
  { 
    text: "Share your interests, and I'll suggest careers! 🎯", 
    sender: "bot",
    sector: "interest_matching" 
  }
];

function ChatWindow({ session, updateSession }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSector, setCurrentSector] = useState(null);

  // Initialize conversation with welcome messages
  useEffect(() => {
    if (session.messages.length === 1 && session.messages[0].sender === 'bot') {
      // Add BOT_WELCOME_MESSAGES when starting a new session
      const updatedSession = {
        ...session,
        messages: [...session.messages, ...BOT_WELCOME_MESSAGES],
        id: Date.now() // Add unique ID if not present
      };
      updateSession(updatedSession.messages);
    }
  }, [session, updateSession]);

  const handleSend = async (messageText = null, sector = null) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const newSector = sector || currentSector;
    if (sector) {
      setCurrentSector(sector);
    }

    const userMessage = { 
      text: textToSend, 
      sender: 'user',
      sector: newSector
    };
    const updatedMessages = [...session.messages, userMessage];
    updateSession(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: textToSend,
        sector: newSector,
        session_id: session.id || Date.now() // Fallback to timestamp if no ID
      });

      const botMessage = { 
        text: res.data.reply, 
        sender: 'bot',
        sector: res.data.sector || newSector
      };

      if (res.data.sector) {
        setCurrentSector(res.data.sector);
      }

      updateSession([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot'
      };
      updateSession([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBotMessageClick = (msg) => {
    if (msg.sender === 'bot' && msg.sector) {
      handleSend(msg.text, msg.sector);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        {/* <div className="avatar1"> */}
          <img className="avatar1" src={user} alt="avatar1" />
        {/* </div> */}
        <div>
          <div className="agent-name">EduGenie</div>
          <div className="status">
            {currentSector ? `Discussing: ${formatSectorName(currentSector)}` : 'We are online!'}
          </div>
        </div>
        <div><img className="logo" src={logo} alt="logo1" /></div>
      </div>

      <div className="chat-box">
        {session.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender} ${msg.sender === 'bot' && msg.sector ? 'clickable' : ''}`}
            onClick={() => handleBotMessageClick(msg)}
          >
            {msg.text}
            {isLoading && idx === session.messages.length - 1 && (
              <span className="typing-indicator">...</span>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSend()} 
          disabled={isLoading || !input.trim()}
        >
          <span>&#9658;</span>
        </button>
      </div>
    </div>
  );
}

// Helper function to format sector names for display
function formatSectorName(sector) {
  return sector
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default ChatWindow;
