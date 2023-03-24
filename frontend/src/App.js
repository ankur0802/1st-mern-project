import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import React, { useEffect } from "react";
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
import ProctedRoutes from "./components/Route/ProctedRoutes";
import UpdateProfile from './components/User/UpdateProfile'


function App() {

  const {isAuthenticated, user}= useSelector((state)=>state.user)

  useEffect(()=>{

    store.dispatch(loadUser())

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

          <Route element={<ProctedRoutes/>} >
          <Route path="/account" element={<Account/>} />
          <Route path="/me/update" element={<UpdateProfile/>} />

          </Route>

          <Route path="/login" element={<LoginSignup/>} />
      </Routes>
     <Footer/>
    </Router>
  );
}

export default App;
