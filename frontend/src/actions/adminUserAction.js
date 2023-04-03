import {allUsersFail, allUsersRequest, allUsersSuccess, clearErrors} from '../store/slices/allUsersSlice'
import {userDetailFail, userDetailRequest, userDetailSuccess } from '../store/slices/userDetailSlice'
import {updateUserFail, updateUserRequest,updateUserSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess } from '../store/slices/profileSlice'

import axios from 'axios'

// get all users 

export const  gettAllUsers = ()=> async(dispatch)=>{

    try{

        dispatch(allUsersRequest())

        const {data} = await axios.get(`/api/v1/admin/users`)

        dispatch(allUsersSuccess(data.users))

    }catch(error){
        dispatch(allUsersFail(error.response.data.message))

    }

}


// get user Details

export const  getUserDetails = (id)=> async(dispatch)=>{

    try{

        dispatch(userDetailRequest())

        const {data} = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch(userDetailSuccess(data.user))

    }catch(error){
        dispatch(userDetailFail(error.response.data.message))

    }

}



// Update User

export const  updateUser = (id, userData)=> async(dispatch)=>{

    try{

        dispatch(updateUserRequest())

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config)

        dispatch(updateUserSuccess(data.success))

    }catch(error){
        dispatch(updateUserFail(error.response.data.message))

    }

}



// Delete User

export const  deleteUser = (id)=> async(dispatch)=>{

    try{

        dispatch(deleteUserRequest())


        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch(deleteUserSuccess(data))

    }catch(error){
        dispatch(deleteUserFail(error.response.data))

    }

}




// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}