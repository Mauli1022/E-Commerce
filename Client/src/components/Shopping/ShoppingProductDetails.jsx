// Component to display product Details
import { StarIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, fetchCartItems } from "../../store/cart-slice/index.js"
import { useToast } from "../Common/hooks/use-toast"

export default function ShoppingProductDetails({ 
    open, 
    setOpen, 
    productDetails,
    
 }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { toast } = useToast()
      // Function to handle Add to cart functionality
  function handleAddToCart(getCurrentProductId){
    console.log(getCurrentProductId);
    
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

  console.log(productDetails);
  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-2 max-w-[90vw]  sm:max-w-[80vw] lg:max-w-[70vw] ">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <DialogTitle className="text-3xl font-extrabold font-serif">{productDetails?.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground font-serif text-1xl mb-5 mt-2">{productDetails?.description}</DialogDescription>
                    </div>

                    <div className="flex items-center justify-between font-sans">
                        <span className="flex gap-1 font-bold">
                            <p className="text-1xl font-serif text-muted-foreground"> Original Price : $ </p>
                            <p className={`${productDetails?.salePrice > 0 ? "line-through " : ""} text-3xl font-bold text-primary  font-mono `}>{productDetails?.price}</p>
                        </span>

                        <span className="flex gap-1 font-bold mr-1">
                            {
                                productDetails?.salePrice > 0 ?
                                    <>
                                        <p className="text-1xl font-serif ">Sale Price : $</p>
                                        <p className="text-2xl font-bold ">{productDetails?.salePrice}</p>
                                    </>
                                    : null
                            }
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">{4.5}</span>
                    </div>

                    <div className="mt-5 mb-5">
                        <Button className="w-full" onClick={()=>handleAddToCart(productDetails?._id)}>Add To Cart</Button>
                    </div>
                    <Separator className="border-gray-800 mt-3" />

                    <div className="maxh-[300px] overflow-auto">

                        <h2 className="text-xlfont-bold mb-4 font-serif">Reviews</h2>
                        <div className="grid gap-6 overflow-y-auto">
                            <div className="flex gap-4 overflow-auto">
                                <Avatar className="w-10 h-10 border font-serif">
                                    <AvatarFallback>VP</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 ">
                                    <div className="flex items-center gap-2">
                                        <h3 className="flex items-center gap-2 font-serif font-bold">Vishal Palke</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    {/* Comment User want to  */}
                                    <p className=" text-muted-foreground font-serif">This is An Awsome Product</p>
                                </div>
                            </div>

                        </div>

                        <div className="flex mt-6 gap-2">
                            <Input placeholder="Write a review.." />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
                {/* <DialogDescription>This is Product Description</DialogDescription> */}
            </DialogContent>
        </Dialog>
    )
}
