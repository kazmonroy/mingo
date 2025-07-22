import { useUserEvents } from '@/api/apiEvents';
import { UserEventsListTimeline } from './UserEventsListTimeline';

export const UserEventsPage = () => {
  const { userEvents, isLoading } = useUserEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='my-4'>
        <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
          Events
        </h1>
      </div>
      <UserEventsListTimeline events={userEvents} />
    </div>
  );
};
