import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

export default function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* Common Header Component */}
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
    </div>
  )
}
