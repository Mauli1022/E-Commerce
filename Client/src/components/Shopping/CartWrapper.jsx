import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { DialogDescription } from "../../components/ui/dialog"
import { Button } from '../ui/button'

export default function CartWrapper() {
  return (
    <SheetContent className="sm:max-w-md">
        <SheetHeader>
        <DialogDescription></DialogDescription>
            <SheetTitle className="font-serif">Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>

        </div>
        <div className='mt-8 spacey4'>
            <div className='flex justify-between'>
                <span className='font-bold font-serif'>Total</span>
                <span className='font-bold font-serif'>$100</span>
            </div>
        </div>
        <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  )
}
