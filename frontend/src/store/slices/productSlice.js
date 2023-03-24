import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
      
        allproductRequest(state, action){
           state.products = [];
           state.isLoading = true;
        },
        allproductSuccess(state, action){
           state.isLoading = false;
           state.products = action.payload.products;
           state.productCount = action.payload.productCount;
           state.resultPerPage=action.payload.resultPerPage;
           state.filteredProductsCount= action.payload.filteredProductsCount;

        },
        allproductFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { allproductRequest, allproductFail, allproductSuccess, clearErrors}  = productSlice.actions; 

export default productSlice;


