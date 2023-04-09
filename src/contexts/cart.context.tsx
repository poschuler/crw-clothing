import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

const addCartItem = (cartItems: any, productToAdd: any) => {
  const existingCartItem = cartItems.find(
    (cartItem: any) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem: any) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: any, cartItemToRemove: any) => {
  const existingCartItem = cartItems.find(
    (cartItem: any) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem: any) => cartItem.id !== cartItemToRemove.id
    );
  }

  return cartItems.map((cartItem: any) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: any, cartItemToClear: any) => {
  return cartItems.filter(
    (cartItem: any) => cartItem.id !== cartItemToClear.id
  );
};

export const CartContext = createContext<any>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }: any) => {
  const [isCartOpen, setIsCartOpen] = useState<any>(false);
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartCount, setCartCount] = useState<any>(0);
  const [cartTotal, setCartTotal] = useState<any>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total: any, cartItem: any) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total: any, cartItem: any) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: any) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: any) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: any) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
