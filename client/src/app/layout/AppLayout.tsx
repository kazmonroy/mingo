import { NavBar } from '@/app/layout/NavBar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <>
      <div className='flex w-full flex-col min-h-screen'>
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};
