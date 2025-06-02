import { useEventDetails } from '@/api/apiEvents';
import { useParams } from 'react-router';

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { event } = useEventDetails(id ?? '');
  return (
    <div>
      <p>{event?.id}</p>
      <h1>{event?.title}</h1>
    </div>
  );
};
