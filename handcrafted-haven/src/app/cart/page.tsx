'use client';

import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import styles from '../../styles/Order.module.css';
import RootLayout from '../layout';

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
    // Create a summary of items in the cart
    const orderSummary = state.items.map(item => `${item.name} (x${item.quantity})`).join(', ');

    // Show alert with order confirmation
    alert(`Order placed with items: ${orderSummary}`);
    
    // Optionally clear the cart after ordering
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <RootLayout pageTitle='Cart'>
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p className={styles.emptyCartMessage}>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {state.items.map(item => (
              <li key={item.productId} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.productImage} />
                <div className={styles.itemDetails}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <p className={styles.itemPrice}>${item.price} x {item.quantity}</p>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.quantityButton} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  <button className={styles.quantityButton} onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <button className={styles.removeButton} onClick={() => removeItem(item.productId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</p>
          <button className={styles.orderButton} onClick={handleOrder}>Order</button>
        </>
      )}
    </div>
    </RootLayout>
  );
};

export default CartPage;
