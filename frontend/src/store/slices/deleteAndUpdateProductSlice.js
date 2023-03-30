import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const deleteAndUpdateproductSlice = createSlice({
    name:'deleteAndUpdate',
    initialState,
    reducers:{
      
        deleteproductRequest(state, action){
          
           state.isLoading = true;
        },
        deleteproductSuccess(state, action){
           state.isLoading = false;
           state.isDeleted = action.payload;
           

        },
        deleteproductFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        deleteproductReset(state, action){
            state.isDeleted = false;
           

        },
      
        updateproductRequest(state, action){
          
           state.isLoading = true;
        },
        updateproductSuccess(state, action){
           state.isLoading = false;
           state.isUpdated = action.payload;
           

        },
        updateproductFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        updateproductReset(state, action){
            state.isUpdated = false;
           

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { deleteproductFail, deleteproductRequest, deleteproductReset, clearErrors, deleteproductSuccess, updateproductFail, updateproductRequest, updateproductReset, updateproductSuccess}  = deleteAndUpdateproductSlice.actions; 

export default deleteAndUpdateproductSlice;


