import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{}
}

const userDetailSlice = createSlice({
    name:'userDetail',
    initialState,
    reducers:{
      
        userDetailRequest(state, action){
          
           state.isLoading = true;
        },
        userDetailSuccess(state, action){
           state.isLoading = false;
           state.user = action.payload;
          

        },
        userDetailFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
      
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { userDetailFail, userDetailRequest, clearErrors, userDetailSuccess}  = userDetailSlice.actions; 

export default userDetailSlice;


