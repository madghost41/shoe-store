import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Category from "./components/Category";
import "./App.css";
import ShoeCard from "./components/ShoeCard";
import Search from './components/search'
import ShoeDetails from "./components/ShoeDetails";

function App() {
  return (
    <>
      <Router>
        
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />          
          <Route path="/shoe-details" element={<ShoeDetails />} />

        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
