import { loginFail, loginRequest, loginSuccess, clearErrors, registerUserFail, registerUserRequest, registerUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess , logoutFail, logoutSuccess} from '../store/slices/userSlice'
import axios from 'axios'

// LOGIN 
export const login = (email, password) => async (dispatch) =>{
    try {
        
        dispatch(loginRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`api/v1/login`, {email, password}, config)

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
        

        const {data} = await axios.post(`api/v1/register`,userData, config)
        

        dispatch(registerUserSuccess(data.user))
        
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message))
        
    }
}

// load user 
export const loadUser = () => async (dispatch) =>{
    try {
        
        dispatch(loadUserRequest())

        const {data} = await axios.get(`api/v1/me`)
        

        dispatch(loadUserSuccess(data.user))
        

    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
 
    }
}


// logout user 
export const logout = () => async (dispatch) =>{
    try {

       await axios.get(`api/v1/logout`)
        
        dispatch(logoutSuccess())


    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
        
    }
}



// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}