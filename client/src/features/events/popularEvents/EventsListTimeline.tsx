import { format } from 'date-fns';
import type { Event } from '@/lib/types';
import { EventCardWithDetails } from './EventCardWithDetails';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { EventSheetDetails } from '../eventSheetDetails/EventSheetDetails';
import { useEventStore } from '@/store/eventStore';

interface EventsTimelineProps {
  events: Event[];
}

export const EventsListTimeline = ({ events }: EventsTimelineProps) => {
  const setEventId = useEventStore((state) => state.setEventId);
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
      <div className='space-y-4'>
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
            <div key={dateKey} className='relative space-y-4'>
              {/* Date header with vertical line */}
              <div className='flex items-center'>
                <div className='size-2 rounded-full bg-border/80 z-10'></div>
                <h2 className='ml-4 text-md font-medium'>
                  <span className='font-medium'>{displayDate}</span>
                  <span className='text-muted-foreground ml-2'>{dayName}</span>
                </h2>
              </div>

              {/* Vertical line */}
              <div className='absolute left-[3px] top-3 bottom-0 w-[2px] bg-border/80 z-0'></div>

              {/* Events for this date */}
              <div className='ml-6 space-y-6'>
                {dateEvents.map((event) => (
                  <Sheet key={event.id}>
                    <SheetTrigger
                      className='cursor-pointer w-lg'
                      onClick={() => setEventId(event?.id ?? '')}
                    >
                      <EventCardWithDetails key={event.id} event={event} />
                    </SheetTrigger>
                    <SheetContent aria-describedby={undefined}>
                      <EventSheetDetails />
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
