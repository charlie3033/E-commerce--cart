import React, { createContext, useEffect, useState } from 'react';
import * as api from '../api';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0, loading: true });

  const fetchCart = async () => {
    try {
      const data = await api.getCart();
      setCart({ ...data, loading: false });
    } catch (e) {
      console.error('fetchCart error', e);
      setCart(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
