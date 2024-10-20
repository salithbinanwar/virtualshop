import { LayoutDashboard, LogOut, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios'

const AdminProfile = () => {
  const [cookies] = useCookies(['jwt'])
  const navigate = useNavigate()
  const [admin, setAdmin] = useState({
    email: '',
    name: '',
    password: '',
  })

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axiosInstance.get('/admin/profile')
        setAdmin(response.data.data[0])
        console.log(response.data.data[0].name)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAdmin()
  }, [])

  const handleLogout = async (e) => {
    // Implement logout logic here
    e.preventDefault()
    try {
      // Replace with your actual API endpoint
      await axiosInstance.post('/admin/logout', {})
      toast.success('Subscription successful!', {
        duration: 3000,
        position: 'top-center',
      })
    } catch (error) {
      toast.error('invalid user or password', {
        duration: 3000,
        position: 'top-center',
      })
      console.error('Submission error:', error)
    }
  }

  // const handleEditProfile = () => {
  //   console.log('Editing profile...')
  // }
  const handleDashboard = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    if (cookies.jwt == null) {
      navigate('/')
    }
    // console.log(cookies.jwt)
  }, [cookies.jwt, navigate])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <User
            size={64}
            className="text-blue-600"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <p className="text-lg font-semibold text-gray-800">{admin.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <p className="text-lg font-semibold text-gray-800">{admin.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Created at
            </label>
            <p className="text-lg font-semibold text-gray-800">
              {admin.createdAt}
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {/* <button
            onClick={handleEditProfile}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <Edit
              size={20}
              className="mr-2"
            />
            Edit Profile
          </button> */}
          <button
            onClick={handleDashboard}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <LayoutDashboard
              size={20}
              className="mr-2"
            />
            back to dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <LogOut
              size={20}
              className="mr-2"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
