import type { Event, PagedList } from '@/lib/types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import agent from './agent';
import { useCurrentUser } from './apiAuth';
import { transformShortVenue } from '@/lib/utils';

export const useEvents = () => {
  const { currentUser } = useCurrentUser();
  const {
    data: eventsGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Event, string>>({
    queryKey: ['events'],
    queryFn: async ({ pageParam = null }: { pageParam?: unknown }) =>
      getEvents(pageParam as string | null),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    enabled: !!currentUser,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((event) => {
          return {
            ...event,
            isHost: currentUser?.id === event.hostId,
            isGoing: event.attendees?.some((x) => x.id === currentUser?.id),
            venue: transformShortVenue(event.venue) ?? 'Unknown Venue',
          };
        }),
      })),
    }),
  });

  return {
    eventsGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};

export const useEventDetails = (id: string) => {
  const { currentUser } = useCurrentUser();
  const { data: event, isLoading } = useQuery({
    queryKey: ['events', id],
    queryFn: () => getEventById(id),
    enabled: !!id && !!currentUser,
    select: (data) => {
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees?.some((x) => x.id === currentUser?.id),
      };
    },
  });

  return {
    event,
    isLoading,
  };
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateEvent, isPending } = useMutation({
    mutationFn: updateEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    updateEvent,
    isPending,
  };
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createEvent, isPending } = useMutation({
    mutationFn: createEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    createEvent,
    isPending,
  };
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteEvent, isPending } = useMutation({
    mutationFn: deleteEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    deleteEvent,
    isPending,
  };
};

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  const { mutateAsync: updateAttendance, isPending: isPendingAttendance } =
    useMutation({
      mutationFn: (eventId: string) => updateAttendanceApi(eventId),
      onMutate: async (eventId: string) => {
        const queries = ['events', eventId];
        await queryClient.cancelQueries({ queryKey: queries });
        const preEvent = queryClient.getQueryData<Event | undefined>(queries);
        queryClient.setQueryData<Event | undefined>(queries, (oldEvent) => {
          if (!oldEvent || !currentUser) {
            return oldEvent;
          }

          const isHost = oldEvent.hostId === currentUser.id;
          const isGoing = oldEvent.attendees?.some(
            (x) => x.id === currentUser.id
          );

          return {
            ...oldEvent,
            isCancelled: isHost ? !oldEvent.isCancelled : oldEvent.isCancelled,
            attendees: isGoing
              ? isHost
                ? oldEvent.attendees
                : oldEvent.attendees?.filter((x) => x.id !== currentUser.id)
              : [
                  ...(oldEvent.attendees || []),
                  {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    imageUrl: currentUser.imageUrl,
                  },
                ],
          };
        });

        return { preEvent };
      },
      onError: (error, eventId, context) => {
        console.error('Error updating attendance:', error);
        if (context?.preEvent) {
          queryClient.setQueryData<Event | undefined>(
            ['events', eventId],
            context.preEvent
          );
        }
      },
    });

  return {
    updateAttendance,
    isPendingAttendance,
  };
};

const deleteEventApi = async (id: string) => {
  const response = await agent.delete(`/events/${id}`);
  const { data } = response;
  return data;
};

const createEventApi = async (event: Event) => {
  const response = await agent.post<Event>('/events', event);
  const { data } = response;
  return data;
};

const updateEventApi = async (event: Event) => {
  const response = await agent.put<Event>(`/events`, event);
  const { data } = response;

  return data;
};

const getEvents = async (pageParam: string | null) => {
  const response = await agent.get<PagedList<Event, string>>('/events', {
    params: {
      cursor: pageParam,
      pageSize: 3,
    },
  });
  const { data } = response;

  return data;
};

const getEventById = async (id: string) => {
  const response = await agent.get<Event>(`/events/${id}`);
  const { data } = response;

  return data;
};

const updateAttendanceApi = async (id: string) => {
  return await agent.post(`/events/${id}/attend`);
};
