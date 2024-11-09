import React from 'react'
import accImg from "../../assets/account.jpg"
// ShadCn Component:
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
// Component
import Order from "../../components/Shopping/Order"
import Address from "../../components/Shopping/Address"
export default function ShoppingAccount() {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[350px] w-full overflow-hidden'>
        <img src={accImg} alt="account_image"
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm font-serif'>
          <Tabs defaultValue='orders'>

            <TabsList>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='address'>Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Order/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}
