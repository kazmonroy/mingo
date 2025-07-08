import { Link, Navigate } from 'react-router';
import { useCurrentUser } from '@/api/apiAuth';
import { LoginForm } from '@/components/login-form';

export const LoginPage = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className='flex min-h-svh items-center justify-center gap-2'>
        <img src='/mingo-logo.svg' alt='mingo logo' />
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to='/discover' replace />;
  }
  console.log('Is user authenticated:', isAuthenticated);
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2 self-center font-medium'
        >
          <div className='relative flex grow basis-0 items-center'>
            <img src='/mingo-logo.svg' alt='mingo logo' />
          </div>
          Mingo
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};
