import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById } from '../services/api'
import { getImageUrl } from '../utils/imageUtils'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { useAuth } from '../contexts/AuthContext'
import type { Product } from '../types'

const ProductPage: React.FC = (): React.ReactNode => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  
  // Context hooks
  const { addItemToCart, loading: cartLoading } = useCart()
  const { toggleWishlistItem, isInWishlist, loading: wishlistLoading } = useWishlist()
  const { user } = useAuth()

  // Safe number formatter
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
  }

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) {
      alert('Product not found');
      return;
    }
    
    console.log('Adding to cart:', { productId: product.id, quantity });
    console.log('User authenticated:', !!user);
    
    try {
      await addItemToCart(product, quantity);
      console.log('Item added successfully');
      
      // Show success message and navigate to checkout
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (error instanceof Error) {
        alert(`Failed to add item to cart: ${error.message}`);
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  // Handle add to wishlist
  const handleToggleWishlist = async () => {
    if (!product) {
      alert('Product not found');
      return;
    }
    
    try {
      await toggleWishlistItem(product);
      const action = isInWishlist(product.id) ? 'removed from' : 'added to';
      alert(`Product ${action} wishlist!`);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Loading product with ID:', id);
        
        const productData = await getProductById(Number(id));
        console.log('Received product data:', productData);
        console.log('Product image field:', productData?.image);
        
        if (!productData) {
          console.error('No product data received');
          setError('Product not found');
          return;
        }

        // Validate required fields
        if (!productData.id || !productData.name || typeof productData.price === 'undefined') {
          console.error('Invalid product data:', productData);
          setError('Invalid product data received');
          return;
        }

        // Ensure price is a number
        const validatedProduct = {
          ...productData,
          price: typeof productData.price === 'string' ? parseFloat(productData.price) : productData.price,
          stock: typeof productData.stock === 'string' ? parseInt(productData.stock, 10) : productData.stock
        };

        console.log('Processed product data:', validatedProduct);
        console.log('Image URL will be:', getImageUrl(validatedProduct.image));
        setProduct(validatedProduct);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct()
    }
  }, [id])

  // Debug log when component state changes
  useEffect(() => {
    console.log('Current component state:', {
      loading,
      error,
      product,
      quantity
    });
  }, [loading, error, product, quantity]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error || 'Product not found'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse"
          >
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-center object-cover"
                onLoad={() => {
                  console.log('Image loaded successfully:', getImageUrl(product.image));
                }}
                onError={(e) => {
                  console.log('Image failed to load:');
                  console.log('- Original src:', e.currentTarget.src);
                  console.log('- Product image value:', product.image);
                  console.log('- getImageUrl result:', getImageUrl(product.image));
                  e.currentTarget.src = '/no-image.png';
                }}
              />
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
          >
            {/* Product Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-600">UGX {formatPrice(product.price)}</p>
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div className="text-gray-700 leading-relaxed">{product.description}</div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                  product.stock > 10 ? 'bg-green-100 text-green-800' :
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
                <Link
                  to={`/category/${product.category}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  View similar products →
                </Link>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Options</h2>
              <form className="space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={!product.stock}
                    className="rounded-lg border border-gray-300 py-2 px-3 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[...Array(Math.min(10, product.stock || 0))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total price calculation */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      UGX {formatPrice((typeof product.price === 'string' ? parseFloat(product.price) : product.price) * quantity)}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!product.stock || cartLoading}
                    className={`w-full flex items-center justify-center px-8 py-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white transition-colors ${
                      product.stock && !cartLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {cartLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        🛒 Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                    className={`w-full flex items-center justify-center px-8 py-3 border-2 rounded-lg shadow-sm text-base font-semibold transition-colors ${
                      product && isInWishlist(product.id)
                        ? 'text-red-700 bg-red-50 border-red-300 hover:bg-red-100'
                        : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
                  >
                    {wishlistLoading 
                      ? 'Updating...'
                      : product && isInWishlist(product.id)
                        ? '♥ Remove from Wishlist'
                        : '♡ Add to Wishlist'
                    }
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Product Details Section - Moved Below with More Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 border-t border-gray-300 pt-12"
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Product Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="font-semibold text-gray-900">
                      {typeof product.category === 'object' && product.category ? 
                        product.category.name : 
                        'Unknown'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className={`font-semibold flex items-center ${product.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${product.is_active ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Stock Available:</span>
                    <span className="font-semibold text-gray-900">{product.stock} units</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">Price per Unit:</span>
                    <span className="font-semibold text-blue-600 text-lg">UGX {formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Product Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Added:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(product.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {product.updated_at && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Last Updated:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(product.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">Days Available:</span>
                    <span className="font-semibold text-gray-900">
                      {Math.floor((new Date().getTime() - new Date(product.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductPage
