import { loginFail, loginRequest, loginSuccess, clearErrors, registerUserFail, registerUserRequest, registerUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess , logoutFail, logoutSuccess , forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess , resetPasswordFail, resetPasswordRequest, resetPasswordSuccess } from '../store/slices/userSlice'
import axios from 'axios'

// LOGIN 
export const login = (email, password) => async (dispatch) =>{
    try {
        
        dispatch(loginRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/v1/login`, {email, password}, config)

        dispatch(loginSuccess(data.user))
        



    } catch (error) {
        dispatch(loginFail(error.response.data.message))
        
    }
}

// REGISTER 
export const register = (userData)=> async(dispatch)=>{
    try {
        dispatch(registerUserRequest())
        
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        
console.log(userData);
        const {data} = await axios.post(`/api/v1/register`,userData, config)
       

        dispatch(registerUserSuccess(data.user))
        
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message))
        
    }
}

// load user 
export const loadUser = () => async (dispatch) =>{
    try {
        
        dispatch(loadUserRequest())

        const {data} = await axios.get(`/api/v1/me`)
        

        dispatch(loadUserSuccess(data.user))
        

    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
 
    }
}


// logout user 
export const logout = () => async (dispatch) =>{
    try {

       await axios.get(`/api/v1/logout`)
        
        dispatch(logoutSuccess())


    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
        
    }
}




// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) =>{
    try {
        
        dispatch(forgotPasswordRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/v1/password/forgot`, email, config)

        dispatch(forgotPasswordSuccess(data.message))
        



    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
        
    }
}




// RESET PASSWORD
export const resetPassword = (token, passwords) => async (dispatch) =>{
    try {
        
        dispatch(resetPasswordRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch(resetPasswordSuccess(data.success))
        



    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
        
    }
}



// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}