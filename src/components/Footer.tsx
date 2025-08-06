import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };
  const socialIconVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.2,
      rotate: 5
    }
  };
  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1
      }
    })
  };
  return <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div initial={{
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
            <h3 className="text-xl font-bold mb-4">Vijitha Yapa Bookshop</h3>
            <p className="text-gray-300 mb-4">
              Sri Lanka's premier bookstore with a wide selection of local and
              international titles.
            </p>
            <div className="flex space-x-4">
              {[{
              icon: <Facebook size={20} />,
              color: 'hover:text-blue-400'
            }, {
              icon: <Twitter size={20} />,
              color: 'hover:text-blue-300'
            }, {
              icon: <Instagram size={20} />,
              color: 'hover:text-pink-400'
            }].map((social, index) => <motion.a key={index} href="#" className={`text-gray-300 ${social.color}`} variants={socialIconVariants} initial="initial" whileHover="hover" whileTap={{
              scale: 0.9
            }}>
                  {social.icon}
                </motion.a>)}
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Book Categories', 'New Arrivals', 'Bestsellers', 'Special Offers'].map((item, index) => <motion.li key={item} custom={index} variants={listItemVariants} initial="hidden" whileInView="visible" viewport={{
              once: true
            }}>
                  <motion.a href="#" className="text-gray-300 hover:text-white inline-block" whileHover={{
                x: 3
              }} transition={{
                duration: 0.2
              }}>
                    {item}
                  </motion.a>
                </motion.li>)}
            </ul>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {['My Account', 'Order Tracking', 'Wishlist', 'Shipping Policy', 'Returns & Refunds'].map((item, index) => <motion.li key={item} custom={index} variants={listItemVariants} initial="hidden" whileInView="visible" viewport={{
              once: true
            }}>
                  <motion.a href="#" className="text-gray-300 hover:text-white inline-block" whileHover={{
                x: 3
              }} transition={{
                duration: 0.2
              }}>
                    {item}
                  </motion.a>
                </motion.li>)}
            </ul>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <motion.li className="flex items-start" whileHover={{
              x: 3
            }}>
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>Unity Plaza, Colombo 04, Sri Lanka</span>
              </motion.li>
              <motion.li className="flex items-center" whileHover={{
              x: 3
            }}>
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+94 11 2345678</span>
              </motion.li>
              <motion.li className="flex items-center" whileHover={{
              x: 3
            }}>
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>info@vijithayapa.com</span>
              </motion.li>
            </ul>
            {/* Newsletter Signup */}
            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <motion.input type="email" placeholder="Your email address" className="px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 w-full" value={email} onChange={e => setEmail(e.target.value)} required whileFocus={{
                boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.4)'
              }} animate={isSubmitted ? {
                x: [0, -5, 5, -5, 5, 0]
              } : {}} transition={{
                duration: 0.4
              }} />
                <motion.button type="submit" className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-r-md flex items-center justify-center" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} disabled={isSubmitted}>
                  {isSubmitted ? '✓' : <ArrowRight size={20} />}
                </motion.button>
              </div>
              {isSubmitted && <motion.p className="text-green-400 text-sm mt-2" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }}>
                  Thank you for subscribing!
                </motion.p>}
            </form>
          </motion.div>
        </div>
        <motion.div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.5
      }}>
          <p>
            &copy; {new Date().getFullYear()} Vijitha Yapa Bookshop. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>;
};