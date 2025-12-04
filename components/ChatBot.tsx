import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Merhaba! Türkiye Enerji İstatistikleri hakkında size nasıl yardımcı olabilirim? / Hello! How can I help you with Turkey Energy Statistics?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat: Chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are an intelligent assistant for the "Turkey Energy Statistics Portal". You have access to general knowledge about energy sectors (Industry, Services, Transport, Household) and PEFA accounts. Answer questions concisely and professionally.',
        },
      });

      // Send the history + new message. 
      // Note: For simplicity in this demo, we are sending the new message to a new chat instance 
      // or we could maintain a persistent chat object. 
      // To keep it simple and stateless regarding the API object, we'll just send the current prompt.
      // For better context, you would typically convert `messages` state to the API's history format.
      
      const result: GenerateContentResponse = await chat.sendMessage({ 
        message: userMessage 
      });

      const responseText = result.text || "I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyiniz. (API Error)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} bg-gradient-to-r from-blue-600 to-indigo-600 text-white`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Sparkles size={18} className="text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Enerji Asistanı AI</h3>
              <p className="text-[10px] text-blue-100 opacity-80">Powered by Gemini 3.0 Pro</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-100 text-blue-600'}`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-500" /> : <Bot size={18} />}
              </div>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                 <Bot size={18} />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-blue-500" />
                 <span className="text-xs text-slate-400">Düşünüyor... / Thinking...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Bir soru sorun..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-lg transition-colors ${
                inputValue.trim() && !isLoading 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}