import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import shoppingIcon from '../../assets/shopping-bag.svg';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

type Props = { name: string };

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon src={shoppingIcon} alt="Shopping icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
