import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Message, UserProfile } from '../types/chat';
import { chatbotService } from '../services/chatbotService';
import { v4 as uuidv4 } from 'uuid';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    conversationHistory: [],
    lastActive: new Date()
  });
  const [showWelcome, setShowWelcome] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage: Message = {
      id: uuidv4(),
      content: "Hello! I'm here to provide mental health support and be a listening ear. I'm trained to offer emotional support, information about mental health, and crisis resources when needed. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      supportType: 'emotional'
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserProfile(prev => ({ ...prev, name, preferredName: name }));
    setShowWelcome(false);
    
    const personalizedMessage: Message = {
      id: uuidv4(),
      content: `Nice to meet you, ${name}! I'm glad you're here. This is a safe space where you can share your thoughts and feelings. What's on your mind today?`,
      sender: 'bot',
      timestamp: new Date(),
      supportType: 'emotional'
    };
    
    setMessages(prev => [...prev, personalizedMessage]);
  };

  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate typing delay
    await simulateTyping(Math.random() * 1000 + 500);

    // Get bot response
    const botResponse = chatbotService.processMessage(inputValue, userProfile.name);
    setMessages(prev => [...prev, botResponse]);

    // Update user profile
    setUserProfile(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, userMessage, botResponse],
      lastActive: new Date()
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSupportTypeIcon = (supportType?: string) => {
    switch (supportType) {
      case 'crisis':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'informational':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'emotional':
        return <Heart className="w-4 h-4 text-pink-500" />;
      default:
        return <Bot className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSupportTypeColor = (supportType?: string) => {
    switch (supportType) {
      case 'crisis':
        return 'border-l-red-500 bg-red-50';
      case 'informational':
        return 'border-l-blue-500 bg-blue-50';
      case 'emotional':
        return 'border-l-pink-500 bg-pink-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Mental Health Support</h1>
              <p className="text-sm text-gray-600">Your compassionate AI companion</p>
            </div>
          </div>
          {userProfile.name && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Welcome, {userProfile.name}</p>
              <p className="text-xs text-gray-500">Safe space • Confidential</p>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Safe Space</h2>
                <p className="text-gray-600">I'm here to provide emotional support and mental health resources. To make our conversation more personal, may I know your name?</p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                if (name.trim()) {
                  handleNameSubmit(name.trim());
                } else {
                  setShowWelcome(false);
                }
              }}>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  autoFocus
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWelcome(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                      : `bg-white border-l-4 ${getSupportTypeColor(message.supportType)} shadow-sm`
                  }`}>
                    {message.sender === 'bot' && (
                      <div className="flex items-center space-x-2 mb-2">
                        {getSupportTypeIcon(message.supportType)}
                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          {message.supportType || 'Support'}
                        </span>
                      </div>
                    )}
                    
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.content}
                    </p>
                    
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {format(message.timestamp, 'HH:mm')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-l-4 border-l-gray-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts or ask about mental health..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              🔒 This is a safe, confidential space. For crisis support, call 988 or text HOME to 741741
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;