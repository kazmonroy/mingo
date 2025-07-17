import { Link } from 'react-router';
import { MoveRight } from 'lucide-react';
import { useEvents } from '@/api/apiEvents';
import { EventCard } from '@/features/events/EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export const PopularEventsSection = () => {
  const { eventsGroup, isLoading } = useEvents();
  return (
    <section className='mt-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-display text-2xl font-medium tracking-tighter'>
          Popular Events
        </h2>

        <Button variant='secondary' size='sm' asChild>
          <Link to='/popular-events'>
            View All
            <MoveRight />
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {Array(4)
            .fill(null)
            .map((_, index) => PopularEventsSection.Skeleton(index))}
        </div>
      ) : (
        <div>
          {eventsGroup?.pages.map((events, index) => (
            <div key={index} className='grid grid-cols-2 gap-4 mt-4'>
              {events.items.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

PopularEventsSection.Skeleton = (id: number) => {
  return (
    <div key={id} className='flex gap-4'>
      <Skeleton className='w-22 rounded-md' />
      <div className='flex flex-col gap-2 w-full'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-1/2' />
      </div>
    </div>
  );
};
