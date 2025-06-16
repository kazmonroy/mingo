import { z } from 'zod';

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
  category: requiredString('Category').max(50),
  date: z.date(),
  city: requiredString('City').max(50),
  venue: requiredString('Venue').max(100),
});
