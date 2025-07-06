import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1920px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center flex-1 gap-8">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
            </div>
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Search orders, products..."
                />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 relative">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {user?.username?.[0]?.toUpperCase() || <FiUser />}
                </div>
                <span className="ml-2 text-sm font-medium hidden md:block">
                  {user?.username || 'Admin'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/dashboard/settings');
                        setIsProfileOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <FiSettings className="mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
