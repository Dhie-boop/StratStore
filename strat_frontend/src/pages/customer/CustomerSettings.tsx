import React, { useState } from 'react'
import { FaCog, FaBell, FaLock, FaEye, FaTrash, FaSave } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'

const CustomerSettings: React.FC = () => {
  const { logout } = useAuth()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: true,
    weeklyNewsletter: false,
    twoFactorAuth: false,
    loginAlerts: true,
    publicProfile: false,
    showOrderHistory: true,
    allowReviews: true
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSettingChange = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    // TODO: Implement settings save
    toast.success('Settings saved successfully!')
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    // TODO: Implement password change
    toast.success('Password updated successfully!')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      try {
        await logout()
        toast.success('Account deleted successfully')
      } catch (error) {
        toast.error('Error deleting account')
      }
    }
  }

  const SettingToggle: React.FC<{ 
    label: string; 
    description: string; 
    checked: boolean; 
    onChange: () => void;
    icon: React.ReactNode;
  }> = ({ label, description, checked, onChange, icon }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="text-blue-600">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="w-full h-full space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <FaCog className="text-3xl text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <FaBell className="text-xl text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <SettingToggle
              label="Email Notifications"
              description="Receive important updates via email"
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange('emailNotifications')}
              icon={<FaBell />}
            />
            
            <SettingToggle
              label="SMS Notifications"
              description="Receive text messages for urgent updates"
              checked={settings.smsNotifications}
              onChange={() => handleSettingChange('smsNotifications')}
              icon={<FaBell />}
            />
            
            <SettingToggle
              label="Order Updates"
              description="Get notified about order status changes"
              checked={settings.orderUpdates}
              onChange={() => handleSettingChange('orderUpdates')}
              icon={<FaBell />}
            />
            
            <SettingToggle
              label="Promotional Emails"
              description="Receive offers and promotional content"
              checked={settings.promotionalEmails}
              onChange={() => handleSettingChange('promotionalEmails')}
              icon={<FaBell />}
            />
            
            <SettingToggle
              label="Weekly Newsletter"
              description="Stay updated with our weekly newsletter"
              checked={settings.weeklyNewsletter}
              onChange={() => handleSettingChange('weeklyNewsletter')}
              icon={<FaBell />}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <FaLock className="text-xl text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          </div>
          
          <div className="space-y-4">
            <SettingToggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={settings.twoFactorAuth}
              onChange={() => handleSettingChange('twoFactorAuth')}
              icon={<FaLock />}
            />
            
            <SettingToggle
              label="Login Alerts"
              description="Get notified when someone logs into your account"
              checked={settings.loginAlerts}
              onChange={() => handleSettingChange('loginAlerts')}
              icon={<FaLock />}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <FaEye className="text-xl text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <SettingToggle
              label="Public Profile"
              description="Make your profile visible to other users"
              checked={settings.publicProfile}
              onChange={() => handleSettingChange('publicProfile')}
              icon={<FaEye />}
            />
            
            <SettingToggle
              label="Show Order History"
              description="Allow order history to be visible in reviews"
              checked={settings.showOrderHistory}
              onChange={() => handleSettingChange('showOrderHistory')}
              icon={<FaEye />}
            />
            
            <SettingToggle
              label="Allow Reviews"
              description="Enable leaving reviews for purchased products"
              checked={settings.allowReviews}
              onChange={() => handleSettingChange('allowReviews')}
              icon={<FaEye />}
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaSave />
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </div>

      {/* Save Settings & Danger Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <button
            onClick={handleSaveSettings}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaSave />
            <span>Save All Settings</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaTrash />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerSettings
