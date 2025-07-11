import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCurrentEventDetails } from './useCurrentEventDetails';
import { useUpdateAttendance } from '@/api/apiEvents';

export const ManageAttendance = () => {
  const { event } = useCurrentEventDetails();
  const { updateAttendance, isPendingAttendance } = useUpdateAttendance();

  const handleAttendance = async () => {
    if (event?.id) {
      await updateAttendance(event.id);
    }
  };

  return (
    <section>
      <Card className='p-0 overflow-hidden gap-4'>
        <CardHeader className='py-2 px-4 bg-muted items-center gap-0'>
          <CardTitle className='text-sm'>Registration</CardTitle>
        </CardHeader>
        <CardContent className='px-4 space-y-4 pb-4'>
          {event?.isGoing ? (
            <>
              <p> Woho! You are going to this event!</p>

              <Button className='w-full' onClick={handleAttendance}>
                {isPendingAttendance ? 'Canceling...' : 'Cancel attendace'}
              </Button>
            </>
          ) : (
            <>
              <p> Welcome! To join the event, please register below.</p>
              <Button className='w-full' onClick={handleAttendance}>
                {isPendingAttendance ? 'Joining...' : 'Join event'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
