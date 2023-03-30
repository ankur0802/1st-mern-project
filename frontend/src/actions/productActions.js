import { allproductFail, allproductSuccess, allproductRequest ,clearErrors, adminproductFail, adminproductRequest, adminproductSuccess} from '../store/slices/productSlice'
import { allproductDetailFail,allproductDetailSuccess, allproductDetailRequest } from '../store/slices/productDetailsSlice'
import axios from 'axios'


// get All products 

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


// get All products for admin  

export const getAdminProduct = ()=> async (dispatch)=>{
    try {

        dispatch(adminproductRequest())
        
    
        const {data} = await axios.get(`/api/v1/admin/products`)

        dispatch(adminproductSuccess(data.products))

     

    } catch (error) {
        dispatch(adminproductFail(error.response.data.message))
        
       
    }
}

// Get product details 

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