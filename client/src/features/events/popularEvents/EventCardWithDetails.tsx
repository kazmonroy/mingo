import { format, parseISO } from 'date-fns';
import { MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Event } from '@/lib/types/index';
import { getCategoryColor } from '@/lib/utils';
export const EventCardWithDetails = ({ event }: { event: Event }) => {
  return (
    <div
      key={event.id}
      className='p-3 flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden border border-transparent hover:border-zinc-200 transition-border duration-300'
    >
      <div className='flex-1'>
        <div className='text-muted-foreground mb-1 text-left'>
          {format(parseISO(event.date), 'HH:mm')}
        </div>
        <h3 className='text-xl font-semibold mb-2 text-left'>{event.title}</h3>

        <div className='flex flex-wrap items-center mb-2 '>
          <Avatar className='h-6 w-6'>
            <AvatarFallback className='text-xs bg-gray-300'>
              {event
                .hostDisplayName!.split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className='ml-2 text-muted-foreground text-sm'>
            By {event.hostDisplayName}
          </span>
        </div>

        <div className='flex items-center text-muted-foreground text-sm'>
          <MapPin className='h-4 w-4 mr-1' />
          {event.venue}
        </div>

        <div className='mt-3 flex items-center gap-3'>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>

          {event.attendees && event.attendees.length > 0 && (
            <div className='flex -space-x-2'>
              {event.attendees.slice(0, 5).map((attendee, index) => (
                <Avatar key={index} className='h-6 w-6 border-2 border-white'>
                  <AvatarImage src={attendee.imageUrl} />
                  <AvatarFallback className='text-xs bg-gray-300'>
                    {attendee.displayName?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
              ))}
              {event.attendees.length > 5 && (
                <div className='h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground border-2 border-white'>
                  +{event.attendees.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='md:w-32 md:h-32 h-24 flex-shrink-0 self-center md:self-auto rounded-md overflow-hidden'>
        <img
          src='./images/1.jpg'
          alt={event.title}
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};
