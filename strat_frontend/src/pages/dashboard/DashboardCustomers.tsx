import React, { useState } from 'react'
import { FaSearch, FaEnvelope, FaPhone } from 'react-icons/fa'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  status: 'active' | 'inactive'
}

const DashboardCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const mockCustomers: Customer[] = [
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234-567-8901',
      totalOrders: 12,
      totalSpent: 1499.99,
      joinDate: '2023-08-15',
      status: 'active'
    },
    {
      id: 'CUST002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234-567-8902',
      totalOrders: 8,
      totalSpent: 899.99,
      joinDate: '2023-09-20',
      status: 'active'
    },
    {
      id: 'CUST003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 234-567-8903',
      totalOrders: 3,
      totalSpent: 299.99,
      joinDate: '2023-11-05',
      status: 'inactive'
    }
  ]

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-gray-400" />
                  <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaPhone className="text-gray-400" />
                  <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                    {customer.phone}
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-lg font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Joined {new Date(customer.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardCustomers
