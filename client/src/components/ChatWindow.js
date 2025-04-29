// ChatWindow.js
import React, { useState } from 'react';
import ChatHistory from './ChatHistory'; // Import the ChatHistory component
import './ChatWindow.css'; // Import the styles for the chat window

const ChatWindow = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: userInput }]);
      const botResponse = getBotResponse(userInput); // Get the bot's response
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'bot', text: botResponse }]);
      setUserInput(''); // Clear the input after sending
    }
  };

  const getBotResponse = (userMessage) => {
    // Sample bot responses
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi! How can I assist you today?";
    } else {
      return "I'm sorry, I don't understand that.";
    }
  };

  return (
    <div className="chat-window">
      <ChatHistory messages={messages} />
      <div className="input-section">
        <input 
          type="text" 
          value={userInput} 
          onChange={handleInputChange} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
