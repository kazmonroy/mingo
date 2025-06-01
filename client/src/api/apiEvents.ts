import type { Event } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from './agent';

export const useEvents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const events = data ?? [];

  return {
    events,
    isLoading,
  };
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { mutate: updateEvent, isPending } = useMutation({
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
