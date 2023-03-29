import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order:{}
 }

const orderDetailsSlice = createSlice({
    name:'orderDetails',
    initialState,
    reducers:{
      
      
        orderDetailRequest(state, action){
           
           state.isLoading = true;
        },
        orderDetailSuccess(state, action){
           state.isLoading = false;
           state.order = action.payload;
        
        },
        orderDetailFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const {clearErrors , orderDetailFail, orderDetailRequest, orderDetailSuccess }  = orderDetailsSlice.actions; 

export default orderDetailsSlice;

