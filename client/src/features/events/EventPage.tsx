import { useEventDetails } from '@/api/apiEvents';
import { MapComponent } from '@/components/MapComponent';
import { getAddress, getVenue } from '@/lib/utils';
import { format } from 'date-fns';
import { MapPinCheckInside } from 'lucide-react';
import { useParams } from 'react-router';

export const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { event } = useEventDetails(id ?? '');
  return (
    <div className='w-full space-y-8 grid grid-cols-1 lg:grid-cols-2 mt-4 items-start'>
      <div className='size-80 rounded-md overflow-hidden mx-auto'>
        <img src='./images/1.jpg' alt='' />
      </div>

      <div className='space-y-4'>
        <h1 className='text-4xl font-semibold'>{event?.title}</h1>

        <div className='flex gap-2 items-center'>
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
              {event?.date ? format(new Date(event.date), 'EEEE d MMMM') : null}
            </span>

            <span className='text-sm'>
              {event?.date ? format(new Date(event.date), 'HH:mm') : null}
            </span>
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <div className='rounded-md border flex flex-col items-center justify-center w-10 h-10 overflow-hidden'>
            <MapPinCheckInside className='size-5 text-zinc-400' />
          </div>

          <div className='flex flex-col flex-1'>
            <span className='font-semibold '>
              {event?.venue ? getVenue(event.venue) : 'Venue not specified'}
            </span>

            <span className='text-sm'>
              {event?.city ? event.city : 'City not specified'}
            </span>
          </div>
        </div>

        <section>
          <div className='border-b pb-2 mb-3 flex items-center justify-between'>
            <h2 className='text-sm font-semibold'>About</h2>
          </div>
          <p className='text-md text-zinc-600'>
            {event?.description
              ? event.description
              : 'No description available.'}
          </p>
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
    </div>
  );
};
