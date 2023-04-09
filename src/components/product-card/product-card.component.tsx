import React from 'react';
import { useContext } from 'react';
import {
  Footer,
  Name,
  Price,
  ProductCartContainer,
} from './product-card.styles';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }: any) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to car
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
