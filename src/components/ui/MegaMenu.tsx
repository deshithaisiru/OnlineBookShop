import React, { Children } from 'react';
import { motion } from 'framer-motion';
interface MegaMenuProps {
  onCategoryClick?: (category: string) => void;
}
export const MegaMenu = ({
  onCategoryClick
}: MegaMenuProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };
  const columnVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  const linkVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };
  const tagVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1
    }
  };
  const handleCategoryClick = (category: string) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };
  return <motion.div className="container mx-auto px-4 py-8" variants={containerVariants} initial="hidden" animate="visible">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[{
        title: 'Fiction',
        links: ['Literary Fiction', 'Mystery & Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical Fiction']
      }, {
        title: 'Local Authors',
        links: ['Sri Lankan Fiction', 'Sri Lankan Poetry', 'Sinhala Literature', 'Tamil Literature', 'Sri Lankan History']
      }, {
        title: 'Academic',
        links: ['School Textbooks', 'University Books', 'Professional Exams', 'Language Learning', 'Study Guides']
      }, {
        title: 'Kids',
        links: ['Picture Books', 'Early Readers', 'Middle Grade', 'Young Adult', 'Educational']
      }].map((category, index) => <motion.div key={category.title} variants={columnVariants} transition={{
        duration: 0.3,
        delay: index * 0.1
      }}>
            <motion.h3 className="font-semibold text-lg text-gray-800 mb-4 cursor-pointer" whileHover={{
          color: '#E53E3E'
        }} onClick={() => handleCategoryClick(category.title)}>
              {category.title}
            </motion.h3>
            <motion.ul className="space-y-2" variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}>
              {category.links.map(link => <motion.li key={link} variants={linkVariants}>
                  <motion.a href="#" className="text-gray-600 hover:text-red-600 block" whileHover={{
              x: 3,
              color: '#E53E3E'
            }} transition={{
              duration: 0.2
            }} onClick={e => {
              e.preventDefault();
              handleCategoryClick(`${category.title} - ${link}`);
            }}>
                    {link}
                  </motion.a>
                </motion.li>)}
            </motion.ul>
          </motion.div>)}
      </div>
      <motion.div className="mt-8 pt-6 border-t border-gray-200" variants={columnVariants} transition={{
      delay: 0.4
    }}>
        <motion.div className="flex flex-wrap gap-4" variants={{
        visible: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}>
          {['New Releases', 'Bestsellers', 'Award Winners', 'Special Offers', 'Pre-orders'].map(tag => <motion.a key={tag} href="#" className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-red-100 hover:text-red-600" variants={tagVariants} whileHover={{
          scale: 1.05,
          backgroundColor: '#FED7D7',
          color: '#E53E3E'
        }} whileTap={{
          scale: 0.95
        }} onClick={e => {
          e.preventDefault();
          handleCategoryClick(tag);
        }}>
              {tag}
            </motion.a>)}
        </motion.div>
      </motion.div>
    </motion.div>;
};