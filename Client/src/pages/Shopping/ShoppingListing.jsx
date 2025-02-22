import React, { useEffect, useState } from 'react'
import Filter from "../../components/Shopping/Filter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from "../../config/index.js"
import { useDispatch, useSelector } from 'react-redux'

// Thunk
import { fetchAllShoppingProducts, fetchProductDetails } from "../../store/Shop/shoppingProductSlice.js"
import { addToCart, fetchCartItems } from "../../store/cart-slice/index.js"

import ShoppingProductTile from '../../components/Shopping/ShoppingProductTile'
import ShoppingProductDetails from '../../components/Shopping/ShoppingProductDetails'
import { useSearchParams } from 'react-router-dom'
import { useToast } from '@/components/Common/hooks/use-toast'


function createSearchParamsHelper(filtersParams) {
  const queryParams = []

  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join('&')
}

export default function ShoppingListing() {

  const dispatch = useDispatch();
  // get the userId from the Auth-Slice
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shoppingCart)

  const { allProduct, productDetails } = useSelector(state => state.shopProduct)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDialogs] = useState(false)
  const { toast } = useToast()

  // const categorySearchParams = searchParams.get('category')

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCorrentOption) {

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCorrentOption]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCorrentOption)

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCorrentOption)
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters)

    // when we refresh the page we need to get all the previous value in category brand 
    // so we stores it in sessionStorage 
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))

  }

  // function to get product Id
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }
  // Function to handle Add to cart functionality
  function handleAddToCart(getCurrentProductId, getTotalStock) {

    let getCartItems = cartItems.items || []
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} Quantity Can be added for this Item `,
            variant: 'destructive'
          })
          return;
        }
      }
    }

    dispatch(addToCart({
      userId: user.id,
      productId: getCurrentProductId,
      quantity: 1
    }))
      .then(data => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id))
          toast({
            title: data?.payload?.message
          })
        }
      })
      .catch(error => console.error(error))
  }

  const categorySearchParams = searchParams.get('category')
  useEffect(() => {
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [categorySearchParams])

  // Fetch List of Product
  useEffect(() => {

    if (filters !== null && sort !== null)
      dispatch(fetchAllShoppingProducts({ filterParams: filters, sortParams: sort }))
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDialogs(true)
    }
  }, [productDetails])


  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <Filter filters={filters} handleFilter={handleFilter} />

      <div className='bg-background w-full rounded-lg shadow-sm '>
        <div className='p-4 border-b flex items-center justify-between '>
          <h2 className=' text-lg font-extrabold mr-2'>All Product</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{allProduct?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span className=''>Sort By</span>
                </Button>
              </DropdownMenuTrigger>

              {/* DropDown Sort */}
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => (
                      <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>
          </div>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-3
                          h-96 overflow-y-auto pt-2
                          [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                         dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-crollbar-thumb]:m-2
                          [&::-webkit-scrollbar-track]:rounded-full
        '>
          {
            allProduct && allProduct.length > 0 ?
              allProduct.map((product, index) => (
                <ShoppingProductTile
                  product={product}
                  key={index}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              )) : null
          }
        </div>

      </div>

      {/* Product Details Component */}
      <ShoppingProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDialogs}
        productDetails={productDetails}
      />
    </div>
  )
}
