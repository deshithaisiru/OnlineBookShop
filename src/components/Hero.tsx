import React, { useState, Children } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchAutocomplete } from './ui/SearchAutocomplete';
export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <section className="relative bg-gray-50 overflow-hidden">
      <motion.div className="container mx-auto px-4 py-12 md:py-24" variants={containerVariants} initial="hidden" animate="visible">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <motion.h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4" variants={itemVariants}>
              Discover Your Next{' '}
              <motion.span className="text-red-600" animate={{
              scale: [1, 1.05, 1],
              color: ['#E53E3E', '#C53030', '#E53E3E']
            }} transition={{
              duration: 4,
              repeat: Infinity
            }}>
                Favorite Book
              </motion.span>
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-8 max-w-md" variants={itemVariants}>
              Explore thousands of titles across fiction, non-fiction, academic,
              and children's books at Sri Lanka's premier bookstore.
            </motion.p>
            <motion.div className="relative max-w-md" variants={itemVariants}>
              <div className="relative">
                <motion.input type="text" placeholder="Search by title, author, or ISBN..." className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} animate={{
                boxShadow: isFocused ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }} transition={{
                duration: 0.3
              }} />
                <motion.button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Search size={20} />
                </motion.button>
              </div>
              {isFocused && searchTerm && <SearchAutocomplete searchTerm={searchTerm} />}
            </motion.div>
          </div>
          <motion.div className="w-full md:w-1/2 flex justify-center md:justify-end" variants={itemVariants}>
            <motion.img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Books arranged on shelves" className="rounded-lg shadow-lg max-w-full h-auto" style={{
            maxHeight: '400px'
          }} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} whileHover={{
            scale: 1.03,
            transition: {
              duration: 0.3
            }
          }} />
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.6,
      duration: 0.8
    }}></motion.div>
    </section>;
};