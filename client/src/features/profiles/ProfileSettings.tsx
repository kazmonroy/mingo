import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/api/apiAuth';
import { ProfilePhotoUpload } from './ProfilePhotoUpload';
import { useUpdateUserProfile } from '@/api/apiProfiles';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

const profileUpdateFormSchema = z.object({
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

export const ProfileSettings = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { updateUserProfile, isPending } = useUpdateUserProfile();

  const form = useForm<z.infer<typeof profileUpdateFormSchema>>({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      imageUrl: currentUser?.imageUrl || '',
      bio: currentUser?.bio || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof profileUpdateFormSchema>) => {
    console.log('FORM UPDATED!', data);
    console.log(
      'Current user before update:',
      queryClient.getQueryData(['currentUser'])
    );

    if (data) {
      try {
        await updateUserProfile(data);
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  return (
    <div className='w-full'>
      <div className='mt-4'>
        <h1 className='font-display text-3xl font-medium tracking-tighter sm:text-3xl'>
          Settings
        </h1>
        <p className='mt-2 font-display tracking-tight text-muted-foreground'>
          Choose how you are displayed as a host or guest.
        </p>
      </div>

      <div className='mt-8'>
        <div>
          <h2 className='text-xl font-semibold'>Your profile</h2>
          <p className='mt-1 font-display tracking-tight text-muted-foreground'>
            Choose how you are displayed as a host or guest.
          </p>
        </div>

        <section className='mt-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='displayName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type='email' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Share a bit about yourself and your interests'
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='space-y-8'>
                  <FormField
                    control={form.control}
                    name='imageUrl'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <div className='flex'>
                          <ProfilePhotoUpload
                            value={field.value}
                            onChange={field.onChange}
                            displayName={form.watch('displayName')}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type='submit'>
                {isPending && <Loader2Icon className='animate-spin' />}
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};
