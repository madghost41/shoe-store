import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
// import "./ShoeCard.css";

const ShoeCard = ({ data }) => {
  const navigate = useNavigate();
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
    console.log("Got the key", key);
    console.log("Cart in session storage:", updatedCart);
  };

  const handleMoreInfo = () => {
    navigate("/shoe-details", { state: { shoeDetails: data } });
  };

  return (
    <>
      <div
        className="card card-background"
        style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
        key={data.shoe_id}
      >
        <div className="card-body">
          <h5 className="card-title">Shoe Details</h5>
          <div className="card-text">Size: {data.size}</div>
          <div className="card-text">Brand: {data.brand}</div>
          {/* <div className="card-text">Price: ${data.price}</div> */}
          <div className="card-text">Style: {data.style}</div>
          {/* <div className="card-text">Rating: {data.rating}</div> */}
          <button onClick={() => addToCart(data)}>Add to Cart</button>
          <button onClick={handleMoreInfo}>More Info</button>
        </div>
      </div>
    </>
  );
};

export default ShoeCard;
