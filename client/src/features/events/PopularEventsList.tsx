import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useEvents } from '@/api/apiEvents';
import { useCurrentUser } from '@/api/apiAuth';
import { PopularEventsCover } from './popularEvents/PopularEventsCover';
import { EventsListTimeline } from './popularEvents/EventsListTimeline';

export const PopularEventsList = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { eventsGroup, fetchNextPage, hasNextPage } = useEvents();

  const { isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <div className='mt-4 w-full'>
        <PopularEventsCover />

        <div className='mt-8'>
          <h2 className='font-display text-2xl font-medium tracking-tighter'>
            Events
          </h2>

          <div className='w-full max-w-4xl mx-auto'>
            <div className='space-y-4'>
              {eventsGroup?.pages.map((events, index) => (
                <div
                  key={index}
                  ref={index === eventsGroup.pages.length - 1 ? ref : null}
                  className='flex flex-col gap-4 mt-4'
                >
                  <EventsListTimeline events={events.items ?? []} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
