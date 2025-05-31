import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import type { Event } from '../../lib/types';
import axios from 'axios';
import { NavBar } from './NavBar';

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
    <>
      <NavBar />
      <h1 className='text-3xl font-bold text-red-500'>Mingo!</h1>
      <Button>Click me</Button>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
