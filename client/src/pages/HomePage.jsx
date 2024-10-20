import { ArrowRight, ShoppingBag, Store } from 'lucide-react'

import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Welcome to Virtual Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover a world of endless possibilities in our digital
            marketplace.
          </p>
          <div className="space-y-4">
            <Link
              to="/order"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <ShoppingBag
                className="mr-2"
                size={20}
              />
              Add Order
              <ArrowRight
                className="ml-2"
                size={20}
              />
            </Link>
            <Link
              to="/store"
              className="block w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <Store
                className="mr-2"
                size={20}
              />
              View Store
              <ArrowRight
                className="ml-2"
                size={20}
              />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full animate-pulse"></div>
            <img
              src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Virtual Shop"
              className="absolute inset-4 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
