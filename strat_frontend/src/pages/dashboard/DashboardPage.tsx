import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { FaChartBar, FaShoppingCart, FaBoxes, FaUsers, FaCog, FaBars } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import AdminNavbar from '../../components/AdminNavbar'

interface MenuItem {
  label: string
  path: string
  icon: React.ReactNode
}

const DashboardPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Redirect non-admin users
    if (user && user.role !== 'admin') {
      navigate('/customer/profile')
    }
  }, [user, navigate])

  const menuItems: MenuItem[] = [
    { label: 'Analytics', path: '/dashboard', icon: <FaChartBar /> },
    { label: 'Orders', path: '/dashboard/orders', icon: <FaShoppingCart /> },
    { label: 'Products', path: '/dashboard/products', icon: <FaBoxes /> },
    { label: 'Customers', path: '/dashboard/customers', icon: <FaUsers /> },
    { label: 'Settings', path: '/dashboard/settings', icon: <FaCog /> }
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Access Denied - Admin Only Area</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Sticky Navbar at the top */}
      <div className="sticky top-0 z-50">
        <AdminNavbar />
      </div>

      {/* Main container below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed lg:sticky top-[65px] h-[calc(100vh-65px)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
            isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Toggle Button - Mobile Only */}
            <button
              className="lg:hidden absolute -right-10 top-4 bg-white p-2 rounded-r-lg border border-l-0 border-gray-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars className="text-gray-600" />
            </button>

            {/* Menu Items */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 ${!isSidebarOpen ? 'lg:hidden' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative bg-gray-50">
          <div className="w-full h-full">
            <div className="max-w-[1920px] mx-auto px-6 py-6 min-h-[calc(100vh-65px)] bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
