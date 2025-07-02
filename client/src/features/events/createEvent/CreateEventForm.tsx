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
import { CalendarIcon, Check, ChevronsUpDown, Loader2Icon } from 'lucide-react';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { useDebouncedLocationSuggestions } from './useDebouncedLocationSuggestions';

export const CreateEventForm = () => {
  const { createEvent, isPending } = useCreateEvent();
  const { suggestions, debouncedFetch, locationSelected, setLocationSelected } =
    useDebouncedLocationSuggestions(500);

  const form = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      date: new Date(),
      city: '',
      venue: '',
      location: '',
    },
  });

  const onSubmit = (event: z.infer<typeof createEventFormSchema>) => {
    const newEvent: Event = {
      title: event.title,
      description: event.description ?? '',
      date: event.date.toISOString(),
      category: event.category ?? '',
      city: event.city ?? '',
      venue: event.venue ?? '',
      latitude: event.latitude,
      longitude: event.longitude,
    };

    createEvent(newEvent, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  console.log('Form state:', form.formState.errors);

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
            name='location'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
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
                              (location) =>
                                location.display_place === field.value
                            )?.display_place
                          : 'Add Event Location'}
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
