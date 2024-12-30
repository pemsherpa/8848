import React, { createContext, useState } from "react";
import { Alert } from "react-native";

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart function
  const addToCart = (item) => {
    if (!item.price || isNaN(item.price)) {
      Alert.alert("Error", "Invalid price detected!");
      return;
    }
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart function (optional)
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Get total price function
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};