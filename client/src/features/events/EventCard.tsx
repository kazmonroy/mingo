import { useState } from 'react';
import { format } from 'date-fns';
import type { Event } from '@/lib/types';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';

import { EditEventForm } from './EditEventForm';
export const EventCard = ({ event }: { event: Event }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleOnEdit = () => setIsEditing((prev) => !prev);
  return (
    <Drawer key={event.id} direction='right'>
      <DrawerTrigger className='cursor-pointer'>
        <div className='flex items-center gap-4'>
          <div className='bg-zinc-100 size-18 rounded-md overflow-hidden'>
            <img src='./images/1.jpg' alt='' />
          </div>

          <div className='flex flex-col items-start'>
            <h2 className='font-medium'>{event.title}</h2>
            <p className='font-mono text-muted-foreground text-sm'>
              {format(event.date, 'EEE, d MMM, yyyy')}
            </p>
            <p className='text-muted-foreground'>{event.description}</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='border-b'>
          <div className='flex items-center justify-between'>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon'>
                <ChevronsRight size='w-5 h-5' />
              </Button>
            </DrawerClose>
            <Button variant='ghost' onClick={handleOnEdit}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </DrawerHeader>
        <div className='p-4 pt-0 max-h-[calc(100vh-80px)] overflow-y-auto'>
          {isEditing ? (
            <>
              <EditEventForm event={event} />
            </>
          ) : (
            <>
              <div className='my-8'>
                <div className='size-72 rounded-md overflow-hidden mx-auto'>
                  <img src='./images/1.jpg' alt='' />
                </div>
              </div>

              <DrawerTitle className='text-2xl'>{event.title}</DrawerTitle>
              <DrawerDescription>{event.description}</DrawerDescription>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
