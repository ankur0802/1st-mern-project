import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews:[]
}

const allReviewsSlice = createSlice({
    name:'allReviews',
    initialState,
    reducers:{
      
        allReviewsRequest(state, action){
          
           state.isLoading = true;
        },
        allReviewsSuccess(state, action){
           state.isLoading = false;
           state.reviews = action.payload;
          

        },
        allReviewsFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
      
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { allReviewsFail, allReviewsRequest, clearErrors, allReviewsSuccess}  = allReviewsSlice.actions; 

export default allReviewsSlice;


