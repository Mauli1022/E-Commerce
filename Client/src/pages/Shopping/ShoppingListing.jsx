import React, { useEffect, useState } from 'react'
import Filter from "../../components/Shopping/Filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, } from '../../components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from  "../../config/index.js"
import { useDispatch, useSelector } from 'react-redux'

// Thunk
import { fetchAllShoppingProducts } from "../../store/Shop/shoppingProductSlice.js"
import ShoppingProductTile from '../../components/Shopping/ShoppingProductTile'

export default function ShoppingListing() {

  const dispatch = useDispatch();
       
  const { allProduct } = useSelector(state=>state.shopProduct)
  const [filters,setFilters] = useState({})
  const [sort ,setSort] = useState(null)

  function handleSort(value){
    // console.log(value);
    setSort(value)
  }

  function handleFilter(getSectionId,getCorrentOption){
    // console.log(getCorrentOption, getSectionId);

    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if(indexOfCurrentSection === -1){
      cpyFilters = {
        ...cpyFilters,
        [getSectionId] : [getCorrentOption]
      }
    }else{
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCorrentOption)

      if(indexOfCurrentOption === -1){
        cpyFilters[getSectionId].push(getCorrentOption)
      }else{
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters)
    console.log(filters);

    // when we refresh the page we need to get all the previous value in category brand 
    // so we stores it in sessionStorage 
    sessionStorage.setItem("filters",JSON.stringify(cpyFilters))
    
  }


  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  },[])

  // Fetch List of Product
  useEffect(()=>{
    dispatch(fetchAllShoppingProducts())
    // .then((data)=>console.log("Payload ",data))
  },[dispatch])
  // console.log("All product",allProduct);
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <Filter filters={filters} handleFilter={handleFilter}/>

      <div className='bg-background w-full rounded-lg shadow-sm '>
        <div className='p-4 border-b flex items-center justify-between '>
          <h2 className=' text-lg font-extrabold mr-2'>All Product</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{allProduct?.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDownIcon className='h-4 w-4'/>
                <span className=''>Sort By</span>
              </Button>
            </DropdownMenuTrigger>

            {/* DropDown Sort */}
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {
                  sortOptions.map(sortItem=>(
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                  ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>

          </DropdownMenu>
          </div>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3'>
          {
            allProduct && allProduct.length > 0 ?
            allProduct.map((product,index) => (
              <ShoppingProductTile product={product} key={index}/>
            )) : null
          }
        </div>

      </div>
    </div>
  )
}
