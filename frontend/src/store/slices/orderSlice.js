import { createSlice } from "@reduxjs/toolkit";

const initialState = { }

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
      
        createOrderRequest(state, action){
           
           state.isLoading = true;
        },
        createOrderSuccess(state, action){
           state.isLoading = false;
           state.order = action.payload;
        
        },
        createOrderFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const {clearErrors , createOrderFail, createOrderRequest, createOrderSuccess }  = orderSlice.actions; 

export default orderSlice;

