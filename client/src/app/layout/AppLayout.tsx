import { useCurrentUser } from '@/api/apiAuth';
import { NavBar } from '@/app/layout/NavBar';
import { Outlet, useNavigate } from 'react-router';

export const AppLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null; // Prevent rendering the layout if not isAuthenticated
  }

  return (
    <>
      <div className='flex w-full flex-col min-h-screen'>
        <NavBar />

        <main className='relative mx-auto flex w-full max-w-4xl flex-auto justify-center px-4 lg:px-8 xl:px-12'>
          <Outlet />
        </main>
      </div>
    </>
  );
};
