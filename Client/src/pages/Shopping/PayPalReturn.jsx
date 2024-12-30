// import { CardTitle } from '@/components/ui/card'
import { useDispatch } from "react-redux"
import { Card, CardTitle } from "../../components/ui/card"
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"

// Async thunk
import { captureOrder } from "../../store/order-slice/index.js"


export default function PayPalReturn() {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId")
  const payerId = params.get("PayerID")
  console.log(params ,paymentId, payerId);
  


  useEffect(()=>{

    console.log(params ,paymentId, payerId);
    if(paymentId && paymentId){
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

      dispatch(captureOrder({paymentId,payerId,orderId}))
      .then(data=>{
        if(data?.payload?.success){
          sessionStorage.removeItem('currentOrderId')
          window.location.href = "/shop/payment-success"
        }
      })
    }

  },[paymentId,payerId,dispatch])

  return (
    <Card>

      <CardTitle className="font-serif font-normal p-4"> Processing Payment...Please Wait!</CardTitle>

    </Card>
  )
}
/*
When we get the payment id and Payer Id :
then we call the capturePayment Method

in PayPalRetun we process the payment
and if payment is processed then we update the payment status

*/