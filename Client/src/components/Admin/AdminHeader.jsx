import React from 'react'
// Lucide Components
import { AlignJustify, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { resetTokenAndCredentials } from "../../store/auth-slice/index.js"
import { useNavigate } from 'react-router-dom'

export default function AdminHeader({setOpen}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogOut(){
    // dispatch(logOutUser())
     dispatch(resetTokenAndCredentials())
        sessionStorage.clear()
        navigate("/auth/login")
  }

  return (
    <header className='flex items-center justify-between px-4, py-3 bg-background border-b mr-2 ml-2'>
      <Button className='lg:hidden sm:block' onClick={()=>setOpen(true)}>
      <AlignJustify/>
      <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button 
        className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow '
        onClick={handleLogOut}
        >
        <LogOut />
        Logout
        </Button>
      </div>

    </header>
  )
}
