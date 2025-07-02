import { useState } from 'react';
import { format } from 'date-fns';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDeleteEvent } from '@/api/apiEvents';
import type { Event } from '@/lib/types/index';
import { EventSheetDetails } from './EventSheetDetails';
import { useEventStore } from '@/store/eventStore';
export const EventCard = ({ event }: { event: Event }) => {
  const [isEditing, setIsEditing] = useState(false);
  const setEventId = useEventStore((state) => state.setEventId);

  const { deleteEvent, isPending } = useDeleteEvent();

  return (
    <Sheet key={event.id}>
      <SheetTrigger
        className='cursor-pointer'
        onClick={() => setEventId(event?.id ?? '')}
      >
        <div className='flex items-center gap-4'>
          <div className='bg-zinc-100 size-18 rounded-md overflow-hidden'>
            <img
              src='./images/1.jpg'
              alt=''
              className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
            />
          </div>
          <div className='flex flex-col items-start'>
            <h2 className='font-medium'>{event.title}</h2>
            <p className='font-mono text-muted-foreground text-sm'>
              {format(event.date, 'EEE, d MMM, yyyy')}
            </p>
            <p className='text-muted-foreground'>{event.description}</p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <EventSheetDetails
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          deleteEvent={deleteEvent}
          isPending={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
