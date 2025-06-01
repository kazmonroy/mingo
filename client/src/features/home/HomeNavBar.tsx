import { Button } from '@/components/ui/button';

export const HomeNavBar = () => {
  return (
    <header className='sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white pl-3 pr-4 py-1 transition duration-500 sm:px-6 lg:px-8 dark:bg-transparent'>
      <div className='relative flex grow basis-0 items-center'>
        <img src='/mingo-logo.svg' alt='mingo logo' />
      </div>

      <nav className='relative flex basis-0 justify-end gap-4 md:grow items-center'>
        <Button size='sm' variant='ghost'>
          Explore events
        </Button>
        <Button size='sm'>Sign in</Button>
      </nav>
    </header>
  );
};
