import type { RouteObject } from 'react-router';
import App from '../App';
import Users from 'pages/Users';
import User from 'pages/User';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/users', element: <Users /> },
      { path: '/users/:id', element: <User /> },
    ],
  },
];
