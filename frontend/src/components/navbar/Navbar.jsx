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
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <ImSearch />
      <TfiShoppingCartFull />
      <CgProfile />
    </nav>
  );
};

export default Navbar;
