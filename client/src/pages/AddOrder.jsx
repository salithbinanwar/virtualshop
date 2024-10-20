import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axios'

function AddOrder() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subscription, setSubscription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      //API endpoint
      await axiosInstance.post('/orders', {
        name,
        email,
        orderType: subscription,
      })

      toast.success('Subscription successful!', {
        duration: 3000,
        position: 'top-center',
      })
      // Clear form fields after successful submission
      setName('')
      setEmail('')
      setSubscription('')
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 3000,
        position: 'top-center',
      })
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Subscription Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="subscription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subscription
            </label>
            <select
              id="subscription"
              value={subscription}
              onChange={(e) => setSubscription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a subscription</option>
              <option value="discord">Discord Nitro</option>
              <option value="youtube">YouTube Premium</option>
              <option value="spotify">Spotify Premium</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default AddOrder
