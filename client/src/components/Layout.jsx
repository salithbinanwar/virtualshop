import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <main>
      <div>{/* <Navbar /> */}</div>
      {children}
    </main>
  )
}

export default Layout
