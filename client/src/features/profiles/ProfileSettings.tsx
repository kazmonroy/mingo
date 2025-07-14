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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/api/apiAuth';

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
  const { currentUser } = useCurrentUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileUpdateFormSchema>>({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      imageUrl: currentUser?.imageUrl || null,
    },
  });

  const onSubmit = (values: z.infer<typeof profileUpdateFormSchema>) => {
    console.log(values);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
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
                    render={() => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <div className='flex'>
                          <div
                            className='relative cursor-pointer'
                            onClick={handleAvatarClick}
                          >
                            <Avatar className='size-28'>
                              <AvatarImage
                                src={
                                  currentUser?.imageUrl ||
                                  './avatar_fallback.avif'
                                }
                                alt='Profile'
                              />
                              <AvatarFallback className='bg-muted'>
                                {form.watch('displayName')?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className='absolute bottom-0 right-0 border-2 bg-black hover:bg-pink-700 rounded-full p-1.5 transition-colors duration-200'>
                              <ArrowUp size={22} className='text-white' />
                            </div>
                            <input
                              type='file'
                              ref={fileInputRef}
                              className='hidden'
                              accept='image/*'
                              onChange={handleImageUpload}
                            />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};
