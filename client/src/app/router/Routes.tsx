import { createBrowserRouter, Navigate } from 'react-router';
import App from '@/app/layout/App';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '@/features/home/HomePage';
import { CreateEventForm } from '@/features/events/createEvent/CreateEventForm';
import { DiscoverEventsPage } from '@/features/events/DiscoverEventsPage';
import { EventPage } from '@/features/events/EventPage';
import { NotFound } from '@/features/errors/NotFound';
import { ServerError } from '@/features/errors/ServerError';
import { LoginPage } from '@/features/auth/login/LoginPage';
import { AuthGuard } from './AuthGuard';
import { SignUpPage } from '@/features/auth/signUp/SignUpPage';
import { ProfileSettingsPage } from '@/features/profiles/ProfileSettingsPage';
import { ProfilePage } from '@/features/profiles/ProfilePage';
import { PopularEventsList } from '@/features/events/PopularEventsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AuthGuard />,
        children: [
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
                path: 'popular-events',
                element: <PopularEventsList />,
              },
              {
                path: '/:id',
                element: <EventPage />,
              },
              {
                path: 'settings',
                element: <ProfileSettingsPage />,
              },
              {
                path: 'user/:userId',
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
      { index: true, element: <HomePage /> },

      { path: 'login', element: <LoginPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
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
]);
