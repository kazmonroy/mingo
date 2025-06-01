import type { Event } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
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
const getEvents = async () => {
  const response = await agent.get<Event[]>('/events');
  const { data } = response;

  return data;
};
