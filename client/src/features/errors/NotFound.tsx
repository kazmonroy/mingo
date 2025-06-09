import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center mt-56 h-screen gap-4 text-center'>
      <h1 className='text-8xl font-mono'>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>

      <Button asChild>
        <Link to='/discover'>Return home</Link>
      </Button>
    </div>
  );
};
