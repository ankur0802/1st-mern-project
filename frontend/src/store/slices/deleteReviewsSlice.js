import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
}

const deleteReviewsSlice = createSlice({
    name:'allReviews',
    initialState,
    reducers:{
      
        deleteReviewsRequest(state, action){
          
           state.isLoading = true;
        },
        deleteReviewsSuccess(state, action){
           state.isLoading = false;
           state.isDeleted = action.payload;
          

        },
        deleteReviewsFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
        deleteReviewsReset(state, action){
           state.isLoading = false;
           state.isDeleted= false;

        },
       
      
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { deleteReviewsFail, deleteReviewsRequest, clearErrors, deleteReviewsSuccess, deleteReviewsReset}  = deleteReviewsSlice.actions; 

export default deleteReviewsSlice;


