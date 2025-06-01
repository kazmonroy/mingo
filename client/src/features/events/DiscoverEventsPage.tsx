import { PopularEventsList } from './PopularEventsList';

export const DiscoverEventsPage = () => {
  return (
    <div className='w-full'>
      <div className='mt-4'>
        <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
          Discover Events
        </h1>
        <p className='mt-2 font-display tracking-tight text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>

      <PopularEventsList />
    </div>
  );
};
