import { createBrowserRouter } from 'react-router';
import App from '@/app/layout/App';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '@/features/home/HomePage';
import { CreateEventForm } from '@/features/events/CreateEventForm';
import { DiscoverEventsPage } from '@/features/events/DiscoverEventsPage';
import { EventDetails } from '@/features/events/EventDetails';
import { TestErrors } from '@/features/errors/TestError';
import { NotFound } from '@/features/errors/NotFound';

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
            path: 'error',
            element: <TestErrors />,
          },

          {
            path: '/:id',
            element: <EventDetails />,
          },
          {
            path: 'not-found',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
