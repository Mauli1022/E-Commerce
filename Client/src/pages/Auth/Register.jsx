import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from "../../components/Common/Form"
import {registerFormControls} from "../../config/index.js"
import { useDispatch } from 'react-redux'
import { registerUser } from "../../store/auth-slice/index.js"
import { useToast } from '@/components/Common/hooks/use-toast'

export default function Register() {

  const initialState = {
    userName : '',
    email : '',
    password : ''
  }
  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {toast} = useToast();

  async function onSubmit(e){    
    e.preventDefault()
    // console.log(formData);
    
    dispatch(registerUser(formData))
    .then((data)=>{
      // console.log(data);
      
      if (data?.payload?.success) {
        toast({
          title : data?.payload?.message,
        })
        navigate('/auth/login')
      }else{
        toast({
          // title : data?.error?.message,
          title : 'User Already Hava An Account',
          variant: "destructive"
        })
      }
    })  

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>

      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already Have an Account 
          <Link to={'/auth/login'} className='font-medium text-primary hover:underline ml-2'>Login</Link>
        </p>
      </div>
      <Form 
      formContols={registerFormControls} 
      formData={formData}
      buttonText={'Sign Up'}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
        
    </div>
  )
}
