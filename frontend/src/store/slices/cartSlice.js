import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
    cartItems: localStorage.getItem("cartItems")
       ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
      
        addToCart(state, action){
          
           const item = action.payload
           const isItemExist = state.cartItems.find((i)=>i.product===item.product);

           if(isItemExist){
            return{
                ...state,
                cartItems : state.cartItems.map((i)=>i.product===isItemExist.product ? item : i)
            }
           }else{
            return{
                ...state,
                cartItems:[...state.cartItems, item]
            }
           }

        },
        removeCartItem(state, action){
            let removeItem = state.cartItems.filter((i)=>i.product !== action.payload);
            state.cartItems = removeItem;
        
        },
        saveShippingInfo(state, action){
            
            state.shippingInfo = action.payload;
        }
        
    }
})
 export const { addToCart,removeCartItem , saveShippingInfo}  = cartSlice.actions; 

export default cartSlice;


