import { z } from 'zod';
export const categories = [
  'music',
  'art',
  'food',
  'drinks',
  'travel',
  'culture',
] as const;

const requiredString = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} is required.`,
    })
    .min(1, {
      message: `${fieldName} is required.`,
    });
export const createEventFormSchema = z.object({
  title: requiredString('Title').max(100),
  description: requiredString('Description').max(500),
  category: z.enum(['', ...categories] as const).optional(),
  date: z.date(),
  city: z.string().optional(),
  venue: requiredString('Venue').max(100),
  location: requiredString('Location'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type Category = (typeof categories)[number];
