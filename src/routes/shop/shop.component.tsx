import React from 'react';
import { useContext } from 'react';

import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

type Props = { id: number; name: string };

const Shop = (props: any) => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
