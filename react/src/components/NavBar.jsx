import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
           <Link to="/search" className="navbar-link">
            Search
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
