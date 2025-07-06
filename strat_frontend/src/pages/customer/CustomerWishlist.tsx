import React from 'react'
import { FaTrash, FaShoppingCart, FaSpinner, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useWishlist } from '../../contexts/WishlistContext'
import { useCart } from '../../contexts/CartContext'
import { getImageUrl } from '../../utils/imageUtils'
import type { Product } from '../../types'

const CustomerWishlist: React.FC = () => {
  const { wishlistItems, loading, toggleWishlistItem } = useWishlist()
  const { addItemToCart } = useCart()

  const handleRemoveFromWishlist = async (product: Product) => {
    try {
      await toggleWishlistItem(product)
      toast.success('Removed from wishlist')
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast.error('Failed to remove from wishlist')
    }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      await addItemToCart(product, 1)
      toast.success(`Added ${product.name} to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add to cart')
    }
  }

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2)
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full space-y-6 bg-gray-50">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">My Wishlist</h1>
        <span className="text-gray-500">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
          <p className="text-gray-400 mb-6">Add items you love to your wishlist and keep track of them here</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const product = 'product' in item ? item.product : item;
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/no-image.png'
                    }}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-semibold text-gray-900">UGX {formatPrice(product.price)}</p>
                  <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </p>
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default CustomerWishlist
