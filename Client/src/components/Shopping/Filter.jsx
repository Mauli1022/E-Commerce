import React, { Fragment } from 'react'
import { filterOptions } from "../../config/index.js"
import { Label } from '../ui/label.jsx'
import { Checkbox } from '../ui/checkbox.jsx'
import { Separator } from "../ui/separator.jsx"

export default function Filter({ filters, handleFilter }) {
    return (
        <div className='bg-background rounded-lg shadow-sm'>

            <div className='p-4 border-b'>
                <h2 className='text-lg font-extrabold'>Filter</h2>
            </div>

            <div className='p-4 space-y-4 '>
                {
                    Object.keys(filterOptions)
                        .map((keyItem, index) => <Fragment key={index}>
                            <div >
                                <h3 className='text-base font-bold'>{keyItem}</h3>

                                <div className='grid gap-2 mt2'>
                                    {
                                        filterOptions[keyItem].map((options, index) => (
                                            <Label key={index} className="flex items-center gap-2 font-medium">
                                                <Checkbox
                                                checked={
                                                    filters && Object.keys(filters).length > 0 && 
                                                    filters[keyItem] && filters[keyItem].indexOf(options.id) > -1
                                                } 
                                                onCheckedChange={()=>handleFilter( keyItem, options.id )} 
                                                />
                                                {options.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            <Separator />
                        </Fragment>)
                }
            </div>
        </div>
    )
}
