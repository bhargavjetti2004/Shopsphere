import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], totalAmount: 0.0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalAmount: 0.0 });
      return;
    }
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add products to your cart');
    }
    const updatedCart = await cartService.addToCart(productId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;
    const updatedCart = await cartService.updateQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;
    const updatedCart = await cartService.removeFromCart(productId);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    await cartService.clearCart();
    setCart({ items: [], totalAmount: 0.0 });
  };

  const cartCount = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
