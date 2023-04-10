import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CategoryContainer, Title } from './category.styles';
import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from 'react-redux';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';

import Spinner from '../../components/spinner/spinner-component';

type Props = {};

const Category = (props: Props) => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category as string]);

  useEffect(() => {
    setProducts(categoriesMap[category as string]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category?.toLocaleUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product: any) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
