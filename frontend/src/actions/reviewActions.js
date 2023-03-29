import {clearErrors, newReviewFail, newReviewRequest, newReviewSuccess} from '../store/slices/reviewSlice'
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





// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}