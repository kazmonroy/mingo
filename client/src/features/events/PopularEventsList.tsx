import type { Event } from '@/lib/types';
import { EventCard } from './EventCard';
export const PopularEventsList = ({ events }: { events: Event[] }) => {
  return (
    <>
      <div className='mt-4'>
        <h2 className='font-display text-2xl font-medium tracking-tighter'>
          Popular Events
        </h2>
        <p className='font-display tracking-tight text-muted-foreground'>
          Lorem ipsum dolor.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </>
  );
};
