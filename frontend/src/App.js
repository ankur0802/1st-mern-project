import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import Footer from "./components/footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'


function App() {


  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
      </Routes>
     <Footer/>
    </Router>
  );
}

export default App;
