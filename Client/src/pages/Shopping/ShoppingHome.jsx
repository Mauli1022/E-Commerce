import React, { useEffect, useState } from 'react'
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"

import { Button } from "../../components/ui/button"
import {
  AirplayIcon,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  FootprintsIcon,
  HeaterIcon,
  ImagesIcon,
  ShirtIcon,
  ShoppingBasketIcon,
  WashingMachineIcon,
  Watch
} from 'lucide-react'

import { Card, CardContent } from "../../components/ui/card"
// Async Thunk
import { fetchAllShoppingProducts, fetchProductDetails } from "../../store/Shop/shoppingProductSlice.js"
import { addToCart, fetchCartItems } from "../../store/cart-slice/index.js"
import { getFeatureImage } from "../../store/common-slice/commonSlice.js"

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/Common/hooks/use-toast'

// Components
import ShoppingProductTile from '../../components/Shopping/ShoppingProductTile'
import ShoppingProductDetails from "../../components/Shopping/ShoppingProductDetails"



const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
  // { id: "electronics", label: "Electronics" , icon : Laptop2Icon},
]

const brandWithIcon = [
  { id: "nike", label: "Nike", icon:HeaterIcon },
  { id: "adidas", label: "Adidas", icon:ImagesIcon },
  { id: "puma", label: "Puma", icon:ShoppingBasketIcon },
  { id: "levi", label: "Levi's", icon:WashingMachineIcon },
  { id: "zara", label: "Zara", icon:AirplayIcon },
  { id: "h&m", label: "H&M",icon:Watch },
]

export default function ShoppingHome() {

  // const slides = [bannerOne, bannerTwo, bannerThree]
  const [openDetailsDialog, setOpenDialogs] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { allProduct,productDetails } = useSelector(state => state.shopProduct)
  const { user } = useSelector(state=>state.auth);
  const { images } = useSelector(state=>state.commonFeature)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { toast } = useToast();

  // Check This on Chatgpt
  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem("filters")
    const currentFilter = {
      [ section ] : [getCurrentItem.id]
    }

    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate("/shop/listing")
  }

  function handleGetProductDetails(getCurrentProductId){
    // console.log(getCurrentProductId);
    
    dispatch(fetchProductDetails(getCurrentProductId))    
  }

  function handleAddToCart(getCurrentProductId){
    
    dispatch(addToCart({
      userId : user.id,
      productId : getCurrentProductId,
      quantity : 1
    }))
    .then(data=>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title : data?.payload?.message
        })
      }
    })
    .catch(error=>console.error(error))
  }

  // Change the slide Automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [images])
  // useEffect to fetch All Product
  useEffect(() => {
    dispatch(fetchAllShoppingProducts({ filterParams: {}, sortParams: "price-lowtohigh" }))
  }, [dispatch])
  // console.log(allProduct);

  useEffect(()=>{
    if(productDetails !== null){
      setOpenDialogs(true)
    }
  },[productDetails])

    useEffect(()=>{
      dispatch(getFeatureImage())
    },[dispatch])
  
  return (
    <div className='flex flex-col min-h-screen'>

      <div className='relative w-full h-[500px] overflow-hidden'>
        {
          images && images.length ?
          images.map((slide, index) => {
            return (
              <div className=' ' key={index}>
              <img src={slide.image} alt={`banner-${index}`} 
                className={`${index === currentSlide ? "opacity-100 " : "opacity-0"} 
                absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />
              </div>
            )
          }) : null
        }
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -transy1/2 bg-white/80"
          onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + images.length) % images.length)}
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -transy1/2 bg-white/80"
          onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % images.length)}
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Button>

      </div>

      <section className='py-12 bg-gray-50 mr-5 ml-5'>
        <div className='container mx-auto px-4'>
          <h2 className='font-serif text-3xl font-bold text-center mb-8'>Shop By Category</h2>
        </div>
          <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4 '>
            {
              categoriesWithIcon.map(item => (
                <Card 
                className="cursor-pointer hover: shadow-lg transition-shadow items-center justify-center flex" 
                key={item.id}
                onClick={()=>handleNavigateToListingPage(item, 'category')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <item.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold font-serif'>{item.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
      </section>

      <section className='py-12 bg-gray-50 mr-5 ml-5 '>
        <div className='container mx-auto px-4 '>
          <h2 className='font-serif text-3xl font-bold text-center mb-8'>Shop By Brand</h2>
        </div>
          <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-6 gap-4 '>
            {
              brandWithIcon.map(item => (
                <Card className="cursor-pointer hover: shadow-lg transition-shadow items-center justify-center flex" 
                key={item.id}
                onClick={()=>handleNavigateToListingPage(item, 'brand')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <item.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold font-serif'>{item.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
      </section>

      <section className='py-12 '>
      <div className='container mx-auto px-4'>
          <h2 className='font-serif text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              allProduct && allProduct.length > 0 ?
              allProduct.map((productItem,index)=>
              <ShoppingProductTile 
              product={productItem} 
              key={index}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
              />)
              : null
            }
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ShoppingProductDetails 
      open={openDetailsDialog} 
      setOpen={setOpenDialogs} 
      productDetails={productDetails} 
      />


    </div>
  )
}
