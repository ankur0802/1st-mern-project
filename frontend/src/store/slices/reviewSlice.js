import { createSlice } from "@reduxjs/toolkit";

const initialState = { }

const reviewSlice = createSlice({
    name:'myOrders',
    initialState,
    reducers:{
      
      
        newReviewRequest(state, action){
           
           state.isLoading = true;
        },
        newReviewSuccess(state, action){
           state.isLoading = false;
           state.success = action.payload;
        
        },
        newReviewFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
        newReviewReset(state, action){
           state.isLoading = false;
           state.success= false;

        },
       
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const {clearErrors , newReviewFail, newReviewRequest, newReviewSuccess , newReviewReset}  = reviewSlice.actions; 

export default reviewSlice;

