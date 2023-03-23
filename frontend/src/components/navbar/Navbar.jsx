import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import { ImSearch } from "react-icons/im";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <Link to='/search' ><ImSearch /></Link>
      <Link to='/cart' > <TfiShoppingCartFull /></Link>
      <Link to='/login' ><CgProfile /></Link>
     
      
    </nav>
  );
};

export default Navbar;
