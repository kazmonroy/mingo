import type { Event } from '@/lib/types';
export const EventDashboard = ({ events }: { events: Event[] }) => {
  return (
    <div>
      <div className='mt-4'>
        <h2 className='font-display text-2xl font-medium tracking-tighter'>
          Popular Events
        </h2>
        <p className='font-display tracking-tight text-muted-foreground'>
          Lorem ipsum dolor.
        </p>
      </div>
      <div className='grid grid-cols-2'>
        {events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
