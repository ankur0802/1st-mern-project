import {addToCart, removeCartItem } from '../store/slices/cartSlice'
import axios from 'axios'


// ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) =>{
    try {
        

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch(addToCart({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }));

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        



    } catch (error) {
        // dispatch(loginFail(error.response.data.message))
        
    }
}


// REMOVE FROM CART 

export const removeItemsFromCart = (id) => async (dispatch, getState) =>{

        dispatch(removeCartItem(id));

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        

}

