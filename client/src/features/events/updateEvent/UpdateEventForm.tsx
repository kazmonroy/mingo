import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { capitalize, cn, getVenue } from '@/lib/utils';

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
import { CalendarIcon, Check, ChevronsUpDown, Loader2Icon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import type { Event } from '@/lib/types';
import { useUpdateEvent } from '@/api/apiEvents';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useDebouncedLocationSuggestions } from '../createEvent/useDebouncedLocationSuggestions';
import { updateEventFormSchema } from './schema';
import {
  categories,
  type Category,
} from '@/features/events/createEvent/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const UpdateEventForm = ({ event }: { event: Event }) => {
  const { updateEvent, isPending } = useUpdateEvent();
  const { suggestions, debouncedFetch, locationSelected, setLocationSelected } =
    useDebouncedLocationSuggestions(500);
  const form = useForm<z.infer<typeof updateEventFormSchema>>({
    resolver: zodResolver(updateEventFormSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      category: (event.category as Category) ?? '',
      date: new Date(event.date),
      city: event.city,
      venue: event.venue,
      location: getVenue(event.venue),
      latitude: event.latitude ?? 0,
      longitude: event.longitude ?? 0,
    },
  });

  const onSubmit = (values: z.infer<typeof updateEventFormSchema>) => {
    const updatedEvent: Event = {
      id: event.id,
      title: values.title,
      description: values.description ?? '',
      date: values.date.toISOString(),
      category: values.category ?? '',
      city: values.city ?? '',
      venue: values.venue ?? '',
      latitude: values.latitude,
      longitude: values.longitude,
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    disabled={{ before: new Date() }}
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
          name='location'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Location</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'justify-between',
                        !field.value ||
                          (!locationSelected && 'text-muted-foreground')
                      )}
                    >
                      {locationSelected
                        ? suggestions?.find(
                            (location) => location.display_place === field.value
                          )?.display_place
                        : field.value || 'Enter location'}
                      <ChevronsUpDown className='opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command className='w-[24rem]'>
                    <CommandInput
                      placeholder='Enter location'
                      className='h-9'
                      onValueChange={async (value: string) => {
                        field.onChange(value);
                        debouncedFetch(value);
                      }}
                    />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      {suggestions && suggestions?.length > 0 && (
                        <CommandGroup>
                          {suggestions?.map((location) => (
                            <CommandItem
                              value={location.display_place}
                              key={location.place_id}
                              onSelect={() => {
                                const city =
                                  location.address?.city ||
                                  location.address?.town ||
                                  location.address?.village;
                                form.setValue(
                                  'location',
                                  location.display_place
                                );

                                form.setValue('city', city || '');
                                form.setValue('venue', location.display_name);

                                form.setValue('latitude', +location.lat);
                                form.setValue('longitude', +location.lon);
                                setLocationSelected(true);
                              }}
                            >
                              {location.display_place}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  location.display_place === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
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
