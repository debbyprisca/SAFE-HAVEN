import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, AlertTriangle, User, ShieldCheck } from 'lucide-react';

const LiveSupportPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'system',
      text: 'Welcome to Safe Haven live support. An advocate will be with you shortly. All conversations are confidential.',
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: 'advocate',
      text: 'Hello, I\'m a trained advocate here to listen and help. How can I support you today?',
      timestamp: new Date(Date.now() + 1000),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);

  // Auto-responses simulation
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && lastMessage.sender === 'user') {
      setIsTyping(true);
      
      const timer = setTimeout(() => {
        setIsTyping(false);
        
        // Simulated advocate response
        const responseOptions = [
          "I understand that must be difficult. Can you tell me more about your situation?",
          "Thank you for sharing that with me. You're not alone, and we're here to help.",
          "I want you to know that what you're experiencing is not your fault.",
          "Your safety is the most important thing. Let's talk about some options you might have.",
          "That sounds really challenging. I'm here to listen and support you through this.",
        ];
        
        const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
        
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'advocate',
            text: randomResponse,
            timestamp: new Date(),
          },
        ]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Simulated wait time
  useEffect(() => {
    setWaitTime(Math.floor(Math.random() * 3) + 1);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'user',
        text: newMessage.trim(),
        timestamp: new Date(),
      },
    ]);
    
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Live Support</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Chat confidentially with a trained advocate who can provide support, information, and resources.
        </p>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm mb-8">
        <div className="flex">
          <AlertTriangle size={24} className="text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">In immediate danger?</h2>
            <p className="text-gray-600">This chat is not monitored for emergencies. Call <a href="tel:999 or 122" className="font-bold text-red-600 hover:underline">999 or 122</a> or the National Domestic Violence Hotline: <a href="tel:0714667772" className="font-bold text-red-600 hover:underline">0714667772</a></p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ShieldCheck size={20} className="mr-2" />
              <h2 className="font-semibold">Advocate Support</h2>
            </div>
            {waitTime && (
              <div className="flex items-center text-sm bg-blue-700 px-3 py-1 rounded-full">
                <Clock size={14} className="mr-1" />
                <span>Est. wait: {waitTime} min</span>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="border-b border-gray-200 p-3 bg-blue-50">
          <div className="flex items-start">
            <div className="mr-2 text-blue-600">
              <ShieldCheck size={18} />
            </div>
            <p className="text-sm text-gray-700">
              This conversation is confidential. For your safety, the chat will automatically clear when you close this window.
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'advocate' && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
                
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : message.sender === 'advocate'
                      ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                      : 'bg-gray-100 text-gray-700 w-full max-w-full'
                  }`}
                >
                  {message.sender === 'advocate' && (
                    <div className="text-xs text-blue-600 font-medium mb-1">Advocate</div>
                  )}
                  <p className="whitespace-pre-line">{message.text}</p>
                  <div 
                    className={`text-xs mt-1 text-right ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <User size={16} className="text-blue-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-bl-none">
                  <div className="text-xs text-blue-600 font-medium mb-1">Advocate</div>
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot animation-delay-200"></div>
                    <div className="typing-dot animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`px-4 py-2 rounded-md flex items-center justify-center transition-colors ${
                newMessage.trim() 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Support Options */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-800 mb-2">National Domestic Violence Hotline</h3>
          <p className="text-gray-600 mb-3">Speak with an advocate by phone for support, resources, and safety planning.</p>
          <a 
            href="tel:0714667772" 
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Call 0714667772
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-800 mb-2">Text Support</h3>
          <p className="text-gray-600 mb-3">If you can't speak safely, text with an advocate for support and information.</p>
          <a 
            href="sms:0779999999?body=START" 
            className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Text "START" to 0779999999
          </a>
        </div>
      </div>
    </div>
  );
};

interface Message {
  id: number;
  sender: 'user' | 'advocate' | 'system';
  text: string;
  timestamp: Date;
}

export default LiveSupportPage;