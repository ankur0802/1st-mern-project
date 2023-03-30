import axios from 'axios'
import {clearErrors, addproductFail, addproductRequest, addproductReset, addproductSuccess} from '../store/slices/addProduct'




//NEW Product


export const addProduct = (productData) => async(dispatch)=>{

    try {

        dispatch(addproductRequest());

        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        const {data} = await axios.post(`/api/v1/admin/product/new`, productData, config);
        
       

        dispatch(addproductSuccess(data));

        
    } catch (error) {
        dispatch(addproductFail(error.response.data.message))
    }
}





// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}