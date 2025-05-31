import type { Event } from '@/lib/types';
import { PopularEventsList } from './PopularEventsList';

export const EventDashboard = ({ events }: { events: Event[] }) => {
  return (
    <div>
      <PopularEventsList events={events} />
    </div>
  );
};
