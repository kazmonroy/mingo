import type { Event } from '@/lib/types';
import { PopularEventsList } from './PopularEventsList';

export const EventDashboard = ({
  handleSubmitForm,
}: {
  handleSubmitForm: (event: Event) => void;
}) => {
  return (
    <div>
      <PopularEventsList handleSubmitForm={handleSubmitForm} />
    </div>
  );
};
