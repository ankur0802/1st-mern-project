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
import ProtectedRoutes from "./components/Route/ProctedRoutes";
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

function App() {
  const token = Cookies.get();


  const {isAuthenticated, user}= useSelector((state)=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v1/stripeapikey');
   

    console.log(data.stripeApiKey);
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

          <Route element={<ProtectedRoutes/>} >
            
          <Route path="/account" element={<Account/>} />
          <Route path="/me/update" element={<UpdateProfile/>} />
          <Route path="/password/update" element={<UpdatePassword/>} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/order/confirm" element={<ConfirmOrder/>} />
          <Route path="/success" element={<OrderSuccess/>} />

          {/* <Elements stripe={loadStripe(stripeApiKey)} >
          <Route path="/process/payment" element={<Payment/>} />
          // </Elements> */} --not working

          <Route element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />} >
                <Route path="/process/payment" element={<Payment />} />
          </Route>

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
