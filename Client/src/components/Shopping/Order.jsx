import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogDescription } from '../ui/dialog'
import ShoppingOrderDetails from './ShoppingOrderDetails'

export default function Order() {

  const [ openDetailsDialog , setOpenDetailsDialog] = useState(false)

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
            <TableRow>
              <TableCell>123445</TableCell>
              <TableCell>02/02/2020</TableCell>
              <TableCell>In process</TableCell>
              <TableCell>$10100</TableCell>
              <TableCell>
               
              <Dialog 
              open={openDetailsDialog} 
              onOpenChange={setOpenDetailsDialog}
              >
                    <DialogDescription className="hidden">Order Details</DialogDescription>

                    <Button onClick={()=>setOpenDetailsDialog(true)}>
                      View Details!!
                    </Button>
                    <ShoppingOrderDetails/>
              </Dialog>

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
