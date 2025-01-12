import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import ImageUploadComponent from "../../components/Admin/ImageUploadComponent"
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/Common/hooks/use-toast";

// Async thunk
import { addFeatureImage, getFeatureImage, deleteFeatureImage } from "../../store/common-slice/commonSlice.js"


export default function AdminDashBoard() {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const dispatch = useDispatch();
  const { images } = useSelector(state=>state.commonFeature)
  const { toast } = useToast()

  function handleUploadFeatureImage(){
    dispatch(addFeatureImage(uploadedImageUrl))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(getFeatureImage())
        setImageFile(null)
        setUploadedImageUrl("")
      }
    })
  }

  function handleDeleteImage(id){
    dispatch(deleteFeatureImage(id))
    .then((data)=>{
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message 
        })
        dispatch(getFeatureImage())

      }
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImage())
  },[dispatch])
  // console.log(images);
  

  return (
    <div>
      {/* <h1> Upload Feature Images </h1> */}
      <ImageUploadComponent
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
      // if this value present then disable the image upload input field
      // isEditedMode={currentEditedId !== null}
        isCustomStyling={true}
      />
      <Button className="mt-2 w-full" onClick={handleUploadFeatureImage}>Upload</Button>
      {/* delete functionality */}
      <div className="flex flex-col gap-3 mt-5">
        {
          images && images.length > 0 ?
          images.map((singleImages)=>{
            return (
              <div key={singleImages?._id}
              className="relative m-2 group"
              >
                <img src={singleImages?.image}
                className="w-full h-[300px] object-cover rounded-sm "
                />
                <Button
                className="absolute top-4 right-4 bg-transparent text-3xl  text-orange-300 border border-orange-300
                hover:text-red-500 hover:border-red-500 hover:bg-transparent
                border-transparent rounded-md font-serif"
                onClick={()=>handleDeleteImage(singleImages?._id)}
                >X</Button>
              </div>
            )
          }) : null
        }
      </div>
    </div>
  )
}
