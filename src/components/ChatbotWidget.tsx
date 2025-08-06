import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([{
    id: 1,
    text: 'Hello! How can I help you with your book search today?',
    isBot: true
  }]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add user message to chat
    setChatHistory([...chatHistory, {
      id: Date.now(),
      text: message,
      isBot: false
    }]);
    // Clear input
    setMessage('');
    // Simulate bot response after a short delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Thanks for your message! Our support team will get back to you shortly.',
        isBot: true
      }]);
    }, 1000);
  };
  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };
  const buttonVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.1,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    tap: {
      scale: 0.9
    }
  };
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen ? <motion.div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden" variants={chatVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div className="bg-red-600 text-white p-4 flex justify-between items-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
              <h3 className="font-medium">Vijitha Yapa Support</h3>
              <motion.button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <X size={20} />
              </motion.button>
            </motion.div>
            <motion.div className="flex-grow h-80 overflow-y-auto p-4 bg-gray-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
              <AnimatePresence>
                {chatHistory.map(msg => <motion.div key={msg.id} className={`mb-3 ${msg.isBot ? 'text-left' : 'text-right'}`} variants={messageVariants} initial="hidden" animate="visible" transition={{
              duration: 0.3
            }}>
                    <motion.div className={`inline-block rounded-lg py-2 px-3 max-w-[80%] ${msg.isBot ? 'bg-gray-200 text-gray-800' : 'bg-red-600 text-white'}`} initial={{
                scale: 0.8
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                damping: 15
              }}>
                      {msg.text}
                    </motion.div>
                  </motion.div>)}
              </AnimatePresence>
            </motion.div>
            <motion.form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
              <motion.input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-600" whileFocus={{
            boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.2)'
          }} />
              <motion.button type="submit" className="bg-red-600 text-white p-2 rounded-r-md hover:bg-red-700" aria-label="Send message" whileHover={{
            backgroundColor: '#C53030'
          }} whileTap={{
            scale: 0.95
          }}>
                <Send size={20} />
              </motion.button>
            </motion.form>
          </motion.div> : <motion.button onClick={() => setIsOpen(true)} className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors" aria-label="Open chat support" variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap" animate={{
        y: [0, -8, 0]
      }} transition={{
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1.5,
          ease: 'easeInOut',
          repeatDelay: 4
        }
      }}>
            <MessageCircle size={24} />
          </motion.button>}
      </AnimatePresence>
    </div>;
};