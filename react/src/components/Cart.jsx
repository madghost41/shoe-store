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
    </div>
  );
};

export default Cart;
