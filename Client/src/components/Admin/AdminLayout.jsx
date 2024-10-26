import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'

export default function AdminLayout() {

  const [openSideBar,setOpenSideBar] = useState(false)

  return (
    <div className='flex min-h-screen w-full'>
      {/* Admin sidebar */}
      <AdminSideBar open={openSideBar} setOpen={setOpenSideBar}/>
      <div className='flex flex-1 flex-col'>
        {/* admin header */}
        <AdminHeader setOpen={setOpenSideBar}/>
        <main className='flex flex-col bg-muted/40 p-4 md:p-6'> 
          <Outlet/>
        </main>
      </div>

    </div>
  )
}
