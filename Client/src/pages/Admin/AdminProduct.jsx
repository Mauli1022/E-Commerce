import React, { useEffect, useState } from 'react'
import ProductTile from "../../components/Admin/ProductTile"
import ImageUploadComponent from "../../components/Admin/ImageUploadComponent"
import { Button } from '@/components/ui/button'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet"
import Form from '@/components/Common/Form';
import { addProductFormElements } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
// toast
import { useToast } from '@/components/Common/hooks/use-toast.js'
// Thunk
import { 
  addNewProduct, 
  fetchAllProduct, 
  updataAProduct, 
  deleteProduct 
} from "../../store/Admin/Product-Slice/productSlice.js"

export default function AdminProduct() {
  const [openCreateProductDialogs, setOpenCreateProductsDialogs] = useState(false);
  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''
  }
  // State Variable to store all the information about the product
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  // state Variable to store currently Updated Product 
  const [currentEditedId,setCurrentEditedId] = useState(null)
  
  // productList contain all the product that Admin Storing 
  const { productList } = useSelector(state => state.adminProduct)
  const { toast } = useToast()
  const dispatch = useDispatch()

  // Function to disable the add or edit button when some 
  // input fields are empty
  function isFormValid(){
    return Object.keys(formData)
    .map(key => formData[key] !== '')
    .every(item => item)
  }

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null ?
    dispatch(updataAProduct({
      id : currentEditedId, 
      formData : formData
    }))
    .then(data => {
      if(data?.payload?.success){
        dispatch(fetchAllProduct())
        setCurrentEditedId(null)
        setFormData(initialFormData)
        toast({
          title: 'Product Updated Successfully.'
        })
        setOpenCreateProductsDialogs(false)
      }
    })
     :
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    }))
      .then((data) => {
        console.log(data)
        if (data?.payload.success) {
          dispatch(fetchAllProduct())
          setImageFile(null)
          setFormData(initialFormData)
          toast({
            title: 'Product Added Successfully.'
          })
          setOpenCreateProductsDialogs(false)
        }
      })
  }

  // Function to Handle Delete button 
  // Which delete a product based on products id

  function handleDelete(getCurrentProductId){
    // console.log(getCurrentProductId);
    
    dispatch(deleteProduct(getCurrentProductId))
    .then(data=>{
      // console.log(data.payload);
      if(data?.payload?.success){
        dispatch(fetchAllProduct())
        toast({
          title: data?.payload?.message
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])
// console.log(currentEditedId);


  return (
    <>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={() => setOpenCreateProductsDialogs(true)}>Add New Product</Button>
      </div>


      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-3 cursor-pointer'>
        {
          productList && productList.length > 0 ?
            productList.map((productItem,index) => {
              return (<ProductTile 
                key={index} 
                product={productItem}
                // variable to update the Product which stores product Id
                // currentEditedId={currentEditedId}
                setCurrentEditedId={setCurrentEditedId}
                // Variable To open Sheet Component(which Form Component)
                setOpenCreateProductsDialogs={setOpenCreateProductsDialogs}
                setFormData={setFormData}
                handleDelete={handleDelete}
                />)
            }) : null
        }
      </div>

      <Sheet 
      open={openCreateProductDialogs} 
      onOpenChange={() => {
        setOpenCreateProductsDialogs(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side='right' className="overflow-auto">
          <>
            <SheetHeader>
              <SheetTitle>
                {
                  currentEditedId !== null ? 'Edit Product' : "Add New Product"
                }
              </SheetTitle>
            </SheetHeader>
          </>

          <ImageUploadComponent
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            // if this value present then disable the image upload input field
            isEditedMode={currentEditedId !== null}
          />

          <div className='py-6' >
            <Form
              formContols={addProductFormElements}
              formData={formData}
              buttonText={currentEditedId !== null ? "Edit" : "Add New Product"}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>

        </SheetContent>
      </Sheet>
    </>
  )
}
