import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import './index.css'
import ErrorPage from './pages/ErrorPage.jsx'

import AddOrder from './pages/AddOrder.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminProfile from './pages/AdminProfile.jsx'
import AdminRegister from './pages/AdminRegister.jsx'
import Dashboard from './pages/Dashboard.jsx'
import StorePage from './pages/StorePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/order',
    element: <AddOrder />,
  },
  {
    path: '/store',
    element: <StorePage />,
  },
  {
    path: '/i337x/register',
    element: <AdminRegister />,
  },
  {
    path: '/i337x/login',
    element: <AdminLogin />,
  },
  {
    path: '/i337x/profile',
    element: <AdminProfile />,
  },

  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
