import { useState } from 'react';
import { format } from 'date-fns';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Loader2Icon, MoveUpRight } from 'lucide-react';

import { UpdateEventForm } from './updateEvent/UpdateEventForm';
import { useDeleteEvent, useEventDetails } from '@/api/apiEvents';
import { Link } from 'react-router';
import { getAddress, getVenue } from '@/lib/utils';
import { MapComponent } from '@/components/MapComponent';
export const EventCard = ({ eventId }: { eventId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { event, isLoading } = useEventDetails(eventId ?? '');
  const { deleteEvent, isPending } = useDeleteEvent();

  const handleOnEdit = () => setIsEditing((prev) => !prev);

  console.log('EventCard', event);

  if (isLoading || !event) {
    return (
      <div className='flex items-center justify-center h-24'>
        <p className='text-muted-foreground'>Loading event...!!!!</p>
      </div>
    );
  }

  return (
    <Sheet key={eventId}>
      <SheetTrigger className='cursor-pointer'>
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
        <SheetTitle />
        <SheetHeader className='border-b'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <SheetClose asChild>
                <Button variant='ghost' size='icon'>
                  <ChevronsRight />
                </Button>
              </SheetClose>

              <Button size='sm' asChild>
                <Link
                  to={`/${event.id}`}
                  className='flex items-center gap-2 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90'
                >
                  Event page
                  <MoveUpRight />
                </Link>
              </Button>
            </div>

            <div className='flex gap-2'>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => deleteEvent(event.id ?? '')}
              >
                {isPending ? (
                  <>
                    <Loader2Icon className='animate-spin' />
                    'Deleting...'
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
              <Button variant='ghost' size='sm' onClick={handleOnEdit}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </div>
        </SheetHeader>
        <div className='p-4 pt-0 max-h-[calc(100vh-80px)] overflow-y-auto'>
          {isEditing ? (
            <>
              <UpdateEventForm event={event} />
            </>
          ) : (
            <>
              <div className='my-8'>
                <div className='size-72 rounded-md overflow-hidden mx-auto'>
                  <img src='./images/1.jpg' alt='' />
                </div>
              </div>

              <SheetTitle className='text-2xl'>{event?.title}</SheetTitle>
              <SheetDescription>{event?.description}</SheetDescription>
              <section>
                <div className='border-b pb-2 mb-3 flex items-center justify-between'>
                  <h2 className='text-sm font-semibold'>Location</h2>
                </div>
                <p className='text-md font-semibold text-zinc-600'>
                  {event?.venue ? getVenue(event.venue) : 'Venue not specified'}
                </p>
                <p className='text-sm text-zinc-500'>
                  {event?.venue
                    ? getAddress(event.venue)
                    : 'Venue not specified'}
                </p>

                {event?.latitude && event?.longitude && (
                  <div className='rounded-md mt-4 overflow-hidden'>
                    <MapComponent
                      latitude={event?.latitude ?? 0}
                      longitude={event?.longitude ?? 0}
                    />
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
