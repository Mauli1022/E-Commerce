import React, { useEffect, useState } from 'react'
import { CardContent, Card, CardHeader, CardTitle } from '../ui/card'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '../ui/table'
import { Button } from "../ui/button"
import { Badge } from '../ui/badge'
import { Dialog, DialogDescription } from '../ui/dialog'
// import AdminOrderDetails from './AdminOrderDetails'
import { useDispatch, useSelector } from 'react-redux'

// Redux Async Thunk
import {
  getAllUsersOrderForAdmin,
  getSingleOrderDetailsForAdmin,
  resetOrderDetails
} from "../../store/Admin/Orders-Slice/adminOrdersSlice.js"
import AdminOrderDetails from './AdminOrderDetails'

export default function AdminOrderView({ }) {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(id) {
    dispatch(getSingleOrderDetailsForAdmin(id))
  }

  useEffect(() => {
    dispatch(getAllUsersOrderForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [orderDetails])


  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>

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
                  orderList.map((singleOrder) => {
                    return (
                      <TableRow key={singleOrder?._id}>
                        <TableCell>{singleOrder?._id}</TableCell>
                        <TableCell>{new Date(singleOrder.orderData).toLocaleDateString()}</TableCell>
                        <TableCell>

                          <Badge className={`py-1 px-3 ${singleOrder?.orderStatus === "confirmed" ? "bg-green-500" :
                              singleOrder?.orderStatus === "rejected" ? "bg-red-500" : "bg-black"
                            }`}>
                            {singleOrder?.orderStatus}
                          </Badge>

                          {/* {singleOrder.orderStatus} */}

                        </TableCell>
                        <TableCell>$ {singleOrder.totalAmount}</TableCell>

                        <TableCell>
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false)
                              dispatch(resetOrderDetails())
                            }}
                          >
                            <DialogDescription className="hidden">Order Details</DialogDescription>

                            <Button
                              onClick={() => handleFetchOrderDetails(singleOrder._id)}
                            >
                              View Details!!
                            </Button>
                            <AdminOrderDetails orderDetails={orderDetails} />
                          </Dialog>

                        </TableCell>
                      </TableRow>
                    )
                  }) : null
              }

            </TableBody>

          </Table>
        </CardContent>

      </CardHeader>
    </Card>
  )
}


/**
 * 
 */
