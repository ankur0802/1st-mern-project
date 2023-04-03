import { updateProfileFail, updateProfileRequest, updateProfileSuccess, clearErrors , updatePasswordFail, updatePasswordRequest, updatePasswordSuccess } from '../store/slices/profileSlice'
import axios from 'axios'

// UPDATE Profile
export const updateProfile = (userData)=> async(dispatch)=>{
    try {
        dispatch(updateProfileRequest())
        
        
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
      
        

        const {data} = await axios.put(`/api/v1/me/update`,userData, config)
        

        dispatch(updateProfileSuccess(data.success))
        
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
        
    }
}


// UPDATE Password
export const updatePassword = (passwords)=> async(dispatch)=>{
    try {
        dispatch(updatePasswordRequest())
        
        
        const config = {headers: {'Content-Type': 'application/json'}}
      
        

        const {data} = await axios.put(`/api/v1/password/update`,passwords, config)
        

        dispatch(updatePasswordSuccess(data.success))
        
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
        
    }
}



// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}