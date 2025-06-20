import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { capitalize, cn } from '@/lib/utils';
import type { Event } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useCreateEvent } from '@/api/apiEvents';
import { categories, createEventFormSchema } from './schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CreateEventForm = () => {
  const { createEvent, isPending } = useCreateEvent();
  const form = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      date: new Date(),
      city: '',
      venue: '',
    },
  });

  const onSubmit = (values: z.infer<typeof createEventFormSchema>) => {
    const newEvent: Event = {
      title: values.title,
      description: values.description ?? '',
      date: values.date.toISOString(),
      category: values.category ?? '',
      city: values.city ?? '',
      venue: values.venue ?? '',
    };
    console.log('Creating event:', newEvent);

    createEvent(newEvent, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-start'
      >
        <div className='h-80 bg-zinc-100 rounded-md'></div>

        <div className='grid grid-cols-1 gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    style={{ fontSize: '3rem' }}
                    placeholder='New Event'
                    {...field}
                    className='focus:border-none focus:outline-none focus-visible:ring-0 p-0 border-none resize-none leading-[1.1] shadow-none h-14 placeholder:text-5xl placeholder:text-muted-foreground/50 hover:placeholder:text-muted-foreground/80 transition-colors'
                  />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {capitalize(c)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
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
                      disabled={{ before: new Date() }}
                      selected={field.value}
                      onSelect={field.onChange}
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
                Creating event
              </>
            ) : (
              <span>Create event</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
