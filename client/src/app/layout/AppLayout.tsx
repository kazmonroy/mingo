import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '@/api/apiAuth';
import { NavBar } from '@/app/layout/NavBar';

export const AppLayout = () => {
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <div className='flex w-full flex-col min-h-screen bg-zinc-50'>
        <NavBar />

        <main className='relative mx-auto flex w-full max-w-4xl flex-auto justify-center px-4 lg:px-8 xl:px-12'>
          <Outlet />
        </main>
      </div>
    </>
  );
};
