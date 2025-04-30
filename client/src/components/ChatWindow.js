import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import user from './assets/user.png';

const BOT_WELCOME_MESSAGES = [
  { text: "Welcome! Let's find the right career paths. 🌟", sender: "bot", sector: "career_guidance" },
  { text: "Discover fields like IT, Business, and Engineering! 🚀", sender: "bot", sector: "explore_fields" },
  { text: "Explore job opportunities that match my passions. 💼", sender: "bot", sector: "job_matching" },
  { text: "I'll Interests, and suggest careers! 🎯", sender: "bot", sector: "interest_matching" }
];

function ChatWindow({ session, updateSession }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSector, setCurrentSector] = useState(null);
  const bottomRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session.messages]);

  // Initialize conversation with welcome messages
  useEffect(() => {
    if (session.messages.length === 1 && session.messages[0].sender === 'bot') {
      const updatedSession = {
        ...session,
        messages: [...session.messages, ...BOT_WELCOME_MESSAGES],
        id: Date.now()
      };
      updateSession(updatedSession.messages);
    }
  }, [session, updateSession]);

  const handleSend = async (messageText = null, sector = null) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const newSector = sector || currentSector;
    if (sector) setCurrentSector(sector);

    const sessionId = session.id || Date.now();
    const userMessage = { text: textToSend, sender: 'user', sector: newSector };
    const updatedMessages = [...session.messages, userMessage];
    updateSession(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, user_id: sessionId, sector: newSector })
      });

      const data = await response.json();
      const botReply = data.response || "Sorry, I didn't catch that.";

      const botMessage = { text: botReply, sender: "bot", sector: newSector };
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
        <img className="avatar1" src={user} alt="avatar1" />
        <div>
          <div className="agent-name">EduGenie</div>
          <div className="status">
            {currentSector ? `Discussing: ${formatSectorName(currentSector)}` : 'We are online!'}
          </div>
        </div>
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
        <div ref={bottomRef}></div> {/* Auto-scroll target */}
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

function formatSectorName(sector) {
  return sector
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default ChatWindow;
