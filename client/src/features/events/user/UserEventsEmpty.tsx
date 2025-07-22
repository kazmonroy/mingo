import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const UserEventsEmpty = () => {
  return (
    <div className='space-y-4 p-8 text-center'>
      <div className='w-full max-w-[200px] aspect-square flex justify-center items-center text-center m-auto'>
        <img
          src='/empty-calendar.svg'
          alt='No upcoming events'
          className='w-full h-full object-cover'
        />
      </div>

      <h3 className='text-muted-foreground text-2xl font-semibold'>
        No Upcoming Events
      </h3>
      <p className='text-muted-foreground'>
        You have no upcoming events. Why not host one?
      </p>
      <Button size='sm' className='mt-4'>
        <Plus className='size-4' />
        Create event
      </Button>
    </div>
  );
};
