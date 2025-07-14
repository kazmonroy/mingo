import z from 'zod';

export const profileUpdateFormSchema = z.object({
  displayName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  imageUrl: z.any().optional(),
  bio: z
    .string()
    .max(500, {
      message: 'Bio must be at most 500 characters.',
    })
    .optional(),
});

export type ProfileUpdateFormSchema = z.infer<typeof profileUpdateFormSchema>;
