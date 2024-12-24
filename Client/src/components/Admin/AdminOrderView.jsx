import React, { useState } from 'react'
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
import { Dialog, DialogDescription } from '../ui/dialog'
import AdminOrderDetails from './AdminOrderDetails'

export default function AdminOrderView({}) {
  const [ openDetailsDialog , setOpenDetailsDialog ] = useState(false)
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
              <TableRow>

                <TableCell>123445</TableCell>
                <TableCell>02/02/2020</TableCell>
                <TableCell>In process</TableCell>
                <TableCell>$10100</TableCell>

                <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                    <DialogDescription className="hidden">Order Details</DialogDescription>
                    <Button onClick={()=>setOpenDetailsDialog(true)}>
                      View Details
                    </Button>
                    <AdminOrderDetails/>
                  </Dialog>
                </TableCell>

              </TableRow>
            </TableBody>

          </Table>
        </CardContent>

      </CardHeader>
    </Card>
  )
}
