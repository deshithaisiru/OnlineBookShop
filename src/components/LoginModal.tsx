import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface LoginModalProps {
  onClose: () => void;
}
export const LoginModal = ({
  onClose
}: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const overlayVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };
  const formFieldVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3
      }
    })
  };
  return <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
      <motion.div className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden" variants={modalVariants} initial="hidden" animate="visible" exit="hidden" transition={{
      type: 'spring',
      damping: 25,
      stiffness: 300
    }} onClick={e => e.stopPropagation()}>
        <motion.button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" aria-label="Close" whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }}>
          <X size={24} />
        </motion.button>
        <div className="p-6">
          <motion.h2 className="text-2xl font-bold text-gray-800 mb-6 text-center" initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            {isLogin ? 'Login to Your Account' : 'Create an Account'}
          </motion.h2>
          <motion.div className="flex border-b border-gray-200 mb-6" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <motion.button className={`flex-1 py-2 text-center font-medium ${isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`} onClick={() => setIsLogin(true)} whileHover={{
            backgroundColor: '#F7FAFC'
          }} whileTap={{
            scale: 0.98
          }}>
              Login
            </motion.button>
            <motion.button className={`flex-1 py-2 text-center font-medium ${!isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`} onClick={() => setIsLogin(false)} whileHover={{
            backgroundColor: '#F7FAFC'
          }} whileTap={{
            scale: 0.98
          }}>
              Sign Up
            </motion.button>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.form key={isLogin ? 'login' : 'signup'} className="space-y-4" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.3
          }}>
              {!isLogin && <motion.div variants={formFieldVariants} initial="hidden" animate="visible" custom={0}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <motion.input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600" placeholder="Enter your name" required whileFocus={{
                boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.2)'
              }} />
                </motion.div>}
              <motion.div variants={formFieldVariants} initial="hidden" animate="visible" custom={isLogin ? 0 : 1}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <motion.input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600" placeholder="Enter your email" required whileFocus={{
                boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.2)'
              }} />
              </motion.div>
              <motion.div variants={formFieldVariants} initial="hidden" animate="visible" custom={isLogin ? 1 : 2}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <motion.input type="password" id="password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600" placeholder="Enter your password" required whileFocus={{
                boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.2)'
              }} />
              </motion.div>
              {!isLogin && <motion.div variants={formFieldVariants} initial="hidden" animate="visible" custom={3}>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <motion.input type="password" id="confirm-password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600" placeholder="Confirm your password" required whileFocus={{
                boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.2)'
              }} />
                </motion.div>}
              {isLogin && <motion.div className="flex items-center justify-between" variants={formFieldVariants} initial="hidden" animate="visible" custom={2}>
                  <div className="flex items-center">
                    <input id="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <motion.a href="#" className="text-sm text-red-600 hover:text-red-700" whileHover={{
                scale: 1.05
              }}>
                    Forgot password?
                  </motion.a>
                </motion.div>}
              <motion.button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium" variants={formFieldVariants} initial="hidden" animate="visible" custom={isLogin ? 3 : 4} whileHover={{
              scale: 1.02,
              backgroundColor: '#C53030'
            }} whileTap={{
              scale: 0.98
            }}>
                {isLogin ? 'Login' : 'Sign Up'}
              </motion.button>
            </motion.form>
          </AnimatePresence>
          <motion.div className="mt-6 text-center text-sm text-gray-600" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.6
        }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <motion.button className="text-red-600 font-medium hover:text-red-700" onClick={() => setIsLogin(!isLogin)} whileHover={{
            scale: 1.05
          }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};