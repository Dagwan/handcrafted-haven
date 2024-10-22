'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Define the shape of the cart item
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;  
  description: string;  
}

// Define the state and action types
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }; 

// Load cart items from localStorage
const loadCartFromLocalStorage = (): CartState => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [] };
};

// Initial cart state
const initialState: CartState = loadCartFromLocalStorage();

// Reducer function to manage the cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { items: updatedItems };
      }
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.productId !== action.payload) };
    case 'UPDATE_ITEM_QUANTITY':
      return {
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: Math.max(action.payload.quantity, 1) }
            : item
        ),
      };
    // Handle clearing the cart
    case 'CLEAR_CART': 
      return { items: [] };
    default:
      return state;
  }
};

// Create the CartContext
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Context provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export default CartContext;
