import { allproductFail, allproductSuccess, allproductRequest } from '../store/slices/productSlice'
import { allproductDetailFail,allproductDetailSuccess, allproductDetailRequest } from '../store/slices/productDetailsSlice'
import axios from 'axios'

export const getProduct = ()=> async (dispatch)=>{
    try {

        dispatch(allproductRequest())
        
        const {data} = await axios.get('/api/v1/product')

        dispatch(allproductSuccess(data))

     


    } catch (error) {
        dispatch(allproductFail(error.response.data.message))
        
       
    }
}


export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch(allproductDetailRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`)
       
        dispatch(allproductDetailSuccess(data.product))

    } catch (error) {
        dispatch(allproductDetailFail(error.response.data.message))
    }
}