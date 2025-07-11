import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { AttendeeProfile } from '@/lib/types';

interface AttendeesListProps {
  attendees: AttendeeProfile[];
  totalAttendees: number;
  maxAvatarsToShow?: number;
}
export const AttendeesList = ({
  attendees,
  totalAttendees,
  maxAvatarsToShow = 6,
}: AttendeesListProps) => {
  const namesToShow = attendees.slice(0, 2).map((a) => a.displayName);
  const othersCount = totalAttendees - namesToShow.length;
  const subtitle =
    othersCount > 0
      ? `${namesToShow.join(', ')} and ${othersCount} others`
      : namesToShow.join(', ');

  return (
    <>
      <div className='flex items-center mb-3'>
        {attendees.slice(0, maxAvatarsToShow).map((attendee) => (
          <Tooltip key={attendee.id}>
            <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-1 *:data-[slot=avatar]:grayscale'>
              <TooltipTrigger asChild>
                <Avatar className='size-6 border shadow-md'>
                  <AvatarImage
                    src={attendee.imageUrl ?? './avatar_fallback.avif'}
                    alt={attendee.displayName}
                  />
                  <AvatarFallback className='text-sm'>
                    {attendee.displayName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{attendee.displayName}</p>
              </TooltipContent>
            </div>
          </Tooltip>
        ))}
      </div>
      <div className='text-sm font-medium text-muted-foreground'>
        {subtitle}
      </div>
    </>
  );
};
