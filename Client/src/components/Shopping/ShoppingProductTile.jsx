import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { categoryOptionsMap, brandOptionsMap } from "../../config/index.js"


export default function ShoppingProductTile({ product }) {
    return (
        <Card className="w-full max-w-sm mx-auto">

            <div>
                <div className='relative'>
                    <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-[150px] object-fill rounded-t-lg'
                    />
                    {
                        product?.salePrice > 0 ?
                            <Badge className={"absolute top-2 left-2 bg-red-500 hover:bg-red-700"}>Sale</Badge> : null
                    }
                </div>

                <CardContent className="">
                    <h1 className='text-xl font-bold mb-2'>{product.title}</h1>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-[18px] text-muted-foreground'>
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className='text-[18px] text-muted-foreground'>
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>

                    <div className='flex justify-between items-center mb-2'>
                        <span className={` ${product.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>{product?.price}</span>
                        {/* <span className='text-lg font-semibold text-primary'>{product?.salePrice}</span> */}
                        {
                            product?.salePrice > 0 ?  <span className='text-lg font-semibold text-primary'>
                                {product?.salePrice}
                                </span> : null
                        }
                    </div>
                </CardContent>

                <CardFooter className="">
                    <Button className="w-full">
                        Add To Cart
                    </Button>

                </CardFooter>
            </div>

        </Card>
    )
}
