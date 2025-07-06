import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface RequireAuthForCartProps {
  children: React.ReactNode;
}

const AuthPrompt: React.FC<{
  location: any;
  hasGuestItems: boolean;
  pageName: string;
  onContinueAsGuest: () => void;
}> = ({ location, hasGuestItems, pageName, onContinueAsGuest }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sign in to access your {pageName}
        </h2>
        <p className="text-gray-600 mb-4">
          {hasGuestItems 
            ? `You have items in your ${pageName}! Sign in or create an account to continue shopping and keep your items safe.`
            : `Please sign in or create an account to view your ${pageName} and complete your purchase.`
          }
        </p>
      </div>

      {hasGuestItems && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-blue-800">Your items will be saved!</span>
          </div>
          <p className="text-sm text-blue-700">
            When you sign in, we'll automatically move your guest {pageName} items to your account.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Link
          to="/login"
          state={{ from: location }}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
        >
          Sign In
        </Link>
        
        <Link
          to="/signup"
          state={{ from: location }}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 inline-block"
        >
          Create Account
        </Link>
        
        <button
          onClick={onContinueAsGuest}
          className="w-full text-gray-500 py-2 px-4 rounded-lg font-medium hover:text-gray-700 transition-colors duration-200"
        >
          Continue as Guest (Shopping Only)
        </button>
      </div>
    </div>
  </div>
);

export const RequireAuthForCart: React.FC<RequireAuthForCartProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { migrateGuestCartToUser, cartItems, isGuestCart } = useCart();
  const { migrateGuestWishlistToUser, wishlistItems, isGuestWishlist } = useWishlist();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(true);

  // Always call useEffect - no conditional hooks
  useEffect(() => {
    const migrateGuestData = async () => {
      try {
        await migrateGuestCartToUser();
        await migrateGuestWishlistToUser();
      } catch (error) {
        console.error('Error migrating guest data:', error);
      }
    };

    if (isAuthenticated) {
      migrateGuestData();
    }
  }, [isAuthenticated, migrateGuestCartToUser, migrateGuestWishlistToUser]);

  // If user chose to continue as guest, redirect to shop
  if (!isAuthenticated && !showPrompt) {
    return <Navigate to="/shop" replace />;
  }

  // If user is not authenticated and still showing prompt
  if (!isAuthenticated && showPrompt) {
    const hasGuestItems = (isGuestCart && cartItems.length > 0) || (isGuestWishlist && wishlistItems.length > 0);
    const pageName = location.pathname.includes('checkout') ? 'checkout' : 'cart';
    
    return (
      <AuthPrompt
        location={location}
        hasGuestItems={hasGuestItems}
        pageName={pageName}
        onContinueAsGuest={() => setShowPrompt(false)}
      />
    );
  }

  // If user is authenticated, render children
  return <>{children}</>;
};

export default RequireAuthForCart;
