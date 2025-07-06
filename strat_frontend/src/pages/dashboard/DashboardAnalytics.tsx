import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import axios from 'axios';
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiBox } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface DashboardStats {
  total_customers: number;
  total_products: number;
  total_orders: number;
  total_revenue: number;
  revenue_growth: number;
  customer_growth: number;
  order_growth: number;
}

interface SalesData {
  labels: string[];
  values: number[];
}

interface RecentOrder {
  id: number;
  customer: {
    user: {
      username: string;
    };
  };
  order_date: string;
  status: string;
  total_price: number;
}

export default function DashboardAnalytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [salesData, setSalesData] = useState<SalesData>({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/dashboard/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.data) {
          setStats({
            total_customers: response.data.statistics?.total_customers || 0,
            total_products: response.data.statistics?.total_products || 0,
            total_orders: response.data.statistics?.total_orders || 0,
            total_revenue: response.data.statistics?.total_revenue || 0,
            revenue_growth: response.data.statistics?.revenue_growth || 0,
            customer_growth: response.data.statistics?.customer_growth || 0,
            order_growth: response.data.statistics?.order_growth || 0,
          });
          
          setRecentOrders(response.data.recent_orders || []);
          
          setSalesData({
            labels: response.data.sales_data?.labels || [],
            values: response.data.sales_data?.values || []
          });
        }
      } catch (err: any) {
        console.error('Dashboard data fetch error:', err.response || err);
        setError(
          err.response?.data?.message || 
          'Failed to load dashboard data. Please ensure you have admin access.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  const lineChartData = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: salesData.values,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (!user?.role || user.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="text-red-600 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          {error}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: stats?.total_revenue ? `$${stats.total_revenue.toLocaleString()}` : '$0',
      change: stats?.revenue_growth || 0,
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Total Customers',
      value: stats?.total_customers?.toLocaleString() || '0',
      change: stats?.customer_growth || 0,
      icon: <FiUsers className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: stats?.total_orders?.toLocaleString() || '0',
      change: stats?.order_growth || 0,
      icon: <FiShoppingBag className="w-6 h-6" />,
      color: 'purple'
    },
    {
      title: 'Total Products',
      value: stats?.total_products?.toLocaleString() || '0',
      change: 0,
      icon: <FiBox className="w-6 h-6" />,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={
                stat.color === 'blue' ? 'p-3 rounded-lg bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'p-3 rounded-lg bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'p-3 rounded-lg bg-purple-100 text-purple-600' :
                'p-3 rounded-lg bg-orange-100 text-orange-600'
              }>
                {stat.icon}
              </div>
              {stat.change !== 0 && (
                <span className={
                  `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.change > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`
                }>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                  <FiTrendingUp className={
                    `ml-1 ${stat.change < 0 ? 'transform rotate-180' : ''}`
                  } />
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[350px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer.user.username}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total_price}</p>
                  <span
                    className={
                      order.status === 'completed'
                        ? 'inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800'
                        : 'inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'
                    }
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/dashboard/orders')}
            className="mt-6 w-full text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
}
