// Import the authentication utilities
import { getAccessToken } from './authService';
import type { Product, Category, Customer, Order, Review } from '../types';

// Base URL for the API
const API_URL = 'http://localhost:8000/api'; // Make sure this matches your Django server URL

// API helper to handle common fetch operations
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }
  
  console.log(`Making authenticated request to: ${API_URL}${endpoint}`);
  console.log('Token:', token ? 'Present' : 'Missing');
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  
  console.log(`Response status: ${response.status}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API error for ${endpoint}:`, errorText);
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log(`Response data:`, data);
  return data;
};

// Base API helper
const fetchBase = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${error}`);
    }
    
    const data = await response.json();
    console.log(`API Response from ${endpoint}:`, data);
    return data;
  } catch (err) {
    console.error(`API Error for ${endpoint}:`, err);
    throw err;
  }
};

// Products API
export const getProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products...');
    const response = await fetchBase('/products/');
    console.log('Raw Products response:', response);
    
    if (!Array.isArray(response)) {
      console.error('Unexpected products response format:', response);
      return [];
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    console.log(`Fetching product details for ID: ${id}`);
    const response = await fetch(`${API_URL}/products/${id}/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product. Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw product details received:', data);
    
    // Ensure price is a number
    return {
      ...data,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const getTopProducts = async (limit: number = 5): Promise<Product[]> => {
  try {
    return await fetchBase(`/products/top/?limit=${limit}`);
  } catch (err) {
    console.error('Error fetching top products:', err);
    return [];
  }
};

// Categories API
export const getCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    const response = await fetchBase('/categories/');
    console.log('Raw Categories response:', response);
    
    if (!Array.isArray(response)) {
      console.error('Unexpected categories response format:', response);
      return [];
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Customers API
export const getCustomers = async (): Promise<Customer[]> => {
  return fetchWithAuth('/customers/');
};

// Orders API
export const getOrders = async (): Promise<Order[]> => {
  return fetchWithAuth('/orders/');
};

// Reviews API
export const getReviews = async (): Promise<Review[]> => {
  return fetchWithAuth('/reviews/');
};

// Export existing product service methods
export const createProduct = async (product: Omit<Product, 'id'>) => {
  return fetchWithAuth('/products/', {
    method: 'POST',
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
  return fetchWithAuth(`/products/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id: number) => {
  return fetchWithAuth(`/products/${id}/`, {
    method: 'DELETE',
  });
};

// Cart API
export const getCart = async () => {
  return fetchWithAuth('/cart/');
};

export const addToCart = async (productId: number, quantity: number = 1) => {
  console.log('API: addToCart called with:', { productId, quantity });
  
  try {
    const result = await fetchWithAuth('/cart/add/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    
    console.log('API: addToCart successful:', result);
    return result;
  } catch (error) {
    console.error('API: addToCart failed:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId: number) => {
  return fetchWithAuth('/cart/remove/', {
    method: 'POST',
    body: JSON.stringify({ cart_item_id: cartItemId }),
  });
};

export const clearCart = async () => {
  return fetchWithAuth('/cart/clear/', {
    method: 'POST',
  });
};

// Wishlist API
export const getWishlist = async () => {
  return fetchWithAuth('/wishlist/');
};

export const toggleWishlist = async (productId: number) => {
  return fetchWithAuth('/wishlist/toggle/', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId }),
  });
};

export const clearWishlist = async () => {
  return fetchWithAuth('/wishlist/clear/', {
    method: 'POST',
  });
};
