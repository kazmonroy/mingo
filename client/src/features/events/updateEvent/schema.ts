import { z } from 'zod';
import {
  categories,
  requiredString,
} from '@/features/events/createEvent/schema';
export const updateEventFormSchema = z.object({
  title: requiredString('Title').max(100),
  description: z.string().min(10).max(500).optional(),
  category: z.enum(['', ...categories] as const).optional(),
  date: z.date(),
  city: z.string().optional(),
  venue: requiredString('Venue').max(100),
  location: requiredString('Location'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});
