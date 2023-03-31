import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const updateAndDeleteOrderSlice = createSlice({
    name:'updateAndDeleteOrder',
    initialState,
    reducers:{
      
        updateOrderRequest(state, action){
          
           state.isLoading = true;
        },
        updateOrderSuccess(state, action){
           state.isLoading = false;
           state.isUpdated = action.payload;
           

        },
        updateOrderFail(state, action){
           state.isLoading = false;
           state.error = action.payload
           
        },
        
        updateOrderReset(state, action){
            state.isUpdated=   false;
          
           

        },
        deleteOrderRequest(state, action){
          
           state.isLoading = true;
        },
        deleteOrderSuccess(state, action){
           state.isLoading = false;
           state.isDeleted = action.payload;
           

        },
        deleteOrderFail(state, action){
           state.isLoading = false;
           state.error=   action.payload;

        },
       
        deleteOrderReset(state, action){
            state.isDeleted = false;

           

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { updateOrderFail, updateOrderRequest, updateOrderReset, clearErrors, updateOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderReset, deleteOrderSuccess}  = updateAndDeleteOrderSlice.actions; 

export default updateAndDeleteOrderSlice;


