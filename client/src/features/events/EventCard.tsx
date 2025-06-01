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
export const EventCard = ({ event }: { event: Event }) => {
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
          <div>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon'>
                <ChevronsRight size='w-5 h-5' />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className='mx-auto my-8'>
          <div className='size-72 rounded-md overflow-hidden'>
            <img src='./images/1.jpg' alt='' />
          </div>
        </div>
        <div className='p-4 pt-0'>
          <DrawerTitle className='text-2xl'>{event.title}</DrawerTitle>
          <DrawerDescription>{event.description}</DrawerDescription>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
