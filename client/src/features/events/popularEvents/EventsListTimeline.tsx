import { format } from 'date-fns';
import type { Event } from '@/lib/types';
import { EventCardWithDetails } from './EventCardWithDetails';

interface EventsTimelineProps {
  events: Event[];
}

export const EventsListTimeline = ({ events }: EventsTimelineProps) => {
  const currentEvents = events.filter(
    (event) => event.date >= format(new Date(), 'yyyy-MM-dd')
  );
  // Group events by date
  const groupedEvents = currentEvents.reduce<Record<string, Event[]>>(
    (acc, event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dateKey;
      // Compare dates ignoring time
      const eventDateWithoutTime = new Date(eventDate);
      eventDateWithoutTime.setHours(0, 0, 0, 0);

      if (eventDateWithoutTime.getTime() === today.getTime()) {
        dateKey = 'today';
      } else if (eventDateWithoutTime.getTime() === tomorrow.getTime()) {
        dateKey = 'tomorrow';
      } else {
        // Format as "DD MMM" (e.g., "11 Oct")
        dateKey = `${eventDate.getDate()} ${eventDate.toLocaleString(
          'default',
          {
            month: 'short',
          }
        )}`;
      }

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);

      return acc;
    },
    {}
  );

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='space-y-8'>
        {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => {
          const firstEvent = dateEvents[0];
          const dayName = format(firstEvent.date, 'EEEE');
          const displayDate =
            dateKey === 'today'
              ? 'today'
              : dateKey === 'tomorrow'
              ? 'tomorrow'
              : dateKey;

          return (
            <div key={dateKey} className='relative'>
              {/* Date header with vertical line */}
              <div className='flex items-center mb-4'>
                <div className='size-2 rounded-full bg-zinc-300 z-10'></div>
                <h2 className='ml-4 text-md font-medium'>
                  <span className='font-medium'>{displayDate}</span>
                  <span className='text-muted-foreground ml-2'>{dayName}</span>
                </h2>
              </div>

              {/* Vertical line */}
              <div className='absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200 -z-10'></div>

              {/* Events for this date */}
              <div className='ml-6 space-y-6'>
                {dateEvents.map((event) => (
                  <EventCardWithDetails key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
