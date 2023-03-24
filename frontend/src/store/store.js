import { configureStore } from '@reduxjs/toolkit'
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
    }
})

export default store;