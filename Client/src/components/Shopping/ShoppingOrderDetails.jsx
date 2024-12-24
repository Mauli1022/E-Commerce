import React from 'react'
// shadcn ui Component
import { Label } from '../ui/label'
import { 
    DialogContent,
    DialogTitle,
 } from '../ui/dialog'
 import { Separator } from "../ui/separator"

export default function ShoppingOrderDetails() {
  return (
    <div>
         <DialogContent className=" max-h-[90vh] overflow-y-scroll scrollbar-hide sm:max-w-[600px] ">
            <div className='grid gap-6 overflow-y-auto'>
                <div className='grid gap-2'>
                    <div className='flex items-center justify-between mt-9'>
                        <DialogTitle className='font-medium font-serif'>Order Id</DialogTitle>
                        <Label className="font-mono font-medium">123456</Label>
                    </div>
                    <div className='flex items-center justify-between mt-5'>
                        <DialogTitle className='font-medium font-serif'>Order Date</DialogTitle>
                        <Label className="font-mono font-medium">12/12/2024</Label>
                    </div>
                    <div className='flex items-center justify-between mt-5'>
                        <DialogTitle className='font-medium font-serif'>Order Status</DialogTitle>
                        <Label className="font-medium font-mono">Pending</Label>
                    </div>
                    <div className='flex items-center justify-between mt-5'>
                        <DialogTitle className='font-medium font-serif'>Price</DialogTitle>
                        <Label className="font-medium font-mono">$500</Label>
                    </div>
                </div>
                <Separator/>
                <div className='grid gap-4 '>
                    <div className='grid gap-2'>
                        <div className='font-serif font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            <li className='flex items-center justify-between'>
                                <span className='font-serif'>Product One</span>
                                <span className='font-mono'>$100</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator/>
                <div className="grid gap-4">
                    <div className='grid gap-2'>
                        <div className='font-medium font-serif'>Shipping Information</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span className='font-serif'>Vishal Palke</span>
                            <span className='font-serif'>City</span>
                            <span className='font-serif'>Pincode</span>
                            <span className='font-serif'>Phone</span>
                            <span className='font-serif'>Notes</span>
                        </div>
                    </div>
                </div>
            </div>

        </DialogContent>
    </div>
  )
}
