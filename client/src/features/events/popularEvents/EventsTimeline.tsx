import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import type { Event } from '@/lib/types';

interface EventsTimelineProps {
  events: Event[];
}

export function EventsTimeline({ events }: EventsTimelineProps) {
  // Group events by date
  const groupedEvents = events.reduce<Record<string, Event[]>>((acc, event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateKey;
    // Compare dates ignoring time
    const eventDateWithoutTime = new Date(eventDate);
    eventDateWithoutTime.setHours(0, 0, 0, 0);

    if (eventDateWithoutTime.getTime() === today.getTime()) {
      dateKey = 'today';
    } else if (eventDateWithoutTime.getTime() === tomorrow.getTime()) {
      dateKey = 'tomorrow';
    } else {
      // Format as "DD MMM" (e.g., "11 Oct")
      dateKey = `${eventDate.getDate()} ${eventDate.toLocaleString('default', {
        month: 'short',
      })}`;
    }

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);

    return acc;
  }, {});

  // Get day name
  const getDayName = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Format time (e.g., 14:00)
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Get a placeholder color for category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      drinks: 'bg-blue-100 text-blue-700',
      culture: 'bg-purple-100 text-purple-700',
      music: 'bg-pink-100 text-pink-700',
      travel: 'bg-green-100 text-green-700',
      food: 'bg-yellow-100 text-yellow-700',
      film: 'bg-red-100 text-red-700',
    };

    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='space-y-8'>
        {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => {
          const firstEvent = dateEvents[0];
          const dayName = getDayName(firstEvent.date);
          const displayDate =
            dateKey === 'today'
              ? 'today'
              : dateKey === 'tomorrow'
              ? 'tomorrow'
              : dateKey;

          return (
            <div key={dateKey} className='relative'>
              {/* Date header with vertical line */}
              <div className='flex items-center mb-4'>
                <div className='size-2 rounded-full bg-zinc-300 z-10'></div>
                <h2 className='ml-4 text-md font-medium'>
                  <span className='font-medium'>{displayDate}</span>
                  <span className='text-muted-foreground ml-2'>{dayName}</span>
                </h2>
              </div>

              {/* Vertical line */}
              <div className='absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200 -z-10'></div>

              {/* Events for this date */}
              <div className='ml-6 space-y-6'>
                {dateEvents.map((event) => (
                  <div
                    key={event.id}
                    className='p-3 flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden border border-transparent hover:border-zinc-200 transition-border duration-300'
                  >
                    <div className='flex-1'>
                      <div className='text-gray-500 mb-1'>
                        {formatTime(event.date)}
                      </div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {event.title}
                      </h3>

                      <div className='flex flex-wrap items-center mb-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarFallback className='text-xs bg-gray-300'>
                            {event
                              .hostDisplayName!.split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className='ml-2 text-gray-500 text-sm'>
                          By {event.hostDisplayName}
                        </span>
                      </div>

                      <div className='flex items-center text-gray-500 text-sm'>
                        <MapPin className='h-4 w-4 mr-1' />
                        {event.venue}
                      </div>

                      <div className='mt-3 flex items-center gap-3'>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                            event.category
                          )}`}
                        >
                          {event.category}
                        </span>

                        {event.attendees && event.attendees.length > 0 && (
                          <div className='flex -space-x-2'>
                            {event.attendees
                              .slice(0, 5)
                              .map((attendee, index) => (
                                <Avatar
                                  key={index}
                                  className='h-6 w-6 border-2 border-white'
                                >
                                  <AvatarImage src={attendee.imageUrl} />
                                  <AvatarFallback className='text-xs bg-gray-300'>
                                    {attendee.displayName?.[0] || '?'}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            {event.attendees.length > 5 && (
                              <div className='h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 border-2 border-white'>
                                +{event.attendees.length - 5}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='md:w-32 md:h-32 h-24 flex-shrink-0 self-center md:self-auto rounded-md overflow-hidden'>
                      <img
                        src='./images/1.jpg'
                        alt={event.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
