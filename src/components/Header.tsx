import React, { useEffect, useState, Children } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { MegaMenu } from './ui/MegaMenu';
import { motion, AnimatePresence } from 'framer-motion';
interface HeaderProps {
  onLoginClick: () => void;
  activeSection: string;
  onNavLinkClick: (sectionId: string) => void;
}
export const Header = ({
  onLoginClick,
  activeSection,
  onNavLinkClick
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };
  const logoVariants = {
    normal: {
      scale: 1
    },
    scrolled: {
      scale: 0.95
    }
  };
  // Navigation items with their section IDs
  const navItems = [{
    label: 'Home',
    id: 'home'
  }, {
    label: 'Categories',
    id: 'categories'
  }, {
    label: 'Featured',
    id: 'featured'
  }, {
    label: 'New Arrivals',
    id: 'new-arrivals'
  }, {
    label: 'Contact',
    id: 'contact'
  }];
  return <motion.header className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 100,
    damping: 20
  }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div className="flex items-center" variants={logoVariants} animate={isScrolled ? 'scrolled' : 'normal'} transition={{
          duration: 0.3
        }}>
            <motion.h1 className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => onNavLinkClick('home')} whileHover={{
            scale: 1.03
          }} whileTap={{
            scale: 0.97
          }}>
              <span className="text-red-600">Vijitha Yapa</span> Bookshop
            </motion.h1>
          </motion.div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.button className={`text-gray-700 hover:text-red-600 font-medium relative ${activeSection === 'categories' ? 'text-red-600' : ''}`} onMouseEnter={() => setIsMegaMenuOpen(true)} custom={0} variants={navItemVariants} initial="hidden" animate="visible" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => onNavLinkClick('categories')}>
              Categories
              <motion.span className="absolute bottom-0 left-0 h-0.5 bg-red-600" initial={{
              width: activeSection === 'categories' ? '100%' : '0%'
            }} animate={{
              width: activeSection === 'categories' ? '100%' : '0%'
            }} transition={{
              duration: 0.3
            }} />
              <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600" whileHover={{
              width: '100%'
            }} transition={{
              duration: 0.3
            }} />
            </motion.button>
            {navItems.filter(item => item.id !== 'categories').map((item, index) => <motion.button key={item.id} className={`text-gray-700 hover:text-red-600 font-medium relative ${activeSection === item.id ? 'text-red-600' : ''}`} custom={index + 1} variants={navItemVariants} initial="hidden" animate="visible" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => onNavLinkClick(item.id)}>
                  {item.label}
                  <motion.span className="absolute bottom-0 left-0 h-0.5 bg-red-600" initial={{
              width: activeSection === item.id ? '100%' : '0%'
            }} animate={{
              width: activeSection === item.id ? '100%' : '0%'
            }} transition={{
              duration: 0.3
            }} />
                  <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600" whileHover={{
              width: '100%'
            }} transition={{
              duration: 0.3
            }} />
                </motion.button>)}
          </nav>
          {/* Desktop Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button className="text-gray-700 hover:text-red-600" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <Search size={20} />
            </motion.button>
            <motion.button className="text-gray-700 hover:text-red-600" onClick={onLoginClick} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <User size={20} />
            </motion.button>
            <motion.button className="text-gray-700 hover:text-red-600 relative" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setCartCount(prev => prev + 1)}>
              <ShoppingCart size={20} />
              <AnimatePresence mode="wait">
                <motion.span key={cartCount} className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" initial={{
                scale: 0,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} exit={{
                scale: 1.5,
                opacity: 0
              }} transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15
              }}>
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <motion.button className="text-gray-700 relative" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setCartCount(prev => prev + 1)}>
              <ShoppingCart size={20} />
              <AnimatePresence mode="wait">
                <motion.span key={cartCount} className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" initial={{
                scale: 0,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} exit={{
                scale: 1.5,
                opacity: 0
              }} transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15
              }}>
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button className="text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && <motion.div className="md:hidden py-4 border-t border-gray-100" initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="flex items-center px-4 py-3 mb-2">
                <input type="text" placeholder="Search for books..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600" />
                <Search size={18} className="text-gray-500 -ml-8" />
              </div>
              <motion.nav className="flex flex-col space-y-3" initial="hidden" animate="visible" variants={{
            hidden: {
              opacity: 0
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}>
                {navItems.map(item => <motion.button key={item.id} onClick={() => {
              onNavLinkClick(item.id);
              setIsMobileMenuOpen(false);
            }} className={`px-4 py-2 text-left ${activeSection === item.id ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`} variants={{
              hidden: {
                opacity: 0,
                x: -20
              },
              visible: {
                opacity: 1,
                x: 0
              }
            }} transition={{
              duration: 0.3
            }}>
                    {item.label}
                  </motion.button>)}
                <motion.button onClick={() => {
              onLoginClick();
              setIsMobileMenuOpen(false);
            }} className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center" variants={{
              hidden: {
                opacity: 0,
                x: -20
              },
              visible: {
                opacity: 1,
                x: 0
              }
            }} transition={{
              duration: 0.3
            }}>
                  <User size={18} className="mr-2" /> Login / Sign Up
                </motion.button>
              </motion.nav>
            </motion.div>}
        </AnimatePresence>
      </div>
      {/* Mega Menu */}
      <AnimatePresence>
        {isMegaMenuOpen && <motion.div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50" onMouseLeave={() => setIsMegaMenuOpen(false)} initial={{
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
            <MegaMenu onCategoryClick={category => {
          onNavLinkClick('categories');
          setIsMegaMenuOpen(false);
        }} />
          </motion.div>}
      </AnimatePresence>
    </motion.header>;
};