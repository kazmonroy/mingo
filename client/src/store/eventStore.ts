import { create } from 'zustand';

type EventStore = {
  eventId: string | null;
  setEventId: (id: string) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  eventId: null,
  setEventId: (id: string) => set({ eventId: id }),
}));
