import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentUser } from '@/api/apiAuth';
import { useUpdateUserProfile } from '@/api/apiProfiles';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { ProfilePhotoUpload } from '../ProfilePhotoUpload';
import {
  profileUpdateFormSchema,
  type ProfileUpdateFormSchema,
} from './schema';
import { Button } from '@/components/ui/button';
export const UpdateProfileForm = () => {
  const { currentUser } = useCurrentUser();
  const { updateUserProfile, isPending } = useUpdateUserProfile();

  const form = useForm<ProfileUpdateFormSchema>({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      imageUrl: currentUser?.imageUrl || '',
      bio: currentUser?.bio || '',
    },
  });

  const onSubmit = async (data: ProfileUpdateFormSchema) => {
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
  );
};
