import { NavBar } from '@/app/layout/NavBar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
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
