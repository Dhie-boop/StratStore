export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category: number | Category | null;
  image: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Order {
  id: number;
  customerId: number;
  customer: Customer;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Review {
  id: number;
  productId: number;
  customerId: number;
  rating: number;
  comment: string;
  customer: Customer;
  product: Product;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CartItem {
  id: number;
  cart: number;
  product: Product;
  quantity: number;
  created_at: string;
}

export interface Cart {
  id: number;
  customer: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: number;
  wishlist: number;
  product: Product;
  created_at: string;
}

export interface Wishlist {
  id: number;
  customer: number;
  items: WishlistItem[];
  created_at: string;
  updated_at: string;
}
