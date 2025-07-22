import { useSearchParams } from 'react-router';
import type { Period } from '@/lib/types';
import { useUserEvents } from '@/api/apiEvents';
import { UserEventsListTimeline } from './UserEventsListTimeline';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <UserEventsListTimeline events={userEvents} />
    </div>
  );
};
