import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Layout = lazy(() => import('shared-components/layout'));

const Markets = lazy(() => import('pages/markets'));
const MarketId = lazy(() => import('pages/market-id'));

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
      {
        path: '/markets/:market_id',
        element: <MarketId />,
      },
    ],
  },
]);

export default router;
