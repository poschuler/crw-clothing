import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserProvider } from './contexts/user.context';
import { ProductsProvider } from './contexts/products.context';

import './index.scss';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from './contexts/cart.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
