import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
}
interface BookCardProps {
  book: Book;
}
export const BookCard = ({
  book
}: BookCardProps) => {
  return <motion.div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.5
  }} whileHover={{
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }}>
      <motion.div className="relative pt-[140%]" whileHover={{
      scale: 1.05
    }} transition={{
      duration: 0.3
    }}>
        <img src={book.coverImage} alt={`Cover of ${book.title}`} className="absolute inset-0 w-full h-full object-cover" />
        <motion.div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" whileHover={{
        backgroundColor: 'rgba(0,0,0,0.1)'
      }} />
      </motion.div>
      <div className="p-4 flex flex-col flex-grow">
        <motion.span className="text-xs text-red-600 font-medium mb-1" whileHover={{
        scale: 1.05
      }}>
          {book.category}
        </motion.span>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <motion.span className="font-bold text-gray-800" initial={{
          opacity: 0.8
        }} whileHover={{
          scale: 1.05,
          opacity: 1
        }}>
            Rs. {book.price.toLocaleString()}
          </motion.span>
          <motion.button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors" aria-label={`Add ${book.title} to cart`} whileHover={{
          scale: 1.1,
          backgroundColor: '#C53030'
        }} whileTap={{
          scale: 0.9
        }} initial={{
          boxShadow: '0 0 0 rgba(229, 62, 62, 0)'
        }} animate={{
          boxShadow: '0 0 0 rgba(229, 62, 62, 0)'
        }} whileHover={{
          boxShadow: '0 0 10px rgba(229, 62, 62, 0.5)'
        }}>
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>;
};

//commit