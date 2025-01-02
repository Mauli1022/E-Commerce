import React, { useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import Form from '../Common/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../Common/hooks/use-toast'

// Async Thunk
import {
    getAllUsersOrderForAdmin,
    getSingleOrderDetailsForAdmin,
    updateOrderStatus
} from "../../store/Admin/Orders-Slice/adminOrdersSlice.js"
import { Badge } from '../ui/badge'


// Initial Form State :
const initialState = {
    status: ""
}

export default function AdminOrderDetails({ orderDetails }) {
    const [formData, setFormData] = useState(initialState)
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast()

    function handleUpdatedStatus(e) {
        e.preventDefault()

        dispatch(updateOrderStatus({
            id: orderDetails?._id,
            orderStatus: formData.status
        }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(getSingleOrderDetailsForAdmin(orderDetails?._id))
                    dispatch(getAllUsersOrderForAdmin())
                    setFormData(initialState)

                    toast({
                        title : data?.payload?.message
                    })
                }
            })

    }



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
                                <Badge className={`py-1 px-3 ${
                                    orderDetails?.orderStatus === "confirmed" ? "bg-green-500" :
                                    orderDetails?.orderStatus === "rejected" ? "bg-red-500" : "bg-black"
                                }`}>
                                    {orderDetails?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                        <div className='flex items-center justify-between mt-5'>
                            <DialogTitle className='font-medium font-serif'>Price</DialogTitle>
                            <Label className="font-medium font-mono">$ {orderDetails?.totalAmount}</Label>
                        </div>
                    </div>
                    <Separator />

                    <div className='grid gap-4 '>
                        <div className='grid gap-2'>
                            <div className='font-serif font-medium'>Order Details</div>
                            <ul className='grid gap-3'>

                                {
                                    orderDetails && orderDetails?.cartItems.length > 0 ?
                                        orderDetails.cartItems.map((singleItem) => {
                                            return (
                                                <li className='flex items-center justify-between' key={singleItem?._id}>
                                                    <span className='font-serif'>{singleItem.title}</span>
                                                    <span className='font-mono'>${singleItem.price}</span>
                                                </li>
                                            )
                                        })
                                        : null
                                }

                                <li className='flex items-center justify-between'>
                                    <span className='font-serif'>Product One</span>
                                    <span className='font-mono'>$100</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator />
                    <div className="grid gap-4">
                        <div className='grid gap-2'>
                            <div className='font-medium font-serif'>Shipping Information</div>
                            <div className='grid gap-0.5 text-muted-foreground'>
                                <span className='font-serif'>{user.userName} Here we neet to show User's Name</span>
                                <span className='font-serif'>{orderDetails?.addressInfo?.address}</span>
                                <span className='font-serif'>{orderDetails?.addressInfo?.pincode}</span>
                                <span className='font-serif'>{orderDetails?.addressInfo?.phone}</span>
                                <span className='font-serif'>{orderDetails?.addressInfo?.notes}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />
                    <div className='grid gap-5 p-2'>
                        <Form formContols={
                            [
                                {
                                    label: "Order Status",
                                    name: "status",
                                    componentType: "select",
                                    options: [
                                        { id: "pending", label: "Pending" },
                                        { id: "inProcess", label: "In Process" },
                                        { id: "inShipping", label: "In Shipping" },
                                        { id: "rejected", label: "Rejected" },
                                        { id: "delivered", label: "Delivered" },
                                        {id: "confirmed", label : "Confirmed"}
                                    ],
                                }
                            ]
                        }
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleUpdatedStatus}
                            buttonText={"Update Order Status"}
                        />
                    </div>
                </div>

            </DialogContent>
        </div>
    )
}
