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
                        title: data?.payload?.message || "Review Added Successfully"
                    })
                } else {
                    toast({
                        title: data?.payload?.message || "You Can Only Add One Review.",
                        variant: "destructive"
                    })
                    setRating(0);
                    setReviewMessage("")
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
                className="h-[80vh] grid gap-8 p-10 max-w-[90vw] overflow-y-auto rounded-md
                           sm:grid-cols-1 sm:overflow-y-auto 
                           md:h-[500px]
                           lg:h-[570px] lg:grid-cols-2

                           [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                         dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-crollbar-thumb]:m-2
                          [&::-webkit-scrollbar-track]:rounded-full
                           "
            >
                {/* <div className="relative h-20"> */}
                <img src={productDetails?.image} alt={productDetails?.title}
                    className="w-full h-auto object-cover rounded-lg"
                />


                {/* Main div */}
                <div className="max-h-full">
                    <>
                        {/* second section */}
                        <div>
                            <DialogTitle className="font-extrabold font-serif 
                            lg:text-3xl
                            sm:text-sm">
                                {productDetails?.title}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground font-serif mb-5 mt-2
                            lg:text-2xl
                            sm:text-xs
                            ">
                                {productDetails?.description}
                            </DialogDescription>
                        </div>

                        {/* Third Section */}
                        <div className="flex items-center gap-0 justify-between font-sans
                        lg:flex-row lg:text-lg
                        sm:flex-col ">
                            <span className="flex gap-1 lg:font-bold">
                                <p className="lg:text-1xl font-serif text-muted-foreground"
                                > Original Price : $ </p>
                                <p className={`lg:text-2xl font-bold font-mono ${productDetails?.salePrice < productDetails?.price ? "line-through" : ""} `}>
                                    {productDetails?.price}
                                </p>
                            </span>

                            <span className="flex gap-1 lg:font-bold">
                                {
                                    productDetails?.salePrice > 0 && productDetails?.salePrice < productDetails?.price ?
                                        <>
                                            <p className="lg:text-1xl font-serif text-muted-foreground ">Sale Price : $</p>
                                            <p className="lg:text-2xl font-bold font-mono">{productDetails?.salePrice}</p>
                                        </>
                                        : null
                                }
                            </span>
                        </div>

                        {/* fourt section */}
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-0.5">
                                <ProductRating rating={averageReview} />
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
                    [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                    [&::-webkit-crollbar]:rounded-md
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
                                                    <h3 className="font-bold font-serif">{item.userName}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <ProductRating rating={item?.reviewValue} />
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {item.reviewMessage}
                                                </p>
                                            </div>
                                        </div>

                                    )) : <h1 className="font-serif">No Reviews</h1>
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
