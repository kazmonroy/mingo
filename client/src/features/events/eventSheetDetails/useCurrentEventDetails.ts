import { useEventStore } from '@/store/eventStore';
import { useEventDetails } from '@/api/apiEvents';

export const useCurrentEventDetails = () => {
  const eventId = useEventStore((state) => state.eventId);
  const { event, isLoading } = useEventDetails(eventId ?? '');

  return {
    event,
    isLoading,
    eventId,
  };
};
