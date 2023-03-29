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
import { useSelector } from "react-redux";
import Account from "./components/Account/Account";
import Protected from "./components/Route/Protected";
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import Cookies from 'js-cookie'
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ElementsLayout from "./components/Route/ElementLayout";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from './components/Admin/Dashboard'


function App() {
  const token = Cookies.get();


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


  return (
    <Router>
      <Navbar/>
      {isAuthenticated && <UserOptions user={user} />}
     
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:keyword" element={<Products/>} />
          <Route path="/search" element={<Search/>} />

          
            
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
             <Protected isAuthenticated={isAuthenticated}>
             <Dashboard/>
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

      </Routes>
     <Footer/>
    </Router>
  );
}

export default App;
