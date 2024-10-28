import React, { useEffect } from 'react'
import Filter from "../../components/Shopping/Filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, } from '../../components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from  "../../config/index.js"
import { useDispatch, useSelector } from 'react-redux'

// Thunk
import { fetchAllShoppingProducts } from "../../store/Shop/shoppingProductSlice.js"

export default function ShoppingListing() {

  const dispatch = useDispatch();
       
  const { allProduct } = useSelector(state=>state.shopProduct)


  // Fetch List of Product
  useEffect(()=>{
    dispatch(fetchAllShoppingProducts())
    // .then((data)=>console.log("Payload ",data))
  },[dispatch])
  // console.log("All product",allProduct);
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <Filter/>

      <div className='bg-background w-full rounded-lg shadow-sm '>
        <div className='p-4 border-b flex items-center justify-between '>
          <h2 className=' text-lg font-extrabold mr-2'>All Product</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>10 Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDownIcon className='h-4 w-4'/>
                <span className=''>Sort By</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup>
                {
                  sortOptions.map(sortItem=>(
                    <DropdownMenuRadioItem key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                  ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>

          </DropdownMenu>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          
        </div>


      </div>
    </div>
  )
}
