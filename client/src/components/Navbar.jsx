import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container grid px-5 py-2 lg:grid-cols-12 md:grid-cols">
        <div className=" col-span-6">
          <Link
            to="/"
            className="text-white text-2xl"
          >
            Virtual shop
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
