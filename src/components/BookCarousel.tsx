import React, { useEffect, useState, useRef, Children } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookCard } from './BookCard';
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
}, {
  id: 7,
  title: 'The Kite Runner',
  author: 'Khaled Hosseini',
  price: 2400,
  coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Fiction',
  featured: false
}, {
  id: 8,
  title: 'Life of Pi',
  author: 'Yann Martel',
  price: 1850,
  coverImage: 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  category: 'Fiction',
  featured: false
}];
interface BookCarouselProps {
  category: string;
}
export const BookCarousel = ({
  category
}: BookCarouselProps) => {
  // Available filters
  const filters = ['All', 'Fiction', 'Local Authors', 'Academic', 'Kids'];
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;
  // Filter books based on category and active filter
  const filteredBooks = books.filter(book => {
    const filterMatch = activeFilter === 'All' || book.category === activeFilter;
    return filterMatch;
  });
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const visibleBooks = filteredBooks.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex === totalPages - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, totalPages]);
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? totalPages - 1 : prevIndex - 1);
  };
  const goToNext = () => {
    setCurrentIndex(prevIndex => prevIndex === totalPages - 1 ? 0 : prevIndex + 1);
  };
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
          {filters.map(filter => <motion.button key={filter} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => {
          setActiveFilter(filter);
          setCurrentIndex(0); // Reset to first page when filter changes
        }} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
              {filter}
            </motion.button>)}
        </motion.div>
        {/* Carousel */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} ref={carouselRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.5
          }}>
              {visibleBooks.map(book => <BookCard key={book.id} book={book} />)}
            </motion.div>
          </AnimatePresence>
          {/* Navigation Buttons */}
          {filteredBooks.length > itemsPerPage && <>
              <motion.button className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-red-600 focus:outline-none" onClick={goToPrevious} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} initial={{
            opacity: 0.6
          }} animate={{
            opacity: 1
          }}>
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-red-600 focus:outline-none" onClick={goToNext} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} initial={{
            opacity: 0.6
          }} animate={{
            opacity: 1
          }}>
                <ChevronRight size={24} />
              </motion.button>
            </>}
        </div>
        {/* Pagination Dots */}
        {totalPages > 1 && <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
          length: totalPages
        }).map((_, index) => <motion.button key={index} className={`h-2 rounded-full ${currentIndex === index ? 'bg-red-600 w-6' : 'bg-gray-300 w-2'}`} onClick={() => setCurrentIndex(index)} whileHover={{
          scale: 1.2
        }} whileTap={{
          scale: 0.9
        }} animate={{
          backgroundColor: currentIndex === index ? '#E53E3E' : '#D1D5DB',
          width: currentIndex === index ? 24 : 8
        }} transition={{
          duration: 0.3
        }} />)}
          </div>}
      </div>
    </section>;
};