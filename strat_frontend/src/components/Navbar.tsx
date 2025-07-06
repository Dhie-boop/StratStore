import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, we should still redirect
    }
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSearchOpen && !(e.target as Element).closest('.search-container')) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isSearchOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm ${
      scrolled ? 'bg-white/90 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
                StratStore
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          {/* Universal Search and Navigation Items */}
          <div className="hidden lg:flex flex-1 items-center justify-center mx-4">
            <div className="relative w-[400px] search-container group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search for products, brands, and more..."
                className={`w-full pl-14 pr-16 py-3.5 rounded-xl border-2 text-base backdrop-blur-sm ${
                  scrolled 
                    ? 'border-gray-200/80 bg-white/80 placeholder-gray-400' 
                    : 'border-white/20 bg-white/10 text-white placeholder-white/60'
                } focus:border-blue-500/50 focus:bg-white/95 focus:text-gray-900 focus:placeholder-gray-500
                  group-hover:border-blue-500/30 focus:ring-4 focus:ring-blue-500/20
                  transition-all duration-300 ease-in-out shadow-sm`}
              />
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <div className={`p-0.5 rounded-lg transition-all duration-300 ${
                  scrolled ? 'text-gray-400 group-hover:text-blue-500' : 'text-white/70 group-hover:text-white'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  scrolled 
                    ? 'bg-gray-100/80 text-gray-500 border border-gray-200/50' 
                    : 'bg-white/10 text-white/70 border border-white/10'
                } transition-all duration-300`}>
                  <kbd className="text-xs font-medium">⌘</kbd>
                  <kbd className="text-xs font-medium">K</kbd>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-300 animate-fadeIn">
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Popular Searches
                    </h3>
                    <div className="space-y-3">
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-xl flex items-center group transition-all duration-200"
                        onClick={() => {
                          setSearchQuery('wireless headphones')
                          navigate('/shop?search=wireless+headphones')
                          setIsSearchOpen(false)
                        }}
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 mr-3 group-hover:bg-blue-200 transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5h2a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2m6 0v2H9V5m6 0a2 2 0 002-2V1a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium text-gray-500">Wireless Headphones</span>
                          <p className="text-xs text-gray-500 mt-0.5">Premium Audio Collection</p>
                        </div>
                      </button>
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-xl flex items-center group transition-all duration-200"
                        onClick={() => {
                          setSearchQuery('smartwatch')
                          navigate('/shop?search=smartwatch')
                          setIsSearchOpen(false)
                        }}
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600 mr-3 group-hover:bg-purple-200 transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium text-gray-500">Smartwatch</span>
                          <p className="text-xs text-gray-500 mt-0.5">Latest Wearable Tech</p>
                        </div>
                      </button>
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-xl flex items-center group transition-all duration-200"
                        onClick={() => {
                          setSearchQuery('backpack')
                          navigate('/shop?search=backpack')
                          setIsSearchOpen(false)
                        }}
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 mr-3 group-hover:bg-green-200 transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium text-gray-500">Backpack</span>
                          <p className="text-xs text-gray-500 mt-0.5">Travel & Outdoor Gear</p>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50 px-6 py-4">
                    <button
                      onClick={() => {
                        if (searchQuery.trim()) {
                          navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
                          setIsSearchOpen(false)
                        }
                      }}
                      className="w-full group bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="font-medium">View all search results</span>
                      </div>
                      <span className="flex items-center text-xs bg-blue-100 group-hover:bg-blue-200 text-blue-600 px-2 py-1 rounded-lg transition-all duration-200">
                        <span className="mr-1">Enter</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'text-blue-600'
                  : scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-gray-100 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`${
                location.pathname === '/shop'
                  ? 'text-blue-600'
                  : scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-gray-100 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === '/about'
                  ? 'text-blue-600'
                  : scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-gray-100 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === '/contact'
                  ? 'text-blue-600'
                  : scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-gray-100 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-200`}
            >
              Contact
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                scrolled
                  ? 'text-gray-900 hover:text-blue-600'
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>

            {/* Wishlist Button */}
            <Link
              to="/customer/wishlist"
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                scrolled
                  ? 'text-gray-900 hover:text-blue-600'
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  scrolled ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  Welcome, {user.username}
                </span>
                <Link
                  to="/customer/profile"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? 'text-gray-900 hover:text-blue-600'
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? 'text-gray-900 hover:text-blue-600'
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg border-b border-gray-200">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50/50 
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 
                  placeholder-gray-400 text-gray-900 text-base transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="p-0.5 rounded-lg text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium rounded-lg ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`block px-3 py-2 text-base font-medium rounded-lg ${
                location.pathname === '/shop'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 text-base font-medium rounded-lg ${
                location.pathname === '/about'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 text-base font-medium rounded-lg ${
                location.pathname === '/contact'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Contact
            </Link>

            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart
              </div>
              {cartCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>
              )}
            </Link>

            {/* Mobile Wishlist Link */}
            <Link
              to="/customer/wishlist"
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </div>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{wishlistCount}</span>
              )}
            </Link>

            {user ? (
              <div className="space-y-3">
                <div className="px-3 py-2 text-base font-medium text-gray-900 bg-gray-50 rounded-lg">
                  Welcome, {user.username}
                </div>
                <Link
                  to="/customer/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
