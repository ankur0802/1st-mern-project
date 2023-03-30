import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Protected({ isAdmin,isAuthenticated, children }) {

  const {isLoading, user} = useSelector((state)=>state.user)

  if(isLoading===false){
    if (isAuthenticated === false) {
      return <Navigate to="/login" replace />
    }
    if (isAdmin === true && user.role !== 'admin') {
      return <Navigate to="/login" replace />
    }
    return children
  }

  
}
export default Protected