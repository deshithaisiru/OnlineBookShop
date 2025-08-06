import React, { Children } from 'react';
import { BookOpen, Users, GraduationCap, Baby } from 'lucide-react';
import { motion } from 'framer-motion';
const categories = [{
  id: 1,
  name: 'Fiction',
  icon: <BookOpen size={28} />,
  description: 'Novels, short stories, and literary fiction',
  color: 'bg-red-100 text-red-600',
  hoverColor: 'hover:bg-red-600 hover:text-white'
}, {
  id: 2,
  name: 'Local Authors',
  icon: <Users size={28} />,
  description: 'Books by Sri Lankan writers',
  color: 'bg-blue-100 text-blue-600',
  hoverColor: 'hover:bg-blue-600 hover:text-white'
}, {
  id: 3,
  name: 'Academic',
  icon: <GraduationCap size={28} />,
  description: 'Textbooks and educational resources',
  color: 'bg-green-100 text-green-600',
  hoverColor: 'hover:bg-green-600 hover:text-white'
}, {
  id: 4,
  name: 'Kids',
  icon: <Baby size={28} />,
  description: "Children's books and young adult fiction",
  color: 'bg-yellow-100 text-yellow-600',
  hoverColor: 'hover:bg-yellow-600 hover:text-white'
}];
export const FeaturedCategories = () => {
  return <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          Browse by Category
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => <motion.div key={category.id} className={`rounded-lg p-6 transition-all duration-300 cursor-pointer ${category.color}`} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} whileHover={{
          y: -8,
          backgroundColor: category.name === 'Fiction' ? '#FEB2B2' : category.name === 'Local Authors' ? '#BEE3F8' : category.name === 'Academic' ? '#C6F6D5' : '#FEFCBF',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
              <div className="flex flex-col items-center text-center">
                <motion.div className="mb-4" whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: {
                duration: 0.5
              }
            }}>
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};