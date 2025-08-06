import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
interface SearchAutocompleteProps {
  searchTerm: string;
}
// Mock search results
const searchResults = [{
  id: 1,
  title: 'The Island of a Thousand Mirrors',
  author: 'Nayomi Munaweera'
}, {
  id: 2,
  title: "Anil's Ghost",
  author: 'Michael Ondaatje'
}, {
  id: 3,
  title: 'The English Teacher',
  author: 'R.K. Narayan'
}, {
  id: 4,
  title: 'The Road From Elephant Pass',
  author: 'Nihal De Silva'
}];
export const SearchAutocomplete = ({
  searchTerm
}: SearchAutocompleteProps) => {
  // Filter results based on search term
  const filteredResults = searchResults.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase()));
  if (filteredResults.length === 0) return null;
  return <motion.div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden" initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -10
  }} transition={{
    duration: 0.2
  }}>
      <ul className="py-2">
        {filteredResults.map(result => <motion.li key={result.id} whileHover={{
        backgroundColor: '#F7FAFC'
      }} transition={{
        duration: 0.1
      }}>
            <button className="w-full text-left px-4 py-2 flex items-center">
              <BookOpen size={16} className="text-red-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">{result.title}</p>
                <p className="text-sm text-gray-600">{result.author}</p>
              </div>
            </button>
          </motion.li>)}
      </ul>
    </motion.div>;
};