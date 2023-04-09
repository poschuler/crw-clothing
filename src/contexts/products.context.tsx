import React from 'react';
import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext<any>({
  products: [],
});

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any>(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
