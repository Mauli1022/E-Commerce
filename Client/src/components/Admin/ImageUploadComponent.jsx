import React from 'react'
import { Label } from '../ui/label'
// import { Input } from 'postcss'

export default function ImageUploadComponent() {
  return (
    <div className='w-full max-w-md mx-auto'>
        <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
        <div className=''>
          {/* <Input id="image-upload" type='file' className='hidden'/> */}
        </div>
    </div>
  )
}
