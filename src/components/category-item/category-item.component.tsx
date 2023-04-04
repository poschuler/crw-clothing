import React from 'react';
import './category-item.styles.scss';

type Props = {};

const CategoryItem = ({ category }: any) => {
  const { id, title, imageUrl } = category;

  return (
    <div key={id} className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <img />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
