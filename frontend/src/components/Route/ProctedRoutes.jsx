import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProctedRoutes = () => {

    const {isAuthenticated} = useSelector((state)=>state.user)

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login' />
  )
}

export default ProctedRoutes