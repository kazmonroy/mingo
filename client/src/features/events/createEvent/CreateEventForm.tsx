import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { capitalize, cn } from '@/lib/utils';
import type { Event, LocationIQSuggestion } from '@/lib/types';

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
import { CalendarIcon, Check, Loader2Icon, MapPin } from 'lucide-react';
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
import { useState } from 'react';
import { MapComponent } from '@/components/MapComponent';

export const CreateEventForm = () => {
  const { createEvent, isPending } = useCreateEvent();
  const { suggestions, debouncedFetch, locationSelected, setLocationSelected } =
    useDebouncedLocationSuggestions(500);

  const [locationLat, setLocationLat] = useState<null | number>(null);
  const [locationLong, setLocationLong] = useState<null | number>(null);
  const [openSuggestion, setOpenSuggestion] = useState(false);

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

  // TODO: FIX COMPONENT STYLE

  const getSelectedLocationDetails = (
    suggestions: LocationIQSuggestion[],
    fieldValue: string
  ) => {
    const locationName = suggestions?.find(
      (location) => location.display_place === fieldValue
    )?.display_place;

    const locationAddress = suggestions?.find(
      (location) => location.display_place === fieldValue
    )?.display_address;
    console.log('locationName:', locationName);
    console.log('locationAddress:', locationAddress);

    return (
      <div className='w-full flex flex-col items-start overflow-hidden'>
        <p>{locationName}</p>
        <span className='text-muted-foreground text-xs overflow-ellipsis'>
          {locationAddress}
        </span>
      </div>
    );
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

          <div className='flex flex-col'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover
                    open={openSuggestion}
                    onOpenChange={setOpenSuggestion}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'h-full flex justify-between items-start',
                            !field.value ||
                              (!locationSelected && 'text-muted-foreground')
                          )}
                        >
                          {locationSelected ? (
                            <>
                              {getSelectedLocationDetails(
                                suggestions,
                                field.value
                              )}
                            </>
                          ) : (
                            <div className='flex flex-col items-start'>
                              <p>Add event location</p>
                              <span className='text-xs text-muted-foreground'>
                                Offline location or virtual link
                              </span>
                            </div>
                          )}

                          <MapPin className='size-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0 z-[9000]'>
                      <Command className='w-[24rem] z-[9000]'>
                        <CommandInput
                          placeholder='Enter location'
                          className='h-9'
                          onValueChange={async (value: string) => {
                            field.onChange(value);
                            debouncedFetch(value);
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No recently used locations.
                          </CommandEmpty>
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
                                    form.setValue(
                                      'venue',
                                      location.display_name
                                    );

                                    const lat = +location.lat;
                                    const lon = +location.lon;

                                    form.setValue('latitude', lat);
                                    form.setValue('longitude', lon);

                                    setLocationLat(lat);
                                    setLocationLong(lon);

                                    setLocationSelected(true);
                                    setOpenSuggestion(false);
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

            {locationLat && locationLong && (
              <div className='rounded-md mt-4 overflow-hidden'>
                <MapComponent
                  key={`${locationLat}-${locationLong}`}
                  latitude={locationLat ?? 0}
                  longitude={locationLong ?? 0}
                />
              </div>
            )}
          </div>

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
