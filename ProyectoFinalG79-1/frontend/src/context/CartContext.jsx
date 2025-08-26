import { createContext, useState, useEffect } from "react";
import {
  addOrUpdateProduct,
  updateProductQuantity,
  calculateTotal,
  removeProduct,
} from "../Tools/cartTools";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => addOrUpdateProduct(prevCart, product));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => updateProductQuantity(prevCart, productId, amount));
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => removeProduct(prevCart, productId));
  };

  const total = calculateTotal(cart);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart, total, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
