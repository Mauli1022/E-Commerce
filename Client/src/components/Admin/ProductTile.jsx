// Component to display single product in Tile Format

import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function ProductTile({ product }) {
    return (
        <Card className="w-full max-w-sm mx-auto" >
            <div>
                <div className='relative'>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[300px] object-contain rounded-lg"
                    />
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold mb-2 mt-2 '>{product?.title}</h2>
                    <div className='flex justify-between items-center'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ""}text-lg font-semibold text-primary `}>
                            ${product.price}
                        </span>
                        {
                            product?.salePrice > 0 ? (
                                <span className='text-lg font-bold'>
                                    ${product?.salePrice}
                                </span>
                            ) : null
                        }

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}
