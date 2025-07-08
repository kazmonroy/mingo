import { z } from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  displayName: z.string().min(1, 'Display name is required'),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
