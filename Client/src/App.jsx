import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Auth/Layout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
// Admin Components and Layout
import AdminLayout from './components/Admin/AdminLayout'
import AdminDashBoard from './pages/Admin/AdminDashBoard'
import AdminProduct from './pages/Admin/AdminProduct'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminFeatures from './pages/Admin/AdminFeatures'
// 
import ShoppingLayout from './components/Shopping/ShoppingLayout'
import ShoppingHome from './pages/Shopping/ShoppingHome'
import ShoppingListing from './pages/Shopping/ShoppingListing'
import ShoppingCheckOut from './pages/Shopping/ShoppingCheckOut'
import ShoppingAccount from './pages/Shopping/ShoppingAccount'
// Not Found Page
import NotFoundPage from './pages/Not-Found/NotFoundPage'
import CheckAuth from './components/Common/CheckAuth'
import UnauthPage from './pages/Unauth-Page/UnauthPage'


export default function App() {

  const isAuthenticated = true;
  const userInfo = {
    name : 'Vishal',
    role : "user"
  };

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        {/* Common Components */}
        <Routes>

          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
              <Layout />
            </CheckAuth>
          }  >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/*Admin Routes */}
          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashBoard />} />
            <Route path='products' element={<AdminProduct />} />
            <Route path='order' element={<AdminOrders />} />
            <Route path='features' element={<AdminFeatures />} />
          </Route>

          {/* Shopping Routes */}
          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} userInfo={userInfo}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome />} />
            <Route path='listing' element={<ShoppingListing />} />
            <Route path='checkout' element={<ShoppingCheckOut />} />
            <Route path='account' element={<ShoppingAccount />} />
          </Route>
          {/* Not Found Page */}
          <Route path='*' element={<NotFoundPage />} />

          {/* UnAuth Page */}
          <Route path='/unauth-page' element={<UnauthPage/>}/>

        </Routes>
      </div>
    </>
  )
}
