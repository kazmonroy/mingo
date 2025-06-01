import axios from 'axios';

import type { Event } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

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
  const response = await axios.get<Event[]>(
    'https://localhost:5001/api/events'
  );
  const { data } = response;

  return data;
};
