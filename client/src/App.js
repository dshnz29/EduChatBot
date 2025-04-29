import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatHistory from './components/ChatHistory';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([
    { 
      id: Date.now(),
      messages: [{ text: 'Hi 👋 How can I help you?', sender: 'bot' }] 
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateSession = (newMessages) => {
    const updatedSessions = [...sessions];
    updatedSessions[activeIndex].messages = newMessages;
    setSessions(updatedSessions);
  };

  const createNewSession = () => {
    setSessions([...sessions, { 
      id: Date.now(),
      messages: [{ text: 'Hi 👋 How can I help you?', sender: 'bot' }] 
    }]);
    setActiveIndex(sessions.length);
  };


  return (
    <div className="app-container">
      <ChatHistory
        sessions={sessions}
        activeSession={activeIndex}
        onSelect={setActiveIndex}
      />
      <ChatWindow
        session={sessions[activeIndex]}
        updateSession={updateSession}
      />
      <button className="new-chat-btn" onClick={createNewSession}>+ New Chat</button>
    </div>
  );
}

export default App;
