import React from 'react'
import {loginFormControls } from "../../config/index.js"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from "../../components/Common/Form"

export default function Login() {
  const initialState = {
    email : '',
    password : ''
  }
  const [formData,setFormData] = useState(initialState)

  function onSubmit(){

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>

      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Please Login</h1>
        <p className='mt-2'>Please Register First 
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
