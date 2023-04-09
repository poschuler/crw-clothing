import React from 'react';
import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

type Props = {};

const Directory = ({ categories }: any) => {
  return (
    <div className="directory-container">
      {categories.map((category: any) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
