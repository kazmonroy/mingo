import { z } from 'zod';
export const createEventFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(500).optional(),
  category: z.string().min(2).max(50).optional(),
  date: z.date(),
  city: z.string().min(2).max(50).optional(),
  venue: z.string().min(2).max(100).optional(),
});
