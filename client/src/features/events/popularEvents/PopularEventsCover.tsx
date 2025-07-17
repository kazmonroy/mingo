import { Button } from '@/components/ui/button';
import { FerrisWheel } from 'lucide-react';

export const PopularEventsCover = () => {
  return (
    <div className='relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl'>
      {/* Background Image with Gradient Overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center z-0'
        // style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent'></div>
      </div>

      {/* Content Container */}
      <div className='relative z-10 h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 max-w-[600px]'>
        {/* Icon */}
        {/* Default icon if none provided */}
        <div className='mb-6 p-4 bg-white/10 rounded-full w-16 h-16 flex items-center justify-center text-white'>
          <FerrisWheel />
        </div>
        {/* Subtitle */}
        <div className='text-white/90 text-xl font-light mb-1'>
          Popular Events
        </div>
        {/* Location */}
        <h1 className='text-white text-4l md:text-5xl font-bold mb-4'>
          Location
        </h1>

        {/* Description */}
        <p className='text-white mb-8 leading-snug'>
          decription Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Veniam minus, nulla maiores numquam perspiciatis doloremque id!
          Dignissimos voluptate hic nostrum.
        </p>
        {/* Subscribe Button */}
        <div>
          <Button className='bg-white hover:bg-white/90 text-black rounded-full px-8 py-2 h-auto font-medium'>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};
