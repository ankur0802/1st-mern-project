import axios from "axios";
import {clearErrors, createOrderFail, createOrderRequest, createOrderSuccess} from '../store/slices/orderSlice'

// Create order 
export const createOrder = (order) => async(dispatch, getState)=>{

    try {

        dispatch(createOrderRequest());

        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        }

        const {data} = await axios.post('/api/v1/order/new', order, config);

        dispatch(createOrderSuccess(data));

        
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }

}


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearError());
}