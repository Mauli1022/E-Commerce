import React from 'react'
import { Card, CardHeader, CardTitle } from "../../components/ui/card"
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"

export default function PaymentSuccess() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-normal p-4 text-4xl">
          Payment Successfull.
        </CardTitle>
      </CardHeader>
      <Button onClick={()=>navigate("/shop/account")} 
      className="mt-5 ml-[80px] mb-4">
        View Order Details.
      </Button>
    </Card>
  )
}
