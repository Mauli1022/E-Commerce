import React from 'react'
import { Button } from '../ui/button'
import { StarIcon, Star } from 'lucide-react'

export default function ProductRating({
  rating,
  handleRatingChange,
}) {
  
  return (
    
        [1,2,3,4,5].map((star,index)=>(
        <Button
        variant="outline" 
        size="icon"
        className={`p-2 rounded-full transition-colors  
          ${star <= rating ? 'text-yellow-500 hover:bg-black' : 
          'text-black hover:bg-primary hover:text-primary-foreground'} `}
          onClick={handleRatingChange ? ()=>handleRatingChange(star) :  null }
          key={index}
        >
            <Star 
            className={`w-6 h-6 fill-secondary ${star <= rating ?
              'fill-yellow-500 ' : "fill-secondary"
            }`}
            />
        </Button>))
  )
}
