import React, { useEffect } from 'react'
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
// ShadCn Component
import { Skeleton } from "@/components/ui/skeleton"
// Redux hooks and Component
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'




export default function App() {

  const {user, isAuthenticated, isLoading} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  
  if(isLoading) return <Skeleton className="w-[600px] h-[600px] bg-black" />
  // console.log(location.pathname);
  
  
  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        {/* Common Components */}
        <Routes>

          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }  >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/*Admin Routes */}
          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
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
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
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
