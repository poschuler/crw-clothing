import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTIONS_TYPES } from './cart.types';

export const setIsCartOpen = (boolean: any) => {
  return createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);
};

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

export const addItemToCart = (cartItems: any, productToAdd: any) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: any, cartItemToRemove: any) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems: any, cartItemToClear: any) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};
