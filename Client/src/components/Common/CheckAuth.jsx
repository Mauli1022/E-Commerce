import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function CheckAuth({isAuthenticated,userInfo,children}) {
    
    const location = useLocation()

    if(
        !isAuthenticated && 
        !(
            location.pathname.includes('/login') || 
            location.pathname.includes('/register')
        )
    ){
        return (<Navigate to={'/auth/login'}/>)
    }

    if(
        isAuthenticated && 
        (
            location.pathname.includes("/login") || 
            location.pathname.includes("/register")
        )
    ){
        if (userInfo?.role == 'admin') {
            return<Navigate to={'/admin/dashboard'}/>
        }else{
            return <Navigate to={'/shop/home'}/>
        }
    }

    if (isAuthenticated && userInfo?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to={'/unauth-page'}/>
    }

    if (isAuthenticated && userInfo?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to={'/admin/dashboard'}/>
    }
    

  return <>{children}</>
}
