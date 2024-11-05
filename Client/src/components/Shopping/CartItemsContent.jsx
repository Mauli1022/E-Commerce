import React from 'react'
import { Button } from '../ui/button'
import {
  Minus,
  Plus,
  Trash
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
// import Async Thunk
import { deleteCartItem, updateCartItems } from "../../store/cart-slice/index.js"
import { useToast } from '../Common/hooks/use-toast'

export default function CartItemsContent({ item }) {
  // console.log(item);
  const { user } = useSelector(state => state.auth)
  const { toast } = useToast()

  const dispatch = useDispatch()
  function handleProductItem() {
    dispatch(
      deleteCartItem({
        userId: user.id,
        productId: item.productId
      }))
      .then(data => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message
          })
        }
      })
  }
  // Function to handle update quantity
  function handleUpdateQuantity(getCartItem,typeOfAction){
    dispatch(updateCartItems(
      {
        userId : user?.id,
        productId : getCartItem?.productId,
        quantity :  
        typeOfAction === "plus" ?
        getCartItem?.quantity + 1 : getCartItem?.quantity -1
      }
    ))
    .then((data)=>{
      if(data?.payload?.success){
        toast({
          title : "Cart Item Updated Successfully."
        })
      }
    })
  }
  return (
    <div className='flex items-center space-x-4'>
      <img src={item?.image} alt={item?.title} className='w-20 h-20 rounded object-cover' />
      <div className='flex-1'>
        <h3 className='font-extrabold font-serif'>{item?.title}</h3>
        <div className='flex items-center mt-1 gap-2'>
          <Button 
          className="h-8 w-8 rounded-full" 
          variant="outline" 
          size="icon"
          onClick={()=>handleUpdateQuantity(item,"plus")}
          >
            <Plus className='w-4 h-4' />
            <span className='sr-only font-semibold'>Increase</span>
          </Button>

          <span className='font-serif '>{item?.quantity}</span>

          <Button 
          className="h-8 w-8 rounded-full" 
          variant="outline" 
          size="icon"
          onClick={()=>handleUpdateQuantity(item,"minus")}
          disabled={item?.quantity === 1}
          >
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold font-serif'>
          ${((item?.salePrice > 0 ? item.salePrice : item.salePrice) * item?.quantity).toFixed(2)}
        </p>
        <Trash
          className='cursor-pointer mt-1'
          size={20}
          onClick={handleProductItem}
        />
      </div>
    </div>
  )
}
