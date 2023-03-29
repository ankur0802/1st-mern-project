import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ isAuthenticated, children }) {
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected