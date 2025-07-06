import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaQuestionCircle, FaBars, FaSignOutAlt } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

interface MenuItem {
  label: string
  path: string
  icon: React.ReactNode
}

const CustomerDashboardPage: React.FC = () => {
  const location = useLocation()
  const { logout, user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems: MenuItem[] = [
    { label: 'My Profile', path: '/customer/profile', icon: <FaUser /> },
    { label: 'My Orders', path: '/customer/orders', icon: <FaShoppingBag /> },
    { label: 'Wishlist', path: '/customer/wishlist', icon: <FaHeart /> },
    { label: 'Support', path: '/customer/support', icon: <FaQuestionCircle /> },
    { label: 'Settings', path: '/customer/settings', icon: <FaCog /> }
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Error logging out')
    }
  }

  const isActive = (path: string) => {
    if (path === '/customer/profile') {
      return location.pathname === '/customer' || location.pathname === '/customer/profile'
    }
    return location.pathname === path
  }

  // Get user initials
  const getUserInitials = () => {
    if (!user) return 'U'
    const firstName = user.first_name || ''
    const lastName = user.last_name || ''
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (firstName) return firstName[0].toUpperCase()
    if (user.username) return user.username[0].toUpperCase()
    return 'U'
  }

  const getDisplayName = () => {
    if (!user) return 'User'
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    if (user.first_name) return user.first_name
    return user.username
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black lg:hidden z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isSidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className={`fixed lg:static left-0 top-0 h-full bg-white border-r border-gray-200 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg"
              >
                {getUserInitials()}
              </motion.div>
              <div className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>
                <h2 className="font-semibold text-gray-800">{getDisplayName()}</h2>
                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Toggle Button - Mobile Only */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden absolute -right-12 top-4 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars className="text-gray-600 text-xl" />
          </motion.button>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 ${!isSidebarOpen ? 'lg:hidden' : ''} font-medium`}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className={`ml-3 font-medium ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
                Logout
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-auto w-full"
      >
        <div className="w-full h-full p-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}

export default CustomerDashboardPage
