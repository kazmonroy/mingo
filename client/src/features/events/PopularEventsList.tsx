import { EventCard } from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/api/apiEvents';
export const PopularEventsList = () => {
  const { events, isLoading } = useEvents();

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
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => PopularEventsList.Skeleton(index))
          : events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </>
  );
};

PopularEventsList.Skeleton = (id: number) => {
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
