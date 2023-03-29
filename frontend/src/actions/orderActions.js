import axios from "axios";
import {clearErrors, createOrderFail, createOrderRequest, createOrderSuccess} from '../store/slices/orderSlice'
import { myOrderFail, myOrderRequest, myOrderSuccess} from '../store/slices/myOrdersSlice'
import { orderDetailFail, orderDetailRequest, orderDetailSuccess} from '../store/slices/orderDetailsSlice'

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


//My orders 


export const getMyOrders = () => async(dispatch)=>{

    try {

        dispatch(myOrderRequest());

        const {data} = await axios.get('/api/v1/orders/me');
       

        dispatch(myOrderSuccess(data.orders));

        
    } catch (error) {
        dispatch(myOrderFail(error.response.data.message))
    }
}


//get order details


export const getOrderDetails = (id) => async(dispatch)=>{

    try {

        dispatch(orderDetailRequest());

        const {data} = await axios.get(`/api/v1/order/${id}`);
       

        dispatch(orderDetailSuccess(data.order));

        
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}





// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}