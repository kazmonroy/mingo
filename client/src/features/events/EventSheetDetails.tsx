import {
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Loader2Icon, MoveUpRight } from 'lucide-react';
import { UpdateEventForm } from './updateEvent/UpdateEventForm';
import { Link } from 'react-router';
import { MapComponent } from '@/components/MapComponent';
import { getAddress, getVenue } from '@/lib/utils';

import type { Dispatch, SetStateAction } from 'react';
import { useEventDetails } from '@/api/apiEvents';
import { useEventStore } from '@/store/eventStore';

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
          </>
        )}
      </div>
    </>
  );
};
