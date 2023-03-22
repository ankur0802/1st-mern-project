import { configureStore } from '@reduxjs/toolkit'
import productDetailSlice from './slices/productDetailsSlice';
import productSlice from './slices/productSlice';

const store = configureStore({
    reducer:{
        products:productSlice.reducer,
        productDetails:productDetailSlice.reducer,
    }
})

export default store;