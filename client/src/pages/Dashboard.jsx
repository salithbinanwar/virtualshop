import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios.jsx'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)

  const [cookies] = useCookies(['jwt'])
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies.jwt == null) {
      navigate('/')
    }
  }, [cookies.jwt, navigate])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders')
        setOrders(response.data.data)
        setTotalOrders(response.data.data.length)
        setTotalRevenue(
          response.data.data.reduce(
            (total, order) => total + (order.price || 0),
            0,
          ),
        )
        setActiveUsers(24) // Simulated active users
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrders()
  }, [])

  const chartData = {
    labels: orders.map((order) =>
      new Date(order.createdAt).toLocaleDateString(),
    ),
    datasets: [
      {
        label: 'Order Volume',
        data: orders.map((_, index) => index + 1), // Cumulative order count
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Trends',
        color: 'rgba(99, 102, 241, 1)',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cumulative Orders',
          color: 'rgba(99, 102, 241, 1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: 'rgba(99, 102, 241, 1)',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-indigo-900 font-bold">Dashboard</h1>
        <Link
          to="/i337x/profile"
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          <User className="h-5 w-5 mr-2" />
          Admin Profile
        </Link>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart className="h-8 w-8 text-indigo-600" />}
          trend="+12.5%"
        />
        <StatCard
          title="Total Order Value"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-8 w-8 text-green-600" />}
          trend="+8.2%"
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          trend="+5.7%"
        />
        <StatCard
          title="Conversion Rate"
          value="3.5%"
          icon={<ArrowUpRight className="h-8 w-8 text-purple-600" />}
          trend="+2.1%"
        />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">
            Recent Orders
          </h2>
          <div className="overflow-hidden">
            <table className="w-full border-collapse border-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-indigo-800 border border-indigo-200">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-indigo-800 border border-indigo-200">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-indigo-800 border border-indigo-200">
                    Order Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-indigo-800 border border-indigo-200">
                    Date & Time
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto max-h-64">
              <table className="w-full border-collapse border-gray-200">
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-indigo-100 hover:bg-indigo-50 transition duration-150"
                    >
                      <td className="px-4 py-2 text-left border border-indigo-100">
                        {order.name}
                      </td>
                      <td className="px-4 py-2 text-left border border-indigo-100">
                        {order.email}
                      </td>
                      <td className="px-4 py-2 text-left border border-indigo-100">
                        {order.orderType}
                      </td>
                      <td className="px-4 py-2 text-left border border-indigo-100">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">
            Order Trends
          </h2>
          <Line
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-indigo-600">{title}</h3>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-green-500">{trend}</span> from last month
      </p>
    </div>
  )
}

export default Dashboard
