// Component to display product Details
import { RatioIcon, StarIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, fetchCartItems } from "../../store/cart-slice/index.js"
import { useToast } from "../Common/hooks/use-toast"
import { setProductDetails } from "../../store/Shop/shoppingProductSlice.js"
import ProductRating from "../../components/Common/ProductRating"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"

// Async Thunk 
import { createReview, fetchReview } from "../../store/review-slice/productReviewSlice.js"

export default function ShoppingProductDetails({
    open,
    setOpen,
    productDetails,
}) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shoppingCart)
    const { reviews } = useSelector(state => state.producrReview)
    const { toast } = useToast()

    // state variable to handle review messagge
    const [reviewMessage, setReviewMessage] = useState("")
    const [rating, setRating] = useState(0);

    function handleRatingChange(getRating) {
        setRating(getRating)
    }
    function handleAddReview() {
        dispatch(createReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMessage,
            reviewValue: rating
        }))
            .then((data) => {
                if (data?.paload?.success) {
                    setRating(0);
                    setReviewMessage("")
                    dispatch(fetchReview(productDetails?._id))
                    toast({
                        title: "Review Added Succssfully."
                    })
                }
            })
    }

    // Function to handle Add to cart functionality
    function handleAddToCart(getCurrentProductId, getTotalStock) {

        // Logic to check and allow user to add only number of items that are in the stock
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

    function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails())
    }

    useEffect(() => {
        if (productDetails !== null) {
            dispatch(fetchReview(productDetails?._id))
        }
    
    }, [productDetails])

    const averageReview = reviews && reviews.length > 0 ? 
     reviews.reduce((sum, reviewItem) => 
        sum + reviewItem.reviewValue, 0) / reviews.length :
     0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent
                className="grid grid-cols-2 gap-8 sm:p-2 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[650px]">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>

                {/* Main div */}
                <div className="max-h-full">
                    <>
                        {/* second section */}
                        <div>
                            <DialogTitle className="text-3xl font-extrabold font-serif">
                                {productDetails?.title}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground font-serif text-1xl mb-5 mt-2">
                                {productDetails?.description}
                            </DialogDescription>
                        </div>

                        {/* Third Section */}
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

                        {/* fourt section */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-0.5">
                                <ProductRating rating={averageReview}/>
                            </div>
                            <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
                        </div>

                        {/* fifth section */}
                        <div className="mt-5 mb-5">
                            {
                                productDetails?.totalStock === 0 ?
                                    (<Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>) :
                                    (<Button className="w-full" onClick={() => 
                                    handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                                    >
                                        Add To Cart
                                    </Button>)
                            }
                        </div>
                    </>
                    <Separator className="border-gray-800 mt-3" />

                    {/* sixth section */}
                    <div className="max-h-44 p-2 overflow-auto
                    [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                    ">

                        <h2 className="text-xlfont-bold mb-4 font-serif">Reviews</h2>

                        {/* User Review */}
                        {/* div to hold add review */}
                        {/* <div className="grid gap-6 border border-black rounded-sm p-4"> */}
                        <div className="overflow-y-auto max-h-40 
                            [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                            p-4 ">

                            {/* User Review */}
                            {
                                reviews && reviews.length > 0 ?
                                    reviews.map((item) => (

                                        <div className="flex gap-4">
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>
                                                    {item.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold">{item.userName}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <ProductRating rating={item?.reviewValue} />
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {item.reviewMessage}
                                                </p>
                                            </div>
                                        </div>

                                    )) : <h1>No Reviews</h1>
                            }


                        </div>

                        <div className="flex flex-col mt-6 gap-2 font-serif">
                            <Label>Write a Review</Label>
                            <div className="flex gap-1">
                                <ProductRating
                                    handleRatingChange={handleRatingChange}
                                    rating={rating}
                                />
                            </div>
                            <Input
                                placeholder="Write a review.."
                                name='reviewMessage'
                                value={reviewMessage}
                                onChange={(event) => setReviewMessage(event.target.value)}
                            />
                            <Button
                                disabled={reviewMessage.trim() === ""}
                                onClick={handleAddReview}
                            >Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
