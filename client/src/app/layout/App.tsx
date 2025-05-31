import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Event } from '@/lib/types';
import { NavBar } from './NavBar';
import { EventDashboard } from '@/features/events/EventDashboard';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get<Event[]>(
        'https://localhost:5001/api/events'
      );
      const { data } = response;
      setEvents(data);
    };

    fetchEvents();
    return () => {};
  }, []);

  console.log(events);

  return (
    <div className='flex w-full flex-col min-h-screen'>
      <NavBar />
      <main className='relative mx-auto flex w-full max-w-4xl flex-auto justify-center px-4 lg:px-8 xl:px-12'>
        <div className='w-full'>
          <div className='mt-4'>
            <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
              Discover Events
            </h1>
            <p className='mt-2 font-display tracking-tight text-muted-foreground'>
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>

          <EventDashboard events={events} />
        </div>
      </main>
    </div>
  );
}

export default App;
