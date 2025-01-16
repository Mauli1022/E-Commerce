import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addressFormControls } from "../../config/index.js"
// Shadcn Ui
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '../ui/card'

// Component
import Form from '../Common/Form'
// Async Thunk
import { addAddress, fetchAllAddress, deleteAddress, updateAddress } from "../../store/address-slice/index.js"
import { useToast } from '../Common/hooks/use-toast.js'
import AddressCard from './AddressCard.jsx'


export default function Address({ setCurrentSelectedAddress, selectedId }) {

    const initialState = {
        address : "",
        city : "",
        phone : "",
        notes : "",
        pincode : ""
    }
    const [ formData,setFormData ] = useState(initialState)
    const [currentEditedId,setCurrentEditedId] = useState(null)
    // redux
    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { userAddress } = useSelector(state=>state.address)
    const { toast } = useToast()

    function handleManageSubmit(e){
        e.preventDefault();

        if(userAddress.length >= 3 && currentEditedId === null){
            setFormData(initialState)
            toast({
                title : "You Can Only Add Three Address",
                variant : "destructive"

            })
            return
        }

        currentEditedId !== null ?
        dispatch(updateAddress({
            userId : user?.id,
            addressId : currentEditedId,
            formData : formData
        }))
        .then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress({userId : user?.id}))
                setFormData(initialState)
                setCurrentEditedId(null)
                toast({
                    title : data?.payload?.message || "Address Updated"
                })
            }
        })
        :
        dispatch(addAddress({
            ...formData,
            userId : user?.id
        }))
        .then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress({userId : user?.id}))
                setFormData(initialState)
                toast({
                    title : data?.payload?.message || "Address Added."
                })
            }
        })
    }
    function isFormValid(){
        return Object.keys(formData).map(key=>formData[key].trim() !== '').every(item=>item)
    }

    // function to Update User Address 
    function handleEditAddress(productId){
        // console.log(productId);
        setCurrentEditedId(productId._id);
        setFormData({
            ...formData,
            address : productId?.address,
            city : productId?.city,
            phone : productId?.phone,
            notes : productId.notes,
            pincode : productId?.pincode
        })
    }

    // function to Delete User Address
    function handleDeleteAddress(productId){
        // console.log(productId);
        dispatch(deleteAddress({
          userId : user?.id,
          addressId : productId
        }))
        .then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress({userId : user?.id}))
                toast({
                    title : data?.payload?.message || "Address Deleted"
                })
            }
        })
      }

    // fetch all User address on Page load
    useEffect(()=>{
        dispatch(fetchAllAddress({userId : user?.id}))
    },[dispatch])

    // console.log(selectedId);
    
  return (
    <Card>
        <div className='mb-5 p-3 grid lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2'>
            {
                userAddress && userAddress.length > 0 ?
                userAddress.map(sindleAddress=>
                <AddressCard 
                    setCurrentSelectedAddress = { setCurrentSelectedAddress }
                    addressInfo={sindleAddress}
                    key={sindleAddress._id}
                    handleDeleteAddress={handleDeleteAddress}
                    handleEditAddress={handleEditAddress}
                    selectedId={selectedId}
                    />) : null
            }
        </div>
        <CardHeader>
            <CardTitle className="font-serif">
                {
                    currentEditedId !== null ? "Edit Address" : "Add New Address."
                }
                </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Form 
            formContols={ addressFormControls } 
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add" }
            onSubmit={ handleManageSubmit}
            isButtonDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
  )
}
