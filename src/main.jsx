import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BookDetail from './pages/BookDetail.jsx'
import Payment from './pages/Payment.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import Dashboard from './components/Admin/AdminDashboard';
import BookManagement from './components/Admin/BookManagement';
import AccountManagement from './components/Admin/AccountManagement';
import CategoryManagement from './components/Admin/CategoryManagement';
import ProtectedRoute from './Context/ProtectedRoute.jsx'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/about',
    element: <h1>About</h1>
  },
  {
    path: "/book/:id",
    element: <BookDetail />
  },
  {
    path: "/payment",
    element: <Payment />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path:"/admin" ,
    element: <ProtectedRoute element={<Dashboard />}/>,
  },
  {
    path:"/admin/book-management" ,
    element: <ProtectedRoute element={<BookManagement />}/>,
  },
  {
    path:"/admin/account-management" ,
    element: <ProtectedRoute element={<AccountManagement />}/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <React.StrictMode>
      <RouterProvider router={routers} />
    </React.StrictMode>
  </UserProvider>
)
