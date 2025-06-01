import { NavBar } from '@/app/layout/NavBar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex w-full flex-col min-h-screen'>
        <NavBar />
        {children}
      </div>
    </>
  );
};
