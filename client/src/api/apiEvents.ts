import type { Event } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from './agent';
import { useCurrentUser } from './apiAuth';

export const useEvents = () => {
  const { currentUser } = useCurrentUser();
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    enabled: !!currentUser,
    select: (data) => {
      return data.map((e) => {
        return {
          ...e,
          isHost: currentUser?.id === e.hostId,
          isGoing: e.attendees?.some((x) => x.id === currentUser?.id),
        };
      });
    },
  });

  const events = data ?? [];

  return {
    events,
    isLoading,
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

const getEvents = async () => {
  const response = await agent.get<Event[]>('/events');
  const { data } = response;

  return data;
};

const getEventById = async (id: string) => {
  const response = await agent.get<Event>(`/events/${id}`);
  const { data } = response;

  return data;
};
