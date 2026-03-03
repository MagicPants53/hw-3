import { Navigate, type RouteObject } from 'react-router';

import App from '@/App';
import Product from '@/App/pages/Product';
import Products from '@/App/pages/Products';
import Categories from '@/App/pages/Categories';
import AboutUs from '@/App/pages/AboutUs';
import Cart from '@/App/pages/Cart';
import Profile from '@/App/pages/Profile';

import { paths } from './paths';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Products /> },
      { path: paths.products, element: <Products /> },
      { path: paths.product, element: <Product /> },
      { path: paths.categories, element: <Categories /> },
      { path: paths.aboutUs, element: <AboutUs /> },
      { path: paths.cart, element: <Cart /> },
      { path: paths.profile, element: <Profile /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
