import React from 'react'
// shadcn ui Component
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import {
    DialogContent,
    DialogTitle,
} from '../ui/dialog'
import { Separator } from "../ui/separator"
import { useSelector } from 'react-redux'

export default function ShoppingOrderDetails({ orderDetails }) {

    const { user } = useSelector(state=>state.auth)

    return (
        <div>
            <DialogContent className=" max-h-[90vh] overflow-y-scroll scrollbar-hide sm:max-w-[600px] ">
                <div className='grid gap-6 overflow-y-auto'>
                    <div className='grid gap-2'>
                        <div className='flex items-center justify-between mt-9'>
                            <DialogTitle className='font-medium font-serif'>Order Id</DialogTitle>
                            <Label className="font-mono font-medium">{orderDetails?._id}</Label>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Order Date</DialogTitle>
                            <Label className="font-mono font-medium">{new Date(orderDetails?.orderData).toLocaleDateString()}</Label>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Order Status</DialogTitle>
                            <Label className="font-medium font-mono">

                                <Badge
                                    className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-red-400'}`}>
                                    {orderDetails?.orderStatus}
                                </Badge>

                            </Label>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Price</DialogTitle>
                            <Label className="font-medium font-mono">${orderDetails?.totalAmount}</Label>
                        </div>

                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Payment Method: </DialogTitle>
                            <Label className="font-medium font-mono">{orderDetails?.paymentMethod}</Label>
                        </div>

                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Payment Status: </DialogTitle>
                            <Label className="font-medium font-mono">{orderDetails?.orderStatus}</Label>
                        </div>
                    </div>
                    <Separator />

                    <div className='grid gap-4 '>
                        <div className='font-serif font-medium'>Order Details</div>

                        <div className='grid gap-2'>
                            <ul className='grid gap-3'>
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                        orderDetails?.cartItems.map((singleProduct) => {
                                            return (
                                                <li className='flex items-center justify-between' key={singleProduct?.productId}>
                                                    <span className='font-serif'>Title : {singleProduct?.title}</span>
                                                    <span className='font-serif'>Quantity : {singleProduct?.quantity}</span>
                                                    <span className='font-mono'>Price :$ {singleProduct?.price}</span>
                                                </li>
                                            )
                                        }) : null
                                }
                            </ul>
                        </div>

                    </div>

                    <Separator />
                    <div className="grid gap-4">
                        <div className='grid gap-2'>
                            <div className='font-medium font-serif'>Shipping Information</div>
                            <div className='grid gap-0.5 text-muted-foreground'>
                                <span className='font-serif'>User Name : {user?.userName}</span>
                                <span className='font-serif'>Address : {orderDetails?.addressInfo?.address}</span>
                                <span className='font-serif'>Pincode: {orderDetails?.addressInfo?.pincode}</span>
                                <span className='font-serif'>Phone No. : {orderDetails?.addressInfo?.phone}</span>
                                <span className='font-serif'>Notes : {orderDetails?.addressInfo?.notes}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </div>
    )
}
