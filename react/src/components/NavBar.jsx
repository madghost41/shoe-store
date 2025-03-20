import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#home" className="navbar-link">
            <Link>Home</Link>
            
          </a>
        </li>
        <li className="navbar-item">
          <a href="#category" className="navbar-link">
            <Link>Category</Link>
          </a>
        </li>
        <li className="navbar-item">
          <a href="#cart" className="navbar-link">
            <Link>Cart</Link>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;