import {allOrdersFail, allOrdersRequest, allOrdersSuccess, clearErrors} from '../store/slices/adminOrderSlice'
import {updateOrderFail, updateOrderRequest, updateOrderReset, updateOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderReset, deleteOrderSuccess} from '../store/slices/updateAndDeleteOrderSlice'
import axios from 'axios'

// get all orders 

export const getAllOrders = ()=> async(dispatch)=>{

    try {

        dispatch(allOrdersRequest())

        const {data} = await axios.get('/api/v1/admin/orders')
        dispatch(allOrdersSuccess(data.orders))
        
    } catch (error) {

        dispatch(allOrdersFail(error.response.data.message))

        
    }

}

// Update orders 

export const updateOrder = (id, order)=> async(dispatch)=>{

    try {

        dispatch(updateOrderRequest())

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.put(`/api/v1/admin/orders/${id}`, order, config)

        dispatch(updateOrderSuccess(data.success))
        
    } catch (error) {

        dispatch(updateOrderFail(error.response.data.message))

        
    }

}

// Delete orders 

export const deleteOrder = (id)=> async(dispatch)=>{

    try {

        dispatch(deleteOrderRequest())

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.delete(`/api/v1/admin/orders/${id}`)
        dispatch(deleteOrderSuccess(data.success))
        
    } catch (error) {

        dispatch(deleteOrderFail(error.response.data.message))

        
    }

}


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}