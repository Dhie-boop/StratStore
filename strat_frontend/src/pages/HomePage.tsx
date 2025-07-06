import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategories, getProducts } from '../services/api';
import type { Category, Product } from '../types';
import { getImageUrl } from '../utils/imageUtils';

// Category image mapping
const getCategoryImage = (categoryName: string): string => {
  const categoryImages: { [key: string]: string } = {
    // Apple Watch specific (use the real Apple Watch image)
    'watch': '/images/category images/Apple Watch.png',
    'apple watch': '/images/category images/Apple Watch.png',
    'smartwatch': '/images/category images/Apple Watch.png',
    'wearable': '/images/category images/Apple Watch.png',
    
    // iPhone/Apple phone categories
    'iphone': '/images/category images/iphone-card-40-iphone15hero-202309-removebg-preview.png',
    'apple phone': '/images/category images/iphone-card-40-iphone15hero-202309-removebg-preview.png',
    'ios': '/images/category images/iphone-card-40-iphone15hero-202309-removebg-preview.png',
    
    // Samsung/Galaxy categories  
    'samsung': '/images/category images/THUMB_001-galaxy-s25ultra-titaniumsilverblue-device-spen-front-removebg-preview.png',
    'galaxy': '/images/category images/THUMB_001-galaxy-s25ultra-titaniumsilverblue-device-spen-front-removebg-preview.png',
    'android': '/images/category images/THUMB_001-galaxy-s25ultra-titaniumsilverblue-device-spen-front-removebg-preview.png',
    
    // General smartphone categories
    'smartphone': '/images/category images/product_s10__c724044usymq_large_2x.png',
    'phone': '/images/category images/product_s10__c724044usymq_large_2x.png',
    'mobile': '/images/category images/product_s10__c724044usymq_large_2x.png',
    'cell': '/images/category images/product_s10__c724044usymq_large_2x.png',
    
    // Apple general (but not watch) - prioritize specific matches first
    'apple': '/images/category images/iphone-card-40-iphone15hero-202309-removebg-preview.png',
    
    // Electronics/Tech categories
    'electronics': '/images/category images/IMG_9488-scaled-removebg-preview.png',
    'tech': '/images/category images/IMG_9488-scaled-removebg-preview.png',
    'technology': '/images/category images/IMG_9488-scaled-removebg-preview.png',
    'gadget': '/images/category images/IMG_9488-scaled-removebg-preview.png',
    'device': '/images/category images/IMG_9488-scaled-removebg-preview.png',
    
    // Default fallback
    'default': '/images/category images/IMG_9488-scaled-removebg-preview.png'
  };

  const lowerCaseName = categoryName.toLowerCase();
  
  // Find the best match for the category name (more specific matches first)
  const sortedKeys = Object.keys(categoryImages).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    if (lowerCaseName.includes(key)) {
      return categoryImages[key];
    }
  }
  
  return categoryImages.default;
};

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProductIndex, setFeaturedProductIndex] = useState(0);

  // Hero slides data
  const heroSlides = [
    {
      title: "Discover Amazing Products",
      subtitle: "Shop our curated collection of premium products",
      image: "/images/highlights_design_endframe__bmpm6rzrb45e_large_2x-removebg-preview.png",
      gradient: "from-blue-600 via-purple-600 to-indigo-800"
    },
    {
      title: "Latest Technology",
      subtitle: "Experience the future with our cutting-edge devices",
      image: "/images/THUMB_001-galaxy-s25ultra-titaniumsilverblue-device-spen-front-removebg-preview.png",
      gradient: "from-purple-600 via-pink-600 to-red-600"
    },
    {
      title: "Premium Quality",
      subtitle: "Handpicked products for the discerning customer",
      image: "/images/product_u2__hedpiz396nue_large_2x.png",
      gradient: "from-green-600 via-teal-600 to-blue-600"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setProductsLoading(true);
        setError(null);
        setProductsError(null);

        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts()
        ]);

        console.log('Categories data:', categoriesData);
        console.log('Products data:', productsData);

        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error('Invalid categories data structure:', categoriesData);
          setError('Invalid data received from server');
        }

        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          console.error('Invalid products data structure:', productsData);
          setProductsError('Invalid data received from server');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load categories. Please check your connection and try again.');
        setProductsError('Failed to load products. Please check your connection and try again.');
      } finally {
        setLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preload hero images for smooth transitions
  useEffect(() => {
    heroSlides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [heroSlides]);

  // Auto-slide effect for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-rotate featured products
  useEffect(() => {
    if (products.length > 0) {
      const timer = setInterval(() => {
        setFeaturedProductIndex((prev) => (prev + 1) % products.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [products.length]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white space-y-6"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl opacity-90 max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Link
                      to="/shop"
                      className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Start Shopping
                      </span>
                    </Link>
                    <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                      Learn More
                    </button>
                  </motion.div>
                </motion.div>

                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, x: 100, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative z-10">
                    <img
                      src={heroSlides[currentSlide].image}
                      alt="Featured Product"
                      className="w-full max-w-lg mx-auto h-auto object-contain drop-shadow-2xl"
                      onError={(e) => {
                        e.currentTarget.src = '/no-image.png';
                      }}
                    />
                  </div>
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm"
                  ></motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/15 rounded-full backdrop-blur-sm"
                  ></motion.div>
                </motion.div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                ></button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 text-white/70 z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers", icon: "👥" },
              { number: "500+", label: "Products", icon: "📦" },
              { number: "50+", label: "Categories", icon: "🏷️" },
              { number: "24/7", label: "Support", icon: "🛡️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Categories Section */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our carefully curated categories designed to meet your every need
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
                </div>
              </div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto"
              >
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <div className="text-red-600 font-medium">{error}</div>
              </motion.div>
            ) : categories.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-gray-100 rounded-2xl p-12 max-w-md mx-auto"
              >
                <div className="text-gray-400 text-5xl mb-4">📦</div>
                <div className="text-gray-600 font-medium">No categories available at the moment.</div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="group relative"
                  >
                    <Link to={`/category/${category.id}`} className="block">
                      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/20">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                          <img
                            src={getCategoryImage(category.name)}
                            alt={category.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-4"
                            onError={(e) => {
                              // Hide the image and show background gradient if image fails
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Fallback icon overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-30">📱</div>
                          </div>
                          
                          {/* Floating Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1"
                          >
                            <span className="text-sm font-semibold text-gray-700">New</span>
                          </motion.div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {category.description || "Discover amazing products in this category"}
                          </p>
                          
                          {/* CTA Button */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium">
                              Explore Collection
                            </span>
                            <motion.div
                              className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50"></div>
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked products that our customers love the most
              </p>
            </motion.div>

            {productsLoading ? (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
                </div>
              </div>
            ) : productsError ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto"
              >
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <div className="text-red-600 font-medium">{productsError}</div>
              </motion.div>
            ) : products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-gray-100 rounded-2xl p-12 max-w-md mx-auto"
              >
                <div className="text-gray-400 text-5xl mb-4">🛍️</div>
                <div className="text-gray-600 font-medium">No products available at the moment.</div>
              </motion.div>
            ) : (
              <>
                {/* Featured Product Carousel */}
                <div className="relative mb-16">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-4 right-4 w-32 h-32 border-2 border-white/20 rounded-full"
                      ></motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white/20 rounded-full"
                      ></motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featuredProductIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 gap-8 items-center relative z-10"
                      >
                        <div>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                              Product of the Day
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                              {products[featuredProductIndex]?.name}
                            </h3>
                            <p className="text-lg opacity-90 mb-6 line-clamp-3">
                              {products[featuredProductIndex]?.description}
                            </p>
                            <div className="flex items-center gap-4 mb-6">
                              <span className="text-3xl font-bold">
                                UGX {typeof products[featuredProductIndex]?.price === 'string' 
                                  ? parseFloat(products[featuredProductIndex].price).toFixed(2) 
                                  : products[featuredProductIndex]?.price?.toFixed(2)}
                              </span>
                              <span className="text-lg opacity-75 line-through">
                                UGX {(typeof products[featuredProductIndex]?.price === 'string' 
                                  ? parseFloat(products[featuredProductIndex].price) * 1.3 
                                  : (products[featuredProductIndex]?.price || 0) * 1.3).toFixed(2)}
                              </span>
                            </div>
                            <Link
                              to={`/product/${products[featuredProductIndex]?.id}`}
                              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              View Product
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="relative"
                        >
                          <div className="relative z-10">
                            <img
                              src={getImageUrl(products[featuredProductIndex]?.image)}
                              alt={products[featuredProductIndex]?.name}
                              className="w-full max-w-md mx-auto h-auto object-contain"
                              onError={(e) => {
                                e.currentTarget.src = '/no-image.png';
                              }}
                            />
                          </div>
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl scale-75"></div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.slice(0, 8).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.3 }
                      }}
                      className="group"
                    >
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/20">
                          {/* Image Container */}
                          <div className="relative overflow-hidden bg-gray-50">
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.src = '/no-image.png';
                              }}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Quick Action Button */}
                            <motion.button
                              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </motion.button>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {product.description}
                            </p>
                            
                            {/* Price and Action */}
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900">
                                UGX {typeof product.price === 'string' 
                                  ? parseFloat(product.price).toFixed(2) 
                                  : product.price?.toFixed(2)}
                              </span>
                              <motion.button 
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Add to Cart
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* View All Products Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    View All Products
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
                backgroundImage: [
                  "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            ></motion.div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stay Updated with Our Latest Offers
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join our newsletter and be the first to know about new products, exclusive deals, and special promotions.
              </p>
              
              <motion.form 
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <motion.button
                  type="submit"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
              
              <p className="text-sm opacity-70 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
