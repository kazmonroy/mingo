import type { Event } from '@/lib/types/index';
import { format, parseISO } from 'date-fns';
import { MapPin } from 'lucide-react';
export const EventCardWithDetails = ({ event }: { event: Event }) => {
  return (
    <div
      key={event.id}
      className='p-3 max-w-lg rounded-md bg-white flex items-center gap-4 border border-white hover:border-zinc-200 cursor-pointer transition-border duration-300'
    >
      <div className='flex-1 space-y-1.5'>
        <p className='text-muted-foreground'>
          {format(parseISO(event.date), 'HH:mm')}
        </p>
        <h3 className='text-xl font-semibold'> {event.title}</h3>
        <p className='text-muted-foreground '>{event.hostDisplayName}</p>
        <p className='text-muted-foreground flex gap-2 items-center'>
          <MapPin className='size-4' />
          {event.venue}
        </p>
      </div>
      <div className='size-28 rounded-md overflow-hidden'>
        <img
          src='./images/1.jpg'
          alt=''
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};
