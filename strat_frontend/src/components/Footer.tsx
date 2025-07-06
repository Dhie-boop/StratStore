import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { motion } from 'framer-motion';

const Footer: FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-gray-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-20 opacity-20">
        <div className="absolute -top-12 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute -top-16 right-1/3 w-40 h-40 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute -top-8 right-1/5 w-28 h-28 bg-pink-500 rounded-full blur-xl"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-8 relative z-10">      
        {/* Newsletter Card */}
        <motion.div 
          className="max-w-screen-2xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 mb-12 md:mb-16 lg:mb-20 shadow-xl transform -translate-y-12 sm:-translate-y-16 md:-translate-y-20 relative overflow-hidden backdrop-blur-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-48 h-48 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-16 xl:gap-24 max-w-7xl mx-auto relative z-10">
            <div className="text-center lg:text-left max-w-md lg:max-w-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 lg:mb-4 text-white">
                Get Exclusive Updates
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">
                Subscribe to our newsletter and receive special offers, new product launches, and insider-only discounts
              </p>
            </div>
            <form className="w-full max-w-md lg:max-w-lg space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-3 md:gap-4">
              <div className="relative flex-grow group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 sm:px-5 py-3 md:py-4 rounded-xl bg-white/10 text-white placeholder:text-white/60 
                    border-2 border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20
                    transition-all duration-300 group-hover:border-white/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button 
                className="relative w-full sm:w-auto px-6 sm:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm sm:text-base
                  text-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100 
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                  shadow-[0_0_0_3px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]
                  flex items-center justify-center gap-2 group overflow-hidden"
              >
                <span className="relative z-10">Subscribe</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </form>
          </div>
        </motion.div>
        
        {/* Footer Content */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
              <span className="text-blue-400">Strat</span>Store
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">Your one-stop shop for premium lifestyle products designed for modern living. Quality, style, and sustainability in every item.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Categories */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Categories</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Featured Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Special Offers
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  Kavule, 2nd flour<br />Makerere
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@stratstore.com" className="text-gray-400 hover:text-white transition-colors">
                  info@stratstore.com
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+256 787927092" className="text-gray-400 hover:text-white transition-colors">
                  +256 787927092
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} StratStore. All rights reserved. Design by StratStore.
          </p> <br></br>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
