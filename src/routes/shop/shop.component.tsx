import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesStart } from '../../store/categories/category.actions';

type Props = { id: number; name: string };

const Shop = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart() as any);
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
