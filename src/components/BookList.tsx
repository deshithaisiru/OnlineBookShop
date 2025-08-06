import React, { useState, Children } from 'react';
import { BookCard } from './BookCard';
import { motion, AnimatePresence } from 'framer-motion';
// Mock data for books
const books = [{
  id: 1,
  title: 'The Island of a Thousand Mirrors',
  author: 'Nayomi Munaweera',
  price: 1800,
  coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Fiction',
  featured: true
}, {
  id: 2,
  title: "Anil's Ghost",
  author: 'Michael Ondaatje',
  price: 2200,
  coverImage: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Local Authors',
  featured: true
}, {
  id: 3,
  title: 'Advanced Mathematics',
  author: 'Dr. Sarath Perera',
  price: 3500,
  coverImage: 'https://images.unsplash.com/photo-1569728723358-d1a317aa7fba?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Academic',
  featured: false
}, {
  id: 4,
  title: 'Adventures of Sinbad',
  author: "Children's Classics",
  price: 1200,
  coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Kids',
  featured: true
}, {
  id: 5,
  title: 'The English Teacher',
  author: 'R.K. Narayan',
  price: 1650,
  coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Fiction',
  featured: false
}, {
  id: 6,
  title: 'The Road From Elephant Pass',
  author: 'Nihal De Silva',
  price: 1950,
  coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Local Authors',
  featured: true
}];
interface BookListProps {
  category: string;
}
export const BookList = ({
  category
}: BookListProps) => {
  // Available filters
  const filters = ['All', 'Fiction', 'Local Authors', 'Academic', 'Kids'];
  const [activeFilter, setActiveFilter] = useState('All');
  // Filter books based on category, featured status, and active filter
  const filteredBooks = books.filter(book => {
    // First filter by section category (Featured Books or New Arrivals)
    const categoryMatch = category === 'Featured Books' ? book.featured : true;
    // Then filter by selected category filter
    const filterMatch = activeFilter === 'All' || book.category === activeFilter;
    return categoryMatch && filterMatch;
  });
  return <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div className="flex justify-between items-center mb-8" initial={{
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {category}
          </h2>
          <motion.a href="#" className="text-red-600 hover:text-red-700 font-medium" whileHover={{
          scale: 1.05,
          x: 3
        }} whileTap={{
          scale: 0.95
        }}>
            View All
          </motion.a>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div className="flex flex-wrap gap-2 mb-6" initial={{
        opacity: 0,
        y: 10
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          {filters.map(filter => <motion.button key={filter} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setActiveFilter(filter)} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
              {filter}
            </motion.button>)}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.5
        }}>
            {filteredBooks.map(book => <BookCard key={book.id} book={book} />)}
          </motion.div>
        </AnimatePresence>

        {filteredBooks.length === 0 && <motion.div className="text-center py-12" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
            <p className="text-gray-500">No books found in this category.</p>
          </motion.div>}
      </div>
    </section>;
};