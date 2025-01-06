import React from 'react'
import { useState, useEffect } from "react"
import { Input } from "../../components/ui/input"
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Async Thunk
import { searchResultThunk } from "../../store/search-slice/searchSlice.js"
import { resetSearchResults } from "../../store/search-slice/searchSlice.js"
import { fetchCartItems, addToCart } from "../../store/cart-slice/index.js"
import { fetchProductDetails } from "../../store/Shop/shoppingProductSlice.js"
import ShoppingProductTile from '../../components/Shopping/ShoppingProductTile'
import { useToast } from '@/components/Common/hooks/use-toast'

// Component
import ShoppingProductDetails from "../../components/Shopping/ShoppingProductDetails"

export default function SearchProducts() {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchResults } = useSelector(state => state.searchProduct)
  const { cartItems } = useSelector(state=>state.shoppingCart)
  const { user } = useSelector(state=>state.auth)
  const { productDetails } = useSelector(state=>state.shopProduct)
  const { toast } = useToast()
  // console.log(cartItems);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  function handleGetProductDetails(getCurrentProductId) {
      dispatch(fetchProductDetails(getCurrentProductId))
    }
  
  function handleAddToCart(getCurrentProductId, getTotalStock) {
  
      let getCartItems = cartItems.items || []
      if(getCartItems.length){
        const indexOfCurrentItem = getCartItems.findIndex(item=>item.productId === getCurrentProductId)
        
        if(indexOfCurrentItem > -1){
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
         
          if(getQuantity + 1 > getTotalStock ){
            toast({
              title : `Only ${getQuantity} Quantity Can be added for this Item `,
              variant : 'destructive'
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
  

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(searchResultThunk(keyword))
      }, 1000)
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
      dispatch(resetSearchResults())
    }

  }, [keyword])

  useEffect(() => {
    
      if (productDetails !== null) {
        setOpenDetailsDialog(true)
      }
    }, [productDetails])


  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
        <div className='w-full flex items-center'>
          <Input
            placeholder='Search Products..'
            className="py-6"
            value={keyword}
            name={'keyword'}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>

      {
        !searchResults.length > 0 ?
          (<h1 className=' text-5xl font-extrabold'>No Result Found..</h1>) : null
      }
      {
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 font-serif'>
          {
            searchResults.map(item => <ShoppingProductTile 
              product={item} 
              key={item?._id}
              handleAddToCart={handleAddToCart}
              handleGetProductDetails={handleGetProductDetails}

               />)
          }
        </div>
      }
       <ShoppingProductDetails
              open={openDetailsDialog}
              setOpen={setOpenDetailsDialog}
              productDetails={productDetails}
        />
    </div>

    
  )
}
