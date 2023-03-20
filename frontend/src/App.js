import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import Footer from "./components/footer/Footer";
import Home from "./components/Home/Home";


function App() {


  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
      </Routes>
     <Footer/>
    </Router>
  );
}

export default App;
