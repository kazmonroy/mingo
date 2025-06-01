import { createBrowserRouter } from 'react-router';
import App from '@/app/layout/App';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '@/features/home/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [{ index: true, element: <App /> }],
  },
]);
