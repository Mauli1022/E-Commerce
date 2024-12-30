import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogDescription } from '../ui/dialog'
import ShoppingOrderDetails from './ShoppingOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from "../ui/badge"


// Async Thunk:
import { getAllUsersOrder, getSingleOrderDetails, resetOrderDetails } from "../../store/order-slice/index.js"

export default function Order() {

  const [ openDetailsDialog , setOpenDetailsDialog] = useState(false)
  const { user } = useSelector(state=>state.auth)
  const { orderList, orderDetails } = useSelector(state=>state.shoppingOrder);
  const dispatch = useDispatch();


  function handleFetchOrderDetails(id){
    dispatch(getSingleOrderDetails(id))
  }

  useEffect(()=>{
    dispatch(getAllUsersOrder(user.id))
  },[dispatch])

 useEffect(()=>{
  if(orderDetails !== null){
    setOpenDetailsDialog(true)
  }
 },[orderDetails])


  // console.log("Order Component", orderDetails);
  // console.log(orderList[0]);
  
  
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>

            {
              orderList && orderList.length > 0 ? 
              orderList.map((singleOrder,index)=>{
                return (
                  <TableRow key={index}>
                  <TableCell>{singleOrder._id}</TableCell>
                  <TableCell>{new Date(singleOrder.orderData).toLocaleDateString()}</TableCell>
                  <TableCell>
                    
                    <Badge 
                    className={`py-1 px-3 ${singleOrder?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-red-400'}`}>
                    {singleOrder.orderStatus}
                    </Badge>

                  </TableCell>
                  <TableCell>${singleOrder.totalAmount}</TableCell>
                  
                  <TableCell>
                  <Dialog 
                  open={openDetailsDialog} 
                  onOpenChange={()=>{
                    setOpenDetailsDialog(false)
                    dispatch(resetOrderDetails())
                  }}
                  >
                        <DialogDescription className="hidden">Order Details</DialogDescription>
    
                        <Button onClick={ ()=>handleFetchOrderDetails( singleOrder._id ) }>
                          View Details!!
                        </Button>
                        <ShoppingOrderDetails orderDetails={orderDetails}/>
                  </Dialog>
    
                  </TableCell>
                </TableRow>
                )
              })
              : null
            }

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
