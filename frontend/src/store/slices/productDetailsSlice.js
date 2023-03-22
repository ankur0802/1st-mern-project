import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product:{},
}

const productDetailSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
      
        allproductDetailRequest(state, action){
           state.product = {};
           state.isLoading = true;
        },
        allproductDetailSuccess(state, action){
           state.isLoading = false;
           state.product = action.payload;
        
        },
        allproductDetailFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        }
    }
})
 export const { allproductDetailRequest, allproductDetailSuccess, allproductDetailFail}  = productDetailSlice.actions; 

export default productDetailSlice;


