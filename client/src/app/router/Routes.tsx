import { createBrowserRouter } from 'react-router';
import App from '@/app/layout/App';
import { AppLayout } from '../layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ index: true, element: <App /> }],
  },
]);
