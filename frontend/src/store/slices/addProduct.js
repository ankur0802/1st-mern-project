import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product:{},
}

const addproductSlice = createSlice({
    name:'addProduct',
    initialState,
    reducers:{
      
        addproductRequest(state, action){
          
           state.isLoading = true;
        },
        addproductSuccess(state, action){
           state.isLoading = false;
           state.product = action.payload.product;
           state.success = action.payload.success;

        },
        addproductFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        addproductReset(state, action){
            state.success = false;
           
        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { addproductFail, addproductRequest, addproductReset, clearErrors, addproductSuccess}  = addproductSlice.actions; 

export default addproductSlice;


