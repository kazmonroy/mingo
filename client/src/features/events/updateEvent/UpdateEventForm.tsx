import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
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
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2Icon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import type { Event } from '@/lib/types';
import { useUpdateEvent } from '@/api/apiEvents';

const editEventFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(500).optional(),
  category: z.string().min(2).max(50).optional(),
  date: z.date(),
  city: z.string().min(2).max(50).optional(),
  venue: z.string().min(2).max(100).optional(),
});
export const UpdateEventForm = ({ event }: { event: Event }) => {
  const { updateEvent, isPending } = useUpdateEvent();
  const form = useForm<z.infer<typeof editEventFormSchema>>({
    resolver: zodResolver(editEventFormSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      category: event.category,
      date: new Date(event.date),
      city: event.city,
      venue: event.venue,
    },
  });

  const onSubmit = (values: z.infer<typeof editEventFormSchema>) => {
    const updatedEvent: Event = {
      id: event.id,
      title: values.title,
      description: values.description ?? '',
      date: values.date.toISOString(),
      category: values.category ?? '',
      city: values.city ?? '',
      venue: values.venue ?? '',
    };

    updateEvent(updatedEvent);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='my-8'>
          <div className='size-72 rounded-md overflow-hidden mx-auto'>
            <img src='./images/1.jpg' alt='' />
          </div>
        </div>

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Event title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Description' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder='Category' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={() =>
                      field.value > new Date() ||
                      field.value < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='City' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='venue'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input placeholder='Venue' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          {isPending ? (
            <>
              <Loader2Icon className='animate-spin' />
              Updating...
            </>
          ) : (
            <span>Update event</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
