import { CartItem } from '@/models/model';
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the CartContext
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const useCart = () => useContext<any>(CartContext);

// Create the CartContextProvider component
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const isExist = cartItems.findIndex(i => i.id === item.id);
    let NewCartItems: CartItem[] = [];
    if (isExist !== -1) {
      NewCartItems = cartItems.map(i => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
      setCartItems(NewCartItems);
    } else {
      setCartItems(prevItems => [...prevItems, item]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};
