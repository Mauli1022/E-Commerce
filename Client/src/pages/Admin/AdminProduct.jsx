import React, { useEffect, useState } from 'react'
import ProductTile from "../../components/Admin/ProductTile"
import ImageUploadComponent from "../../components/Admin/ImageUploadComponent"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Form from '@/components/Common/Form';
import { addProductFormElements } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
// toast
import { useToast } from '@/components/Common/hooks/use-toast.js'
// Thunk
import { addNewProduct, fetchAllProduct } from "../../store/Admin/Product-Slice/productSlice.js"

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
  // productList contain all the product that Admin Storing 
  const { productList } = useSelector(state => state.adminProduct)
  const { toast } = useToast()
  const dispatch = useDispatch()
  function onSubmit(e) {
    e.preventDefault();
    // console.log(formData);
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
  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])


  return (
    <>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={() => setOpenCreateProductsDialogs(true)}>Add New Product</Button>
      </div>


      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-2 cursor-pointer'>
        {
          productList && productList.length > 0 ?
            productList.map((productItem,index) => {
              return (<ProductTile key={index} product={productItem} />)
            }) : null
        }
      </div>

      <Sheet open={openCreateProductDialogs} onOpenChange={() => {
        setOpenCreateProductsDialogs(false)
      }}>
        <SheetContent side='right' className="overflow-auto">
          <>
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
          </>

          <ImageUploadComponent
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />

          <div className='py-6' >
            <Form
              formContols={addProductFormElements}
              formData={formData}
              buttonText={'Add'}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />
          </div>

        </SheetContent>
      </Sheet>
    </>
  )
}
