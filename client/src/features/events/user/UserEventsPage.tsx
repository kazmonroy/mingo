import { useSearchParams } from 'react-router';
import type { Period } from '@/lib/types';
import { useUserEvents } from '@/api/apiEvents';
import { UserEventsListTimeline } from './UserEventsListTimeline';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export const UserEventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = (searchParams.get('period') as Period) ?? '';
  const { userEvents, isLoading } = useUserEvents(period);

  const handlePeriodChange = (value: string) => {
    if (value === '') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('period');
      setSearchParams(newParams);
    } else {
      setSearchParams({ period: value });
    }
  };

  return (
    <div className='w-full'>
      <div className='my-4 flex items-center justify-between'>
        <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
          Events
        </h1>

        <Tabs value={period} onValueChange={handlePeriodChange}>
          <TabsList>
            <TabsTrigger value={''}>Upcoming</TabsTrigger>
            <TabsTrigger value='past'>Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        UserEventsPage.UserEventsListSkeleton()
      ) : (
        <UserEventsListTimeline events={userEvents} />
      )}
    </div>
  );
};

UserEventsPage.UserEventsListSkeleton = () => {
  return (
    <div className='space-y-8'>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className='relative'>
          {/* Date header with dot */}
          <div className='flex items-center'>
            <div className='size-2 rounded-full bg-border/80' />
            <div className='ml-4 flex gap-2'>
              <Skeleton className='h-6 w-20' /> {/* Date */}
              <Skeleton className='h-6 w-24' /> {/* Day */}
            </div>
          </div>

          {/* Vertical line */}
          <div
            className='absolute left-[3px] top-2 w-[2px] border-l border-dashed h-[calc(100%-12px)]'
            aria-hidden='true'
          />

          <div className='ml-6 space-y-6 mt-4'>
            {[1].map((eventIndex) => (
              <div
                key={eventIndex}
                className='p-3 flex items-center gap-4 bg-card rounded-lg  h-32 w-[520px] '
              >
                {/* Content */}
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-6 w-3/4' /> {/* Title */}
                  <Skeleton className='h-4 w-1/3' /> {/* Date */}
                  <Skeleton className='h-4 w-1/2' /> {/* Venue */}
                </div>

                {/* Image placeholder */}
                <Skeleton className='size-24 rounded-md' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
