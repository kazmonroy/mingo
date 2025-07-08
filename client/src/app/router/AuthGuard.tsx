import { useCurrentUser } from '@/api/apiAuth';
import { Navigate, Outlet, useLocation } from 'react-router';

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='flex min-h-svh items-center justify-center gap-2'>
        <img src='/mingo-logo.svg' alt='mingo logo' />
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return <Outlet />;
};
