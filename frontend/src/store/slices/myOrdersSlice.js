import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders:[]
 }

const myOrderSlice = createSlice({
    name:'myOrders',
    initialState,
    reducers:{
      
      
        myOrderRequest(state, action){
           
           state.isLoading = true;
        },
        myOrderSuccess(state, action){
           state.isLoading = false;
           state.orders = action.payload;
        
        },
        myOrderFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const {clearErrors , myOrderFail, myOrderRequest, myOrderSuccess }  = myOrderSlice.actions; 

export default myOrderSlice;

