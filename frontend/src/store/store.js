import { configureStore } from '@reduxjs/toolkit'
import addproductSlice from './slices/addProduct';
import cartSlice from './slices/cartSlice';
import deleteAndUpdateproductSlice from './slices/deleteAndUpdateProductSlice';
import myOrderSlice from './slices/myOrdersSlice';
import orderDetailsSlice from './slices/orderDetailsSlice';
import orderSlice from './slices/orderSlice';
import productDetailSlice from './slices/productDetailsSlice';
import productSlice from './slices/productSlice';
import profileSlice from './slices/profileSlice';
import reviewSlice from './slices/reviewSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
        products:productSlice.reducer,
        productDetails:productDetailSlice.reducer,
        user:userSlice.reducer,
        profile:profileSlice.reducer,
        cart:cartSlice.reducer,
        order:orderSlice.reducer,
        myOrders:myOrderSlice.reducer,
        orderDetails:orderDetailsSlice.reducer,
        newReview:reviewSlice.reducer,
        newProduct:addproductSlice.reducer,
        deleteAndUpdateProduct:deleteAndUpdateproductSlice.reducer,
    }
})

export default store;