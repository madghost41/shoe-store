import React, { useState, useEffect } from "react";

const Cart = ({ cartItems }) => {
  const [cart, setCart] = useState([]);
  const key = "cart";

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

  const saveShoesToDatabase = async () => {
    try {
      const savedCart = sessionStorage.getItem(key);
      const shoes = savedCart ? JSON.parse(savedCart) : [];

      const response = await fetch("http://localhost:3000/saveShoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shoes }),
      });

      if (!response.ok) {
        throw new Error("Error saving shoes to database");
      }

      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        console.log("Response is JSON, parsing...", contentType);
        result = await response.json();
        console.log('response', response)
      } else {
        console.log("Response is not JSON, trying text...", contentType);
        result = await response.text();
        console.log('response', response)
      }
      
      console.log("Shoes saved to database:", result);
    } catch (error) {
      console.error("Error saving shoes to database:", error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart && cart.length > 0 ? (
          cart.map((shoe, index) => (
            <li key={index}>
              {shoe.brand}, {shoe.size}, {shoe.rating}, {shoe.style} - ${shoe.price}
              <button onClick={() => deleteFromCart(shoe.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
      <br />
      {cart && cart.length > 0 ? (
        <button onClick={saveShoesToDatabase}>Confirm Purchase</button>
      ) : null}
    </div>
  );
};

export default Cart;
