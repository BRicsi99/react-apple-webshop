import { CartContextType, CartItem } from '@/models/model';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCart: () => {},
  emptyCart: () => {},
});

export const useCart = () => useContext<any>(CartContext);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addQuantity = (itemId: number, extension: number) => {
    let NewCartItems: CartItem[] = [];
    NewCartItems = cartItems.map(i => {
      if (i.id === itemId) {
        return { ...i, quantity: i.quantity + extension };
      }
      return i;
    });
    setCartItems(NewCartItems);
  };

  // Add to cart
  const addToCart = (item: CartItem) => {
    const isExist = cartItems.findIndex(i => i.id === item.id);
    if (isExist !== -1) {
      addQuantity(item.id, 1);
    } else {
      setCartItems(prevItems => [...prevItems, item]);
    }
  };

  // Remove from cart
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Empty cart
  const emptyCart = () => {
    setCartItems([]);
  };

  // Update cart(quantity)
  const updateCart = (itemId: number, isIncrease: boolean) => {
    if (isIncrease) {
      addQuantity(itemId, 1);
    } else {
      if (cartItems.find(i => i.id === itemId)?.quantity === 1) {
        removeFromCart(itemId);
        return;
      }
      addQuantity(itemId, -1);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
