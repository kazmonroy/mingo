import type { Period } from '@/lib/types';
import { useUserEvents } from '@/api/apiEvents';
import { UserEventsListTimeline } from './UserEventsListTimeline';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const UserEventsPage = () => {
  const [period, setPeriod] = useState<Period>('');
  const { userEvents, isLoading } = useUserEvents(period);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('PERIOD', period);

  return (
    <div>
      <div className='my-4 flex items-center justify-between'>
        <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
          Events
        </h1>

        <Tabs
          defaultValue={''}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <TabsList>
            <TabsTrigger value={''}>Upcoming</TabsTrigger>
            <TabsTrigger value='past'>Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <UserEventsListTimeline events={userEvents} />
    </div>
  );
};
