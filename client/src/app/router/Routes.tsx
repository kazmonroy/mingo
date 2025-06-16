import { createBrowserRouter, Navigate } from 'react-router';
import App from '@/app/layout/App';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '@/features/home/HomePage';
import { CreateEventForm } from '@/features/events/createEvent/CreateEventForm';
import { DiscoverEventsPage } from '@/features/events/DiscoverEventsPage';
import { EventDetails } from '@/features/events/EventDetails';
import { NotFound } from '@/features/errors/NotFound';
import { ServerError } from '@/features/errors/ServerError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '',
        element: <AppLayout />,
        children: [
          {
            path: 'create',
            element: <CreateEventForm />,
          },
          {
            path: 'discover',
            element: <DiscoverEventsPage />,
          },
          {
            path: '/:id',
            element: <EventDetails />,
          },
          {
            path: 'not-found',
            element: <NotFound />,
          },
          {
            path: 'server-error',
            element: <ServerError />,
          },
          {
            path: '*',
            element: <Navigate replace to='/not-found' />,
          },
        ],
      },
    ],
  },
]);
