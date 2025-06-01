import { Compass, Ticket } from 'lucide-react';
import { Link } from 'react-router';

export const NavBar = () => {
  return (
    <header className='sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white pl-3 pr-4 py-1 transition duration-500 sm:px-6 lg:px-8 dark:bg-transparent'>
      <div className='relative flex grow basis-0 items-center'>
        <img src='/mingo-logo.svg' alt='mingo logo' />
      </div>
      <div className='-my-5 mr-6 sm:mr-8 md:mr-0'>
        <nav className='flex flex-wrap gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200'>
          <Link to='/events' className='flex gap-2'>
            <Ticket className='h-5 w-5 text-muted-foreground' />
            Events
          </Link>

          <Link to='/discover' className='flex gap-2'>
            <Compass className='h-5 w-5 text-muted-foreground' />
            Discover
          </Link>
        </nav>
      </div>
      <div className='relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow items-center'>
        <Link to='/create' className='text-sm font-semibold'>
          Create event
        </Link>
        <p>KM</p>
      </div>
    </header>
  );
};
