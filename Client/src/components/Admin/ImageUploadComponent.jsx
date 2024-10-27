import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { FileIcon } from 'lucide-react'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

export default function ImageUploadComponent({ 
  imageFile, 
  setImageFile, 
  // uploadedImageUrl, 
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditedMode 
}) {

  const inputRef = useRef(null)

  function handleImageFileChange(e){
    // console.log(e.target.files);
    const selectedFile = e.target.files?.[0]

    if (selectedFile)setImageFile(selectedFile)
    
  }
  function handleDragOver(e){
    e.preventDefault();

  }
  function handleDrop(e) {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile)
  }
function handleRemoveImage(){
  setImageFile(null)
  if(inputRef.current){
    inputRef.current.value = ''
  }
}
// console.log("upload Image Url",uploadedImageUrl);

async function uploadImageToCloudinary(){
  setImageLoadingState(true)
  const data = new FormData()
  data.append("my_file",imageFile)
  await axios.post("http://localhost:8000/api/admin/upload-image",data)
  .then(response=>{
    if(response.data?.success){ 
      setUploadedImageUrl(response.data.data.url) 
      setImageLoadingState(false)
    }

  })
  .catch(
    error=>console.error(error)
  )
}

// call the uploadImageToCloudinary when admin selects a image/file
// and store it on cloudinary
useEffect(()=>{
if(imageFile !==null ) uploadImageToCloudinary()
},[imageFile])

// console.log(isEditedMode);


  return (
    <div className='w-full max-w-md mx-auto'>
      <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
      <div 
      className={`border-2 border-dashed rounded-lg p-4 mt-4 ${isEditedMode ? "opacity-20": ""}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      >
        <Input
          id='image-upload'
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditedMode}
        />
        {
          !imageFile ? (
          <Label htmlFor="image-upload" className={`${isEditedMode ? 'cursor-not-allowed' : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
            <span>Drag & Drop or Click To Upload Image</span>
          </Label>
          ) : (
            imageLoadingState ? <Skeleton className={"h-10 bg-gray-100"}/> :
            <div className='flex items-center justify-between'>

            <div className='flex items-center'>
              <FileIcon className="w-8 text-primary mr-2 h-8"/>
            </div>

              <p className='text-sm font-medium'>{imageFile.name}</p>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                <XIcon className='w-4 h-4'/>
                <span className='sr-only'>Remove File</span>
              </Button>

          </div>
          )}
      </div>
    </div>
  )
}
