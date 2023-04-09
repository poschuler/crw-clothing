import React from 'react';
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

type Props = {};

const CategoryPreview = ({ title, products }: any) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_: any, idx: any) => {
            return idx < 4;
          })
          .map((product: any) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
