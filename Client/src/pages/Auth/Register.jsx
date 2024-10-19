import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from "../../components/Common/Form"
import {registerFormControls} from "../../config/index.js"

export default function Register() {

  const initialState = {
    userName : '',
    email : '',
    password : ''
  }
  const [formData,setFormData] = useState(initialState)

  function onSubmit(e){    
    e.preventDefault()
  }
  console.log(formData);

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
