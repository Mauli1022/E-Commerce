import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import ImageUploadComponent from "../../components/Admin/ImageUploadComponent"
import { useDispatch, useSelector } from "react-redux";

// Async thunk
import { addFeatureImage, getFeatureImage } from "../../store/common-slice/commonSlice.js"

export default function AdminDashBoard() {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const dispatch = useDispatch();
  const { images } = useSelector(state=>state.commonFeature)

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
              className="relative m-2">
                <img src={singleImages?.image}
                className="w-full h-[300px] object-cover rounded-sm"
                />
              </div>
            )
          }) : null
        }
      </div>
    </div>
  )
}
