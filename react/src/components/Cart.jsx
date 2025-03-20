import React, { useState, useEffect } from "react";
import axios from "axios";


const Cart = ({ cartItems }) => {
  const key = "cart";
  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  

  useEffect(() => {
    const savedCart = sessionStorage.getItem(key);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const deleteFromCart = (shoe_id) => {
    const updatedCart = cart.filter((shoe) => shoe.id !== shoe_id);
    setCart(updatedCart);
    sessionStorage.setItem(key, JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cart.length > 0) {
        try {
          const response = await axios.post(
            "http://localhost:5000/recommend",
            cart[cart.length - 1]
          );
          setRecommendations(response.data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };
    fetchRecommendations();
  }, [cart]);


  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart && cart.length > 0 ? (
          cart.map((shoe, index) => (
            <li key={index}>
              {shoe.style} - ${shoe.price}
              <button onClick={() => deleteFromCart(shoe.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
      <h2>Recommended Shoes</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec} {shoe.style}
          {shoe.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
