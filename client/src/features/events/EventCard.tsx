import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { Event } from '@/lib/types/index';
import { EventSheetDetails } from './eventSheetDetails/EventSheetDetails';
import { useEventStore } from '@/store/eventStore';
import { formatDate } from '@/lib/utils';
export const EventCard = ({ event }: { event: Event }) => {
  const setEventId = useEventStore((state) => state.setEventId);
  const shortVenue = event.venue?.split(',')[0];

  return (
    <Sheet key={event.id}>
      <SheetTrigger
        className='cursor-pointer'
        onClick={() => setEventId(event?.id ?? '')}
      >
        <div className='flex items-center gap-4'>
          <div className='w-auto size-18 flex-shrink-0 rounded-md overflow-hidden'>
            <img
              src='./images/1.jpg'
              alt=''
              className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
            />
          </div>
          <div className='flex flex-col items-start'>
            <h2 className='font-medium'>{event.title}</h2>
            <p className='text-muted-foreground text-sm'>
              {formatDate(event.date)}
            </p>
            <p className='text-muted-foreground text-sm text-left'>
              {shortVenue}
            </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <EventSheetDetails />
      </SheetContent>
    </Sheet>
  );
};
