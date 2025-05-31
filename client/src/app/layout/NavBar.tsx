import { Button } from '@/components/ui/button';

export const NavBar = () => {
  return (
    <header className='sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white pl-3 pr-4 py-1 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-transparent'>
      <div className='relative flex grow basis-0 items-center'>
        <img src='/mingo-logo.svg' alt='mingo logo' />
      </div>
      <div className='-my-5 mr-6 sm:mr-8 md:mr-0'>
        <nav className='flex flex-wrap gap-4 text-sm font-medium text-slate-700 dark:text-slate-200'>
          <a href=''>Events</a>
          <a href=''>Calendar</a>
          <a href=''>Discover</a>
        </nav>
      </div>
      <div className='relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow items-center'>
        <Button variant='ghost'>Create event</Button>
        <p>KM</p>
      </div>
    </header>
  );
};
