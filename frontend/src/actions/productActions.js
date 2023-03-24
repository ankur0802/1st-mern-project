import { allproductFail, allproductSuccess, allproductRequest ,clearErrors} from '../store/slices/productSlice'
import { allproductDetailFail,allproductDetailSuccess, allproductDetailRequest } from '../store/slices/productDetailsSlice'
import axios from 'axios'

export const getProduct = (keyword='', currentPage=1, price = [0, 25000], category, ratings=0)=> async (dispatch)=>{
    try {

        dispatch(allproductRequest())
        
        
        let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category) {
            link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            
            }


        const {data} = await axios.get(link)

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


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}