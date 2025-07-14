import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password is required'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
