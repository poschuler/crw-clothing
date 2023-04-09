import React, { useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';

import { createContext, useState } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext<any>({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }: any) => {
  const [categoriesMap, setCategoriesMap] = useState<any>({});

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
