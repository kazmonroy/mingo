import type { Event } from '@/lib/types';
import { PopularEventsList } from './PopularEventsList';

export const EventDashboard = ({
  events,
  handleSubmitForm,
}: {
  events: Event[];
  handleSubmitForm: (event: Event) => void;
}) => {
  return (
    <div>
      <PopularEventsList events={events} handleSubmitForm={handleSubmitForm} />
    </div>
  );
};
