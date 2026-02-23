import type { RouteObject } from 'react-router';

import App from '@/App';
import Product from '@/App/pages/Product';
import Products from '@/App/pages/Products';
import Categories from '@/App/pages/Categories';
import AboutUs from '@/App/pages/AboutUs';
import Cart from '@/App/pages/User';
import User from '@/App/pages/Cart';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/products', element: <Products /> },
      { path: '/products/:documentId', element: <Product /> },
      { path: '/categories', element: <Categories /> },
      { path: '/about_us', element: <AboutUs /> },
      { path: '/cart', element: <Cart /> },
      { path: '/user', element: <User /> },
    ],
  },
];
