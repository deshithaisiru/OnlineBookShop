import React, { useEffect, useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BookList } from './components/BookList';
import { BookCarousel } from './components/BookCarousel';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { LoginModal } from './components/LoginModal';
import { AnimatePresence, motion } from 'framer-motion';
export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const newArrivalsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    let ref;
    switch (sectionId) {
      case 'home':
        ref = homeRef;
        break;
      case 'categories':
        ref = categoriesRef;
        break;
      case 'featured':
        ref = featuredRef;
        break;
      case 'new-arrivals':
        ref = newArrivalsRef;
        break;
      case 'contact':
        ref = contactRef;
        break;
      default:
        ref = null;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header
      // Check which section is in view
      if (homeRef.current && scrollPosition < homeRef.current.offsetTop + homeRef.current.offsetHeight) {
        setActiveSection('home');
      } else if (categoriesRef.current && scrollPosition < categoriesRef.current.offsetTop + categoriesRef.current.offsetHeight) {
        setActiveSection('categories');
      } else if (featuredRef.current && scrollPosition < featuredRef.current.offsetTop + featuredRef.current.offsetHeight) {
        setActiveSection('featured');
      } else if (newArrivalsRef.current && scrollPosition < newArrivalsRef.current.offsetTop + newArrivalsRef.current.offsetHeight) {
        setActiveSection('new-arrivals');
      } else if (contactRef.current) {
        setActiveSection('contact');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };
  return <div className="flex flex-col min-h-screen bg-white">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} activeSection={activeSection} onNavLinkClick={scrollToSection} />
      <motion.main className="flex-grow" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        <div ref={homeRef} id="home">
          <Hero />
        </div>
        <div ref={categoriesRef} id="categories">
          <FeaturedCategories />
        </div>
        <div ref={featuredRef} id="featured">
          <BookList category="Featured Books" />
        </div>
        <div ref={newArrivalsRef} id="new-arrivals">
          <BookCarousel category="New Arrivals" />
        </div>
        <div ref={contactRef} id="contact" className="bg-gray-50 py-16">
          <motion.div className="container mx-auto px-4" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{
                  scale: 1.01
                }} transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Your name" />
                  </motion.div>
                  <motion.div whileHover={{
                  scale: 1.01
                }} transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Your email" />
                  </motion.div>
                </div>
                <motion.div whileHover={{
                scale: 1.01
              }} transition={{
                type: 'spring',
                stiffness: 400,
                damping: 10
              }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Message subject" />
                </motion.div>
                <motion.div whileHover={{
                scale: 1.01
              }} transition={{
                type: 'spring',
                stiffness: 400,
                damping: 10
              }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Your message"></textarea>
                </motion.div>
                <motion.button type="submit" className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors" whileHover={{
                scale: 1.05,
                backgroundColor: '#C53030'
              }} whileTap={{
                scale: 0.95
              }}>
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
      <ChatbotWidget />
      <AnimatePresence>
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      </AnimatePresence>
    </div>;
}