import React from 'react'
import {loginFormControls } from "../../config/index.js"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from "../../components/Common/Form"
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice/index.js'
import { useToast } from '@/components/Common/hooks/use-toast.js'

export default function Login() {
  const initialState = {
    email : '',
    password : ''
  }
  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const {toast} = useToast()

  function onSubmit(e){
    e.preventDefault();
    // console.log(formData);

    dispatch(loginUser(formData))
    .then((data)=>{
      // console.log(data);
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message || "User Not Found"
        })
      }else{
        toast({
          title : data?.payload?.message || "User Not Found",
          variant: "destructive"
        })
      }
    })
    
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>

      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground font-serif'>Please Login</h1>
        <p className='mt-2 font-mono'>Please Register First 
          <Link to={'/auth/register'} className='font-medium text-primary hover:underline ml-2'>Register</Link>
        </p>
      </div>
      <Form 
      formContols={loginFormControls} 
      formData={formData}
      buttonText={'Sign Up'}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
        
    </div>
  )
}
