import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { House, Menu, ShoppingCart, UserCheck, LogOut } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '../../components/ui/sheet'
import { Button } from '../ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { shopViewHeaderMenuItems } from '@/config'
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import CartWrapper from './CartWrapper'
// thunk
import { logOutUser, resetTokenAndCredentials } from "../../store/auth-slice/index.js"
import { fetchCartItems } from "../../store/cart-slice/index.js"
import { Label } from '../ui/label'

function MenuItems() {

  const navigate = useNavigate()
  const location = useLocation()
  const [ searchParams , setSearchParams] = useSearchParams()

  function handleNavigate(getCurrentMenuItem) {
    // console.log("GetCurrentMenuItem",getCurrentMenuItem);

    sessionStorage.removeItem('filters')

    const currentFilter = getCurrentMenuItem.id !== 'home' 
    && getCurrentMenuItem.id !== 'products'
    && getCurrentMenuItem.id !== 'search'
      ? {
        category: [getCurrentMenuItem.id]
      } : null
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))

    location.pathname.includes('listing') && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category`)) : null

    navigate(getCurrentMenuItem.path);
  }

  return (
  <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shopViewHeaderMenuItems.map(menuItem => {
        return (
          <Label
            onClick={() => handleNavigate(menuItem)}

            key={menuItem.id}
            to={menuItem.path}
            className='text-sm font-medium font-serif cursor-pointer'
          >
            {menuItem.label.toUpperCase()}
          </Label>
        )
      })
    }
  </nav>
  )
}

function HeaderRightContent() {

  const [openCartSheet, setOpenCartSheet] = useState(false)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shoppingCart)


  // Function to handle Logout user
  function handleLogout() {
    // dispatch(logOutUser())
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate("/auth/login")
  }
  useEffect(() => {
    dispatch(fetchCartItems(user.id))
  }, [dispatch])
// console.log(cartItems?.items.length, " cartItems");

  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button 
      variant="outline" 
      size="icon" 
      onClick={() => setOpenCartSheet(true)}
      className="relative"
      >

        <ShoppingCart className="w-6 h-6" />
        <span className='absolute top-[-1px] right-[4px] text-sm '>{cartItems?.items?.length || 0}</span>
        <span className='sr-only'>User Cart</span>
      </Button>
      {/* Cart Item Wraper. */}
      <CartWrapper
        setOpenCartSheet={setOpenCartSheet}
        cartItems={
          cartItems &&
            cartItems.items &&
            cartItems.items.length > 0 ?
            cartItems.items : []
        }
      />

    </Sheet>

    <DropdownMenu>

      <DropdownMenuTrigger asChild >
        <Avatar className="bg-black">
          <AvatarFallback className="bg-black text-white font-extrabold">
            {user.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom' className='w-56 bg-white mt-4 mr-4 border border-gray-400 overflow-hidden p-4 rounded-md'>
        <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserCheck className='mr-2 h-4 w-4' />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          LogOut
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}

export default function ShoppingHeader() {

  // State to check if user is authenticated or not
  const { isAuthenticated, user } = useSelector(state => state.auth)

  return (
    <header className='static top-0 z-40 w-full border-b bg-background'>

      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link className='flex items-center gap-2' to={"/shop/home"}>
          <House className='h-6 w-6 ' />
          <span className='font-bold font-serif'>QuantumQuik</span>
        </Link>

        <Sheet>
          <>
            <SheetTrigger asChild>
              <Button variant="outline" size='icon' className="lg:hidden" >
                <Menu className='h-6 w-6' />
                <DialogTitle className='sr-only'>Toggel Header Menu</DialogTitle>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs">
              <DialogDescription className="sr-only">This is the menu Items"</DialogDescription>
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />
        </div>

        <div className='hidden lg:block'>
          {/* {isAuthenticated ?  */}
          <div className='hidden lg:block'>
            <HeaderRightContent />
          </div>
          {/* // : null} */}
        </div>
      </div>

    </header>
  )
}
