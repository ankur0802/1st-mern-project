import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrders:[]
}

const adminOrderSlice = createSlice({
    name:'allOrders',
    initialState,
    reducers:{
      
        allOrdersRequest(state, action){
          
           state.isLoading = true;
        },
        allOrdersSuccess(state, action){
           state.isLoading = false;
           state.orders = action.payload;
          

        },
        allOrdersFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
      
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { allOrdersFail, allOrdersRequest, clearErrors, allOrdersSuccess}  = adminOrderSlice.actions; 

export default adminOrderSlice;


