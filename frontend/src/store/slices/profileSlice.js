import { createSlice } from "@reduxjs/toolkit";

const initialState = { }

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
      
        updateProfileRequest(state, action){
           
           state.isLoading = true;
        },
        updateProfileSuccess(state, action){
           state.isLoading = false;
           state.isUpdated = action.payload;
        
        },
        updateProfileFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        updateProfileReset(state, action){
          
           state.isUpdated= false;

        },
        updatePasswordRequest(state, action){
           
           state.isLoading = true;
        },
        updatePasswordSuccess(state, action){
           state.isLoading = false;
           state.isUpdated = action.payload;
        
        },
        updatePasswordFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        updatePasswordReset(state, action){
          
           state.isUpdated= false;

        },
        updateUserRequest(state, action){
           
           state.isLoading = true;
        },
        updateUserSuccess(state, action){
           state.isLoading = false;
           state.isUpdated = action.payload;
        
        },
        updateUserFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        updateUserReset(state, action){
          
           state.isUpdated= false;

        },
        deleteUserRequest(state, action){
           
           state.isLoading = true;
        },
        deleteUserSuccess(state, action){
           state.isLoading = false;
           state.isDeleted = action.payload.success;
           state.message = action.payload.message;
        
        },
        deleteUserFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        deleteUserReset(state, action){
          
           state.isDeleted= false;

        },
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { updateProfileFail, updateProfileRequest, updateProfileSuccess, updateProfileReset,clearErrors , updatePasswordFail, updatePasswordRequest, updatePasswordReset, updatePasswordSuccess, updateUserFail, updateUserRequest, updateUserReset, updateUserSuccess, deleteUserFail, deleteUserRequest, deleteUserReset, deleteUserSuccess }  = profileSlice.actions; 

export default profileSlice;

