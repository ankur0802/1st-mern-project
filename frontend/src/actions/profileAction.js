import { updateProfileFail, updateProfileRequest, updateProfileReset, updateProfileSuccess, clearErrors} from '../store/slices/profileSlice'
import axios from 'axios'

// UPDATE Profile
export const updateProfile = (userData)=> async(dispatch)=>{
    try {
        dispatch(updateProfileRequest())
        
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        

        const {data} = await axios.put(`api/v1/me/update`,userData, config)
        

        dispatch(updateProfileSuccess(data.user))
        
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
        
    }
}



// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}