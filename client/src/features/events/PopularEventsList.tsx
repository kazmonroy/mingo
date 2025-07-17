import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { Loader2Icon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { EventCard } from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/api/apiEvents';
import { useCurrentUser } from '@/api/apiAuth';
import { Button } from '@/components/ui/button';
export const PopularEventsList = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    eventsGroup,
    isLoading: isLoadingEvents,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useEvents();

  const { isAuthenticated, isLoading: isLoadingUser } = useCurrentUser();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  const isLoading = isLoadingEvents || isLoadingUser;
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
      <div>
        {isLoading ? (
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {Array(4)
              .fill(null)
              .map((_, index) => PopularEventsList.Skeleton(index))}
          </div>
        ) : (
          <div>
            {eventsGroup?.pages.map((events, index) => (
              <div
                key={index}
                ref={index === eventsGroup.pages.length - 1 ? ref : null}
                className='grid grid-cols-2 gap-4 mt-4'
              >
                {events.items.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='mt-8 flex justify-center'>
        <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          {isFetchingNextPage && <Loader2Icon className='animate-spin' />}
          Load more events
        </Button>
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
