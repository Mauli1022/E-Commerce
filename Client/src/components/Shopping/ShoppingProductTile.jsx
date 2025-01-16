import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { categoryOptionsMap, brandOptionsMap } from "../../config/index.js"


export default function ShoppingProductTile({
    product,
    handleGetProductDetails,
    handleAddToCart
}) {


    return (
        <Card className="w-[260px] max-w-sm mx-auto">

            <div onClick={() => handleGetProductDetails(product._id)} className='hover:cursor-pointer'>
                <div className='relative'>
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className='w-full h-[150px] object-cover rounded-t-lg'
                    />
                    {
                        product?.totalStock === 0 ?
                            (<Badge className={"absolute top-2 left-2 bg-red-500 hover:bg-red-700"}>
                                Out Of Stock
                            </Badge>) : product?.totalStock < 10 ?
                                (<Badge className={"absolute top-2 left-2 bg-red-500 hover:bg-red-700"}>
                                    {`Only ${product?.totalStock} Items Left`}
                                </Badge>) : product?.salePrice < product?.price ?
                                    (<Badge className={"absolute top-2 left-2 bg-red-500 hover:bg-red-700"}>
                                        Sale
                                    </Badge>) : null
                    }
                </div>

                <CardContent className="h-30">
                    <h1 className='text-lg font-bold mb-2 font-serif h-8'>{product.title}</h1>
                    <div className='flex justify-between items-center mb-2 h-12 pt-2'>
                        <span className='text-[18px] text-muted-foreground font-serif'>
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className='text-[18px] text-muted-foreground font-serif'>
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>

                    <div className='flex justify-between items-center mb-2'>
                        <span className={` ${product.salePrice < product?.price ? "line-through text-red-300" : ""} text-[20px] text-primary font-mono`}>
                            Price:${product?.price}
                        </span>
                        {
                           product?.price > product?.salePrice? <span className='text-[20px] text-primary lining-nums font-mono'>
                               Sale:${product?.salePrice}
                            </span> : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter className="">
                {
                    product?.totalStock === 0 ?
                        (<Button className="w-full opacity-50 cursor-not-allowed" disabled>
                            Out Of Stock
                        </Button>)
                        :
                        (<Button className="w-full" onClick={() => handleAddToCart(product?._id, product?.totalStock)}>
                            Add To Cart
                        </Button>
                        )
                }
            </CardFooter>

        </Card>
    )
}
