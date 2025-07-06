import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import RequireAuthForCart from './components/RequireAuthForCart'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import CustomerDashboardPage from './pages/CustomerDashboardPage'
import CustomerProfile from './pages/customer/CustomerProfile'
import CustomerOrders from './pages/customer/CustomerOrders'
import CustomerWishlist from './pages/customer/CustomerWishlist'
import CustomerSupport from './pages/customer/CustomerSupport'
import CustomerSettings from './pages/customer/CustomerSettings'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardAnalytics from './pages/dashboard/DashboardAnalytics.tsx'
import DashboardOrders from './pages/dashboard/DashboardOrders.tsx'
import DashboardProducts from './pages/dashboard/DashboardProducts.tsx'
import DashboardCustomers from './pages/dashboard/DashboardCustomers.tsx'
import DashboardSettings from './pages/dashboard/DashboardSettings.tsx'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/customer')
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={
            <RequireAuthForCart>
              <CartPage />
            </RequireAuthForCart>
          } />
          <Route path="/checkout" element={
            <RequireAuthForCart>
              <CheckoutPage />
            </RequireAuthForCart>
          } />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }>
            <Route index element={<DashboardAnalytics />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="customers" element={<DashboardCustomers />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Customer Dashboard Routes */}
          <Route path="/customer" element={
            <RequireAuth>
              <CustomerDashboardPage />
            </RequireAuth>
          }>
            <Route index element={<CustomerProfile />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="wishlist" element={<CustomerWishlist />} />
            <Route path="support" element={<CustomerSupport />} />
            <Route path="settings" element={<CustomerSettings />} />
          </Route>

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppLayout />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
