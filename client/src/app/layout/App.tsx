import { EventDashboard } from '@/features/events/EventDashboard';
import { CreateEventForm } from '@/features/events/CreateEventForm';

function App() {
  return (
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

        <EventDashboard />

        <CreateEventForm />
      </div>
    </main>
  );
}

export default App;
