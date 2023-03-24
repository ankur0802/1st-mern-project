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
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { updateProfileFail, updateProfileRequest, updateProfileSuccess, updateProfileReset,clearErrors}  = profileSlice.actions; 

export default profileSlice;

