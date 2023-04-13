import React, { FC } from 'react';
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner-component';

import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <Preview>
          {products
            .filter((_, idx) => {
              return idx < 4;
            })
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Preview>
      )}
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
