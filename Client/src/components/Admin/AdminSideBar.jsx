import React from 'react'
import { LayoutDashboard, Piano, CalendarArrowUp } from "lucide-react"
import { ChartColumnIncreasing } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"


const adminSideBarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: "/admin/products",
    icon: <Piano />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: "/admin/order",
    icon: <CalendarArrowUp />
  }
]

function MenuItems({setOpen}) {

  const navigate = useNavigate()

  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSideBarMenuItems.map((menuItem) => {
        return (
          <div key={menuItem.id}
            className='flex items-center gap-2 rounded-md px-3 py-2 text-xl text-muted-foreground hover:cursor-pointer hover:text-foreground '
            onClick={() => {
              navigate(menuItem.path)
              setOpen ? setOpen(false) : null
             }}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        )
      })
    }
  </nav>
}

export default function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" classNamew-64>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 mt-4 mb-5'>
                <ChartColumnIncreasing size={30} />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>

        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/admin/dashboard")}>
          <ChartColumnIncreasing size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />

      </aside>
    </>
  )
}
