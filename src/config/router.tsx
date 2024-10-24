import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Layout = lazy(() => import('shared-components/layout'));
const Markets = lazy(() => import('pages/markets'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/markets" />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/markets',
        element: <Markets />,
      },
    ],
  },
]);

export default router;
