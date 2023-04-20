import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'
import Search from "./components/search/Search";
import LoginSignup from "./components/User/LoginSignup";
import store from './store/store'
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/navbar/UserOptions";
import {  useSelector } from "react-redux";
import Account from "./components/Account/Account";
import Protected from "./components/Route/Protected";
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ElementsLayout from "./components/Route/ElementLayout";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import EmailVerify from "./components/Email/EmailVerify";




function App() {

  const {isAuthenticated, user}= useSelector((state)=>state.user)

 
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v1/stripeapikey');
   

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(()=>{

    store.dispatch(loadUser())

    getStripeApiKey();


  },[])

  window.addEventListener("contextmenu", (e)=>e.preventDefault())


  return (
    <Router>
      <ToastContainer/>
      <Navbar/>
      {isAuthenticated ? (user && user.verified && <UserOptions user={user} />):(isAuthenticated && <UserOptions user={user} />)}
     
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:keyword" element={<Products/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify/>} />

          
            
          <Route path="/account" element={
             <Protected isAuthenticated={isAuthenticated}>
             <Account/>
           </Protected>
         } />
            
          <Route path="/me/update" element={
             <Protected isAuthenticated={isAuthenticated}>
             <UpdateProfile/>
           </Protected>
         } />
            
          <Route path="/password/update" element={
             <Protected isAuthenticated={isAuthenticated}>
             <UpdatePassword/>
           </Protected>
         } />
            
          <Route path="/shipping" element={
             <Protected isAuthenticated={isAuthenticated}>
             <Shipping/>
           </Protected>
         } />
            
          <Route path="/order/confirm" element={
             <Protected isAuthenticated={isAuthenticated}>
            <ConfirmOrder/>
           </Protected>
         } />
            
          <Route path="/success" element={
             <Protected isAuthenticated={isAuthenticated}>
             <OrderSuccess/>
           </Protected>
         } />
            
          <Route path="/orders" element={
             <Protected isAuthenticated={isAuthenticated}>
             <MyOrders/>
           </Protected>
         } />
            
          <Route path="/order/:id" element={
             <Protected isAuthenticated={isAuthenticated}>
             <OrderDetails/>
           </Protected>
         } />

          <Route path="/admin/dashboard" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <Dashboard/>
           </Protected>
         } />

          

          <Route path="/admin/products" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <ProductList/>
           </Protected>
         } />

          
          

          <Route path="/admin/product" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <NewProduct/>
           </Protected>
         } />

          
          

          <Route path="/admin/product/:id" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <UpdateProduct/>
           </Protected>
         } />

          
          
          

          <Route path="/admin/orders" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <OrderList/>
           </Protected>
         } />

          
          

          <Route path="/admin/order/:id" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <ProcessOrder/>
           </Protected>
         } />

          
          

          <Route path="/admin/users" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <UsersList/>
           </Protected>
         } />

          
          

          <Route path="/admin/user/:id" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <UpdateUser/>
           </Protected>
         } />

          
          

          <Route path="/admin/reviews" element={
             <Protected isAuthenticated={isAuthenticated} isAdmin={true}>
             <ProductReviews/>
           </Protected>
         } />

          

          <Route element={<Protected isAuthenticated={isAuthenticated} >
            <ElementsLayout stripe={loadStripe(stripeApiKey)} />
          </Protected>} >
                <Route path="/process/payment" element={
             <Payment/>
          } />
          </Route> 

          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<LoginSignup/>} />



          <Route path="*" element={<NotFound/>} />

      </Routes>
     <Footer/>
    </Router>
  );
}

export default App;
