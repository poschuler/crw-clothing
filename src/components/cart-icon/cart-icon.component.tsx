import React, { useContext } from 'react';
import './cart-icon.styles.scss';
import shoppingIcon from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

type Props = { name: string };

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <img src={shoppingIcon} alt="Shopping icon" className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
