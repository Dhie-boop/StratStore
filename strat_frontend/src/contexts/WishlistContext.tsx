import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Wishlist, WishlistItem, Product } from '../types';
import { getWishlist, toggleWishlist, clearWishlist } from '../services/api';
import { isAuthenticated } from '../services/authService';

// Guest wishlist item structure for localStorage
interface GuestWishlistItem {
  product: Product;
  id: string; // temporary ID for guest items
}

interface WishlistContextType {
  wishlist: Wishlist | null;
  wishlistItems: WishlistItem[] | GuestWishlistItem[];
  wishlistCount: number;
  loading: boolean;
  error: string | null;
  isGuestWishlist: boolean;
  toggleWishlistItem: (product: Product) => Promise<void>;
  clearWishlistItems: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  migrateGuestWishlistToUser: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [guestWishlistItems, setGuestWishlistItems] = useState<GuestWishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUserAuthenticated = isAuthenticated();
  const isGuestWishlist = !isUserAuthenticated;
  
  // Use guest wishlist items or authenticated wishlist items
  const wishlistItems = isGuestWishlist ? guestWishlistItems : (wishlist?.items || []);
  const wishlistCount = wishlistItems.length;

  // Guest wishlist localStorage helpers
  const GUEST_WISHLIST_KEY = 'guestWishlist';
  
  const loadGuestWishlist = () => {
    try {
      const stored = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (stored) {
        const items = JSON.parse(stored) as GuestWishlistItem[];
        setGuestWishlistItems(items);
      }
    } catch (error) {
      console.error('Error loading guest wishlist:', error);
    }
  };

  const saveGuestWishlist = (items: GuestWishlistItem[]) => {
    try {
      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
      setGuestWishlistItems(items);
    } catch (error) {
      console.error('Error saving guest wishlist:', error);
    }
  };

  const clearGuestWishlist = () => {
    localStorage.removeItem(GUEST_WISHLIST_KEY);
    setGuestWishlistItems([]);
  };

  const refreshWishlist = async () => {
    if (!isAuthenticated()) {
      loadGuestWishlist();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const wishlistData = await getWishlist();
      setWishlist(wishlistData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wishlist');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlistItem = async (product: Product) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated()) {
        // Authenticated user - toggle in database
        await toggleWishlist(product.id);
        await refreshWishlist();
      } else {
        // Guest user - toggle in localStorage
        const currentItems = [...guestWishlistItems];
        const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
        
        if (existingItemIndex > -1) {
          // Remove existing item
          currentItems.splice(existingItemIndex, 1);
        } else {
          // Add new item
          const guestItem: GuestWishlistItem = {
            product,
            id: `guest_wishlist_${Date.now()}_${product.id}` // temporary ID
          };
          currentItems.push(guestItem);
        }
        
        saveGuestWishlist(currentItems);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update wishlist');
      console.error('Error toggling wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearWishlistItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated()) {
        // Authenticated user - clear database wishlist
        await clearWishlist();
        await refreshWishlist();
      } else {
        // Guest user - clear localStorage
        clearGuestWishlist();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear wishlist');
      console.error('Error clearing wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const migrateGuestWishlistToUser = async () => {
    if (!isAuthenticated() || guestWishlistItems.length === 0) return;
    
    try {
      setLoading(true);
      console.log('Migrating guest wishlist to user account', guestWishlistItems);
      
      // Add each guest wishlist item to user's wishlist
      for (const guestItem of guestWishlistItems) {
        await toggleWishlist(guestItem.product.id);
      }
      
      // Clear guest wishlist after successful migration
      clearGuestWishlist();
      
      // Refresh user's wishlist
      await refreshWishlist();
      
      console.log('Guest wishlist migration completed');
    } catch (err) {
      console.error('Error migrating guest wishlist:', err);
      setError('Failed to migrate wishlist items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      refreshWishlist();
    } else {
      loadGuestWishlist();
    }
  }, [isUserAuthenticated]);

  const value: WishlistContextType = {
    wishlist,
    wishlistItems,
    wishlistCount,
    loading,
    error,
    isGuestWishlist,
    toggleWishlistItem,
    clearWishlistItems,
    refreshWishlist,
    isInWishlist,
    migrateGuestWishlistToUser,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
