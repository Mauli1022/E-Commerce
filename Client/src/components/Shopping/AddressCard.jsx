import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function AddressCard({
  addressInfo, 
  handleDeleteAddress, 
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {

  // useEffect(()=>{
  //   console.log(addressInfo?._id === selectedId?._id)
  // },[addressInfo, selectedId])
  

  return (
    <Card 
    onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null}
    className={`cursor-pointer`}
    >
       <CardContent className={`grid gap-3 font-serif p-2 h-[70%] w-full border rounded-sm ${selectedId?._id == addressInfo?.id ?
      "border-orange-200" : "border-black"
    }`}
    >
        <Label><span className='font-extrabold font-serif'>Address:</span> {addressInfo?.address}</Label>
        <Label><span className='font-extrabold font-serif'>City:</span> {addressInfo?.city}</Label>
        <Label><span className='font-extrabold font-serif'>Pincode:</span> {addressInfo?.pincode}</Label>
        <Label><span className='font-extrabold font-serif'>Mobile No:</span> {addressInfo?.phone}</Label>
        <Label><span className='font-extrabold font-serif'>Notes:</span> {addressInfo?.notes}</Label>
       </CardContent>

       <CardFooter className=" flex justify-between mt-2 ">
        <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressInfo._id)}>Delete</Button>
       </CardFooter>
    </Card>
  )
}
/*
672f8df22e02b1c91648be02 672f8df22e02b1c91648be02
*/