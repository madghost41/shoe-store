const Cart = ({cartItems, deleteFromCart}) => {

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((shoe, index) => (
          <li key={index}>
            {shoe.shoeDetails.style} - ${shoe.shoeDetails.price}
            <button onClick={() => deleteFromCart(shoe.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Store</Link>
    </div>
  );
};

export default Cart;