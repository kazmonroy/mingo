import type { Event } from '@/lib/types';
import { format } from 'date-fns';

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
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {events.map((event) => (
          <div key={event.id} className='flex items-center gap-4'>
            <div className='bg-zinc-100 size-18 rounded-md'></div>

            <div>
              <h2 className='font-medium'>{event.title}</h2>
              <p className='font-mono text-muted-foreground text-sm'>
                {format(event.date, 'EEE, d MMM, yyyy')}
              </p>
              <p className='text-muted-foreground'>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
