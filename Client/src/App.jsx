import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Auth/Layout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

export default function App() {
  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        {/* Common Components */}
        <Routes>

          <Route path='/auth' element={<Layout />} >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}
