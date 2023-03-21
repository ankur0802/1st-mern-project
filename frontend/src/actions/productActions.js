import { allproductFail, allproductSuccess, allproductRequest } from '../store/slices/productSlice'
import axios from 'axios'

export const getProduct = ()=> async (dispatch)=>{
    try {
        
        const {data} = await axios.get('/api/v1/products')
      
        dispatch(allproductSuccess(data))

     


    } catch (error) {
        console.log(error.message);
    }
}