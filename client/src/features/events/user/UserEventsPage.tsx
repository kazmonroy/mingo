import { useUserEvents } from '@/api/apiEvents';

export const UserEventsPage = () => {
  const { userEvents, isLoading } = useUserEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('User Events:', userEvents);
  return (
    <div>
      <h1>User Events</h1>
    </div>
  );
};
