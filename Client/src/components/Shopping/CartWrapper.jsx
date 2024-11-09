import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { DialogDescription } from "../../components/ui/dialog"
import { Button } from '../ui/button'
import CartItemsContent from './CartItemsContent';
import { useNavigate } from 'react-router-dom';

export default function CartWrapper({cartItems}) {
  // console.log(cartItems);

  const navigate = useNavigate()
  
  const totalAmout = cartItems && cartItems.length > 0 ? 
  cartItems.reduce(
    (sum,currentItem)=> sum + (
      currentItem?.salePrice > 0 ? 
      currentItem?.salePrice : 
      currentItem?.price) * currentItem.quantity , 0
  ) : 0

  return (
    <SheetContent className="sm:max-w-md overflow-auto">
        <SheetHeader>
        <DialogDescription></DialogDescription>
            <SheetTitle className="font-serif">Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>
          {
            cartItems && cartItems.length > 0 ?
            cartItems.map((item,index) => <CartItemsContent item={item} key={index}/>)
            : null
          }
        </div>
        <div className='mt-8 spacey4'>
            <div className='flex justify-between'>
                <span className='font-bold font-serif'>Total</span>
                <span className='font-bold font-serif'>${totalAmout}</span>
            </div>
        </div>
        <Button className="w-full mt-6" onClick={()=>navigate("/shop/checkout")}>Checkout</Button>
    </SheetContent>
  )
}
