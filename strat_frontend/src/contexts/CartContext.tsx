import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Cart, CartItem, Product } from '../types';
import { getCart, addToCart, removeFromCart, clearCart } from '../services/api';
import { isAuthenticated } from '../services/authService';

// Guest cart item structure for localStorage
interface GuestCartItem {
  product: Product;
  quantity: number;
  id: string; // temporary ID for guest items
}

interface CartContextType {
  cart: Cart | null;
  cartItems: CartItem[] | GuestCartItem[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  error: string | null;
  isGuestCart: boolean;
  addItemToCart: (product: Product, quantity?: number) => Promise<void>;
  removeItemFromCart: (itemId: number | string) => Promise<void>;
  clearCartItems: () => Promise<void>;
  refreshCart: () => Promise<void>;
  migrateGuestCartToUser: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [guestCartItems, setGuestCartItems] = useState<GuestCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUserAuthenticated = isAuthenticated();
  const isGuestCart = !isUserAuthenticated;
  
  // Use guest cart items or authenticated cart items
  const cartItems = isGuestCart ? guestCartItems : (cart?.items || []);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    const price = typeof item.product.price === 'string' 
      ? parseFloat(item.product.price) 
      : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  // Guest cart localStorage helpers
  const GUEST_CART_KEY = 'guestCart';
  
  const loadGuestCart = () => {
    try {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (stored) {
        const items = JSON.parse(stored) as GuestCartItem[];
        setGuestCartItems(items);
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
    }
  };

  const saveGuestCart = (items: GuestCartItem[]) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      setGuestCartItems(items);
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  const clearGuestCart = () => {
    localStorage.removeItem(GUEST_CART_KEY);
    setGuestCartItems([]);
  };

  const refreshCart = async () => {
    if (!isAuthenticated()) {
      loadGuestCart();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const cartData = await getCart();
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (product: Product, quantity: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('CartContext: Adding item to cart', { productId: product.id, quantity });
      
      if (isAuthenticated()) {
        // Authenticated user - add to database
        console.log('CartContext: Adding to authenticated user cart');
        const result = await addToCart(product.id, quantity);
        console.log('CartContext: Add to cart result:', result);
        await refreshCart();
      } else {
        // Guest user - add to localStorage
        console.log('CartContext: Adding to guest cart');
        const currentItems = [...guestCartItems];
        const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
        
        if (existingItemIndex > -1) {
          // Update existing item quantity
          currentItems[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          const guestItem: GuestCartItem = {
            product,
            quantity,
            id: `guest_${Date.now()}_${product.id}` // temporary ID
          };
          currentItems.push(guestItem);
        }
        
        saveGuestCart(currentItems);
      }
      
      console.log('CartContext: Item added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(errorMessage);
      console.error('CartContext: Error adding to cart:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId: number | string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated() && typeof itemId === 'number') {
        // Authenticated user - remove from database
        await removeFromCart(itemId);
        await refreshCart();
      } else {
        // Guest user - remove from localStorage
        const currentItems = guestCartItems.filter(item => 
          typeof itemId === 'string' ? item.id !== itemId : item.product.id !== itemId
        );
        saveGuestCart(currentItems);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated()) {
        // Authenticated user - clear database cart
        await clearCart();
        await refreshCart();
      } else {
        // Guest user - clear localStorage
        clearGuestCart();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const migrateGuestCartToUser = async () => {
    if (!isAuthenticated() || guestCartItems.length === 0) return;
    
    try {
      setLoading(true);
      console.log('Migrating guest cart to user account', guestCartItems);
      
      // Add each guest cart item to user's cart
      for (const guestItem of guestCartItems) {
        await addToCart(guestItem.product.id, guestItem.quantity);
      }
      
      // Clear guest cart after successful migration
      clearGuestCart();
      
      // Refresh user's cart
      await refreshCart();
      
      console.log('Guest cart migration completed');
    } catch (err) {
      console.error('Error migrating guest cart:', err);
      setError('Failed to migrate cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      refreshCart();
    } else {
      loadGuestCart();
    }
  }, [isUserAuthenticated]);

  const value: CartContextType = {
    cart,
    cartItems,
    cartCount,
    cartTotal,
    loading,
    error,
    isGuestCart,
    addItemToCart,
    removeItemFromCart,
    clearCartItems,
    refreshCart,
    migrateGuestCartToUser,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
