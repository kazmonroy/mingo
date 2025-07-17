import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useEvents } from '@/api/apiEvents';
import { useCurrentUser } from '@/api/apiAuth';
import { PopularEventsCover } from './popularEvents/PopularEventsCover';
import { EventCardWithDetails } from './popularEvents/EventCardWithDetails';

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

        <div className='mt-4'>
          <h2 className='font-display text-2xl font-medium tracking-tighter'>
            Events
          </h2>

          <div>
            {eventsGroup?.pages.map((events, index) => (
              <div
                key={index}
                ref={index === eventsGroup.pages.length - 1 ? ref : null}
                className='flex flex-col gap-4 mt-4'
              >
                {events.items.map((event) => (
                  <EventCardWithDetails key={event.id} event={event} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
