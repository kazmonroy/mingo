import { format } from 'date-fns';
import type { Event } from '@/lib/types';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { EventSheetDetails } from '../eventSheetDetails/EventSheetDetails';
import { useEventStore } from '@/store/eventStore';
import { UserEventCard } from './UserEventCard';

export const UserEventsListTimeline = ({ events }: { events: Event[] }) => {
  const setEventId = useEventStore((state) => state.setEventId);

  // Group events by date
  const groupedEvents = events.reduce<Record<string, Event[]>>((acc, event) => {
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
      dateKey = `${eventDate.getDate()} ${eventDate.toLocaleString('default', {
        month: 'short',
      })}`;
    }

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);

    return acc;
  }, {});

  return (
    <>
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
          <div key={dateKey} className='relative space-y-4 mb-4'>
            <div className='flex items-center'>
              <div className='size-2 rounded-full bg-border/80 z-10'></div>
              <h2 className='ml-4 text-md font-medium'>
                <span className='font-medium'>{displayDate}</span>
                <span className='text-muted-foreground ml-2'>{dayName}</span>
              </h2>
            </div>

            <div
              className='absolute left-[3.5px] top-3 w-[2px] border-l border-dashed h-[calc(100%-12px)]'
              aria-hidden='true'
            ></div>

            <div className='ml-6 space-y-6'>
              {dateEvents.map((event) => (
                <Sheet key={event.id}>
                  <SheetTrigger
                    className='cursor-pointer'
                    onClick={() => setEventId(event?.id ?? '')}
                  >
                    <UserEventCard key={event.id} event={event} />
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
    </>
  );
};
