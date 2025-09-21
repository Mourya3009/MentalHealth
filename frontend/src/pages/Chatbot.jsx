import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext.jsx';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { success, error } = useToast();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('/api/chatbot/suggestions');
      setSuggestions(response.data.suggestions);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

    try {
      const response = await axios.post('/api/chatbot/chat', {
        message: userMessage
      });

      if (response.data) {
        // Add AI response to chat history
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          message: response.data.aiResponse 
        }]);
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      error(err.response?.data?.message || 'Failed to get response from AI');
      
      // Add error message to chat history
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            AI Mental Health
            <span className="block gradient-text">Assistant</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Share your feelings and get personalized support from our AI assistant. I'm here to listen and help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="card h-96 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-slate-400 py-8">
                    <svg className="w-12 h-12 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>Start a conversation by typing a message below</p>
                  </div>
                ) : (
                  chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          chat.type === 'user'
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        <p className="text-sm">{chat.message}</p>
                        {chat.type === 'ai' && (
                          <button
                            onClick={() => speakText(chat.message)}
                            className="mt-2 text-xs text-slate-400 hover:text-slate-300 transition-colors duration-200"
                          >
                            🔊 Listen
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="loading-spinner w-4 h-4"></div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 input-field"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
              <p className="text-slate-400 text-sm mb-4">
                Try one of these conversation starters:
              </p>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Be honest about your feelings</li>
                <li>• Ask specific questions</li>
                <li>• Share what's on your mind</li>
                <li>• Remember, this is a safe space</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;