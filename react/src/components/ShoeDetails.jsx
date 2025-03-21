import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ShoeDetails.css";

const ShoeDetails = () => {
  const location = useLocation();
  const { shoeDetails } = location.state;
  const key = "cart";
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem(key);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (shoe) => {
    console.log("Shoe added to cart:", shoe);
    const updatedCart = [...cart, shoe];
    setCart(updatedCart);
    sessionStorage.setItem(key, JSON.stringify(updatedCart));
    console.log("Cart in session storage:", updatedCart);
  };

  return (
    <div className="shoe-details-container">
      <div className="shoe-details-card">
        <h1>{shoeDetails.name}</h1>
        <p><strong>Brand:</strong> {shoeDetails.brand}</p>
        <p><strong>Price:</strong> ${shoeDetails.price}</p>
        <p><strong>Size:</strong> {shoeDetails.size}</p>
        <p><strong>Style:</strong> {shoeDetails.style}</p>
        <p><strong>Rating:</strong> {shoeDetails.rating}</p>
        {/* Add more details as needed */}
        <button className="add-to-cart-button" onClick={() => addToCart(shoeDetails)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShoeDetails;
