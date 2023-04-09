import React from 'react';
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../checkout-item/checkout-item-component';

import {
  CheckoutContainer,
  Total,
  CheckoutHeader,
  HeaderBlock,
} from './checkout.styles';

type Props = { name: string };

const Checkout = (props: any) => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem: any) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
