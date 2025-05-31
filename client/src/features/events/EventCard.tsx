import { format } from 'date-fns';
import type { Event } from '@/lib/types';

export const EventCard = ({ event }: { event: Event }) => {
  return (
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
  );
};
