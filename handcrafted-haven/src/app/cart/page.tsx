'use client';

import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { productId, quantity },
    });
  };

  const removeItem = (productId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: productId,
    });
  };

  const handleOrder = () => {
    // You can perform order processing here, like sending data to an API
    // For now, we'll just log the items and clear the cart as an example
    console.log("Order placed with items:", state.items);
    
    // Optionally clear the cart after ordering
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {state.items.map(item => (
              <li key={item.productId}>
                <img src={item.image} alt={item.name} style={{ width: '100px' }} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>${item.price} x {item.quantity}</p>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <button onClick={() => removeItem(item.productId)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleOrder}>Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
