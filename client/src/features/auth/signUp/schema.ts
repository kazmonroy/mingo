import { z } from 'zod';
import { requiredString } from '@/features/events/createEvent/schema';

export const signUpFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  displayName: requiredString('Name'),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
