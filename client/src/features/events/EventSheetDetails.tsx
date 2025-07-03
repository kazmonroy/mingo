import {
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  ChevronsRight,
  Loader2Icon,
  MapPinCheckInside,
  MoveUpRight,
} from 'lucide-react';
import { UpdateEventForm } from './updateEvent/UpdateEventForm';
import { Link } from 'react-router';
import { MapComponent } from '@/components/MapComponent';
import { getAddress, getVenue } from '@/lib/utils';

import type { Dispatch, SetStateAction } from 'react';
import { useEventDetails } from '@/api/apiEvents';
import { useEventStore } from '@/store/eventStore';
import { format } from 'date-fns';

interface EventSheetDetailsProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  deleteEvent: (id: string) => void;
  isPending: boolean;
}

export const EventSheetDetails = ({
  isEditing,
  setIsEditing,
  deleteEvent,
  isPending,
}: EventSheetDetailsProps) => {
  const handleOnEdit = () => setIsEditing((prev) => !prev);
  const eventId = useEventStore((state) => state.eventId);
  const { event, isLoading } = useEventDetails(eventId ?? '');

  if (isLoading || !event) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
                to={`/${event?.id}`}
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
              onClick={() => deleteEvent(event?.id ?? '')}
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
          <UpdateEventForm event={event} />
        ) : (
          <div className='space-y-4'>
            <div className='my-8'>
              <div className='size-72 rounded-md overflow-hidden mx-auto'>
                <img src='./images/1.jpg' alt='' />
              </div>
            </div>

            <section>
              <SheetTitle className='text-3xl'>{event?.title}</SheetTitle>
              <p>Hosted by XYZ </p>
            </section>

            <section className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              <div className='flex gap-3 items-center'>
                <div className='rounded-md border flex flex-col items-center justify-center size-10 overflow-hidden'>
                  <span className='uppercase text-[8px] bg-muted inline-flex w-full h-full justify-center'>
                    {event?.date ? format(new Date(event.date), 'MMM') : null}
                  </span>
                  <span>
                    {event?.date ? format(new Date(event.date), 'd') : null}
                  </span>
                </div>

                <div className='flex flex-col'>
                  <span className='font-semibold '>
                    {event?.date
                      ? format(new Date(event.date), 'EEEE d MMMM')
                      : null}
                  </span>

                  <span className='text-sm'>
                    {event?.date ? format(new Date(event.date), 'HH:mm') : null}
                  </span>
                </div>
              </div>

              <div className='flex gap-3 items-center'>
                <div className='rounded-md border flex flex-col items-center justify-center w-10 h-10 overflow-hidden'>
                  <MapPinCheckInside className='size-5 text-zinc-400' />
                </div>

                <div className='flex flex-col flex-1'>
                  <span className='font-semibold '>
                    {event?.venue
                      ? getVenue(event.venue)
                      : 'Venue not specified'}
                  </span>

                  <span className='text-sm'>
                    {event?.city ? event.city : 'City not specified'}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <div className='border-b pb-2 mb-3 flex items-center justify-between'>
                <h2 className='text-sm font-semibold'>About Event</h2>
              </div>
              <SheetDescription>{event?.description}</SheetDescription>
            </section>
            <section>
              <div className='border-b pb-2 mb-3 flex items-center justify-between'>
                <h2 className='text-sm font-semibold'>Location</h2>
              </div>
              <p className='text-md font-semibold text-zinc-600'>
                {event?.venue ? getVenue(event.venue) : 'Venue not specified'}
              </p>
              <p className='text-sm text-zinc-500'>
                {event?.venue ? getAddress(event.venue) : 'Venue not specified'}
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
          </div>
        )}
      </div>
    </>
  );
};
