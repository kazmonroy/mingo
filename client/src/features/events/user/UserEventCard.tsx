import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { format, parseISO } from 'date-fns';
import { MapPin, MoveRight, TriangleAlert, UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/types/index';
export const UserEventCard = ({ event }: { event: Event }) => {
  const hasVenue = Boolean(event.venue);
  return (
    <div
      key={event.id}
      className='p-3 w-lg flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden border border-transparent hover:border-zinc-200 transition-border duration-300'
    >
      <div className='flex-1 space-y-2 text-left'>
        <div className='text-muted-foreground mb-1 text-left'>
          {format(parseISO(event.date), 'HH:mm')}
        </div>
        <h3 className='text-xl font-semibold mb-2 text-left'>{event.title}</h3>

        <div
          className={cn(
            'text-sm',
            hasVenue ? 'text-muted-foreground' : 'text-amber-500'
          )}
        >
          <span className='flex items-center gap-1'>
            {hasVenue ? (
              <>
                <MapPin className='size-4' />
                {event.venue}
              </>
            ) : (
              <>
                <TriangleAlert className='size-4' />
                Location missing
              </>
            )}
          </span>
        </div>

        <div className='flex items-center gap-3'>
          {event.attendees && event.attendees.length > 0 ? (
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
          ) : (
            <span className='flex items-center gap-1'>
              <UsersRound className='size-4' />
              No guests
            </span>
          )}
        </div>

        <Button size='sm' variant='secondary' className='mt-2' asChild>
          <Link to={`/events/${event.id}`}>
            Manage event
            <MoveRight className='size-4' />
          </Link>
        </Button>
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
