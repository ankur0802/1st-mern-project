import axios from 'axios'
import {clearErrors, deleteproductFail, deleteproductRequest, deleteproductReset, deleteproductSuccess, updateproductFail, updateproductRequest, updateproductReset, updateproductSuccess} from '../store/slices/deleteAndUpdateProductSlice'




//delete Product


export const deleteProduct = (id) => async(dispatch)=>{

    try {

        dispatch(deleteproductRequest());

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);
        
       

        dispatch(deleteproductSuccess(data.success));

        
    } catch (error) {
        dispatch(deleteproductFail(error.response.data.message))
    }
}



//Update Product


export const updateProduct = (id, productData) => async(dispatch)=>{

    try {

        dispatch(updateproductRequest());

        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        }

        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config);
        
       

        dispatch(updateproductSuccess(data.success));

        
    } catch (error) {
        dispatch(updateproductFail(error.response.data.message))
    }
}





// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}