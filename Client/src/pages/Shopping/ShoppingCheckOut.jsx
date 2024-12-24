import React, { useState } from 'react'
import img from "../../assets/account.jpg"

// shadcn ui
import { Button } from "../../components/ui/button"

// component
import Address from "../../components/Shopping/Address"
import CartItemsContent from "../../components/Shopping/CartItemsContent"
import { useDispatch, useSelector } from 'react-redux'
import { createNewOrder } from "../../store/order-slice/index.js"


export default function ShoppingCheckOut() {

  const { cartItems } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state=>state.auth)
  // get the approvalURL from the state
  const { approvalURL } = useSelector(state => state.shoppingOrder)
  const dispatch = useDispatch()

  // State to manage Users Address 
  const [ currentSelectedAddress, setCurrentSelectedAddress ] = new useState(null);
  const [ isPaymentStart, setIsPaymentStart ] = useState(false);
  
  
  const totalAmout = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce(
      (sum, currentItem) => sum + (
        currentItem?.salePrice > 0 ?
          currentItem?.salePrice :
          currentItem?.price) * currentItem.quantity, 0
    ) : 0
  

  function handleInitiatePaypalPayment() {

    const orderData = {
      userId : user?.id,

      cartItems : cartItems.items.map(singleCartItem=>({
        productId : singleCartItem?.productId,
        title : singleCartItem?.title,
        image : singleCartItem?.image,
        price : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity : singleCartItem?.quantity
      })),

      addressInfo : {
        addrressId : currentSelectedAddress?._id ,
        address : currentSelectedAddress?.address,
        city : currentSelectedAddress?.city,
        pincode : currentSelectedAddress?.pincode,
        phone : currentSelectedAddress?.phone,
        notes : currentSelectedAddress?.notes
      } ,

      orderStatus : 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending',
      totalAmount : totalAmout,
      orderData : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      payerId: ''
    }

    // initiate the Payment
    dispatch(createNewOrder(orderData))
    .then((data)=>{
      if(data?.payload?.success){
       setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
  })

  // console.log("Approval Url : ", approvalURL);
  }

  if(approvalURL){
    window.location.href = approvalURL;
  }


  return (
    <div className='flex flex-col '>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} alt="CheckOut-Banner" className='h-full w-full object-cover object-center' />
      </div>

      {/* Address */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map((cartItems, index) => <CartItemsContent item={cartItems} key={index} />) : null
          }

          <div className='mt-8 space-x-4 border-t-2'>
            <div className='flex justify-between'>
              <span className='font-bold font-serif'>Total :</span>
              <span className='font-bold font-serif'>${totalAmout}</span>
            </div>
          </div>

          <div className=' mt-4 w-full'>
            <Button className="w-full"
              onClick={handleInitiatePaypalPayment}
            >Checkout With Paypal</Button>
          </div>

        </div>
      </div>
    </div>
  )
}
