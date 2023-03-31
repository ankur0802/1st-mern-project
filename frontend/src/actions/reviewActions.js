import {clearErrors, newReviewFail, newReviewRequest, newReviewSuccess} from '../store/slices/reviewSlice'
import {allReviewsFail, allReviewsRequest, allReviewsSuccess} from '../store/slices/allReviewsSlice'
import {deleteReviewsFail, deleteReviewsRequest, deleteReviewsSuccess, deleteReviewsReset} from '../store/slices/deleteReviewsSlice'
import axios from 'axios'



//NEW REview


export const newReview = (reviewData) => async(dispatch)=>{

    try {

        dispatch(newReviewRequest());

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const {data} = await axios.post(`/api/v1/review/`, reviewData, config);
       

        dispatch(newReviewSuccess(data.success));

        
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message))
    }
}



//Get all Reviews of a product


export const getAllReviews = (id) => async(dispatch)=>{

    try {

        dispatch(allReviewsRequest());

        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);
       

        dispatch(allReviewsSuccess(data.reviews));

        
    } catch (error) {
        dispatch(allReviewsFail(error.response.data.message))
    }
}



//DeleteReview of a product


export const deleteReview = (reviewId, productId) => async(dispatch)=>{

    try {

        dispatch(deleteReviewsRequest());

        const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
       

        dispatch(deleteReviewsSuccess(data.success));

        
    } catch (error) {
        dispatch(deleteReviewsFail(error.response.data.message))
    }
}





// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}