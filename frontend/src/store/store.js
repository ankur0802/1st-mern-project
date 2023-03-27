import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice';
import productDetailSlice from './slices/productDetailsSlice';
import productSlice from './slices/productSlice';
import profileSlice from './slices/profileSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
        products:productSlice.reducer,
        productDetails:productDetailSlice.reducer,
        user:userSlice.reducer,
        profile:profileSlice.reducer,
        cart:cartSlice.reducer
    }
})

export default store;