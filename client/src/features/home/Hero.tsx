import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <main className='relative'>
      <div className='absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset bg-linear-115 from-[#fff1be] from-28% via-[#FF5976] via-70% to-[#FF6D4B] sm:bg-linear-145'></div>
      <div className='relative px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-7xl'>
          <div className='pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48'>
            <h1 className='font-display text-6xl/[0.9] max-w-lg font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-8xl/[0.8]'>
              Awesome events start here.
            </h1>

            <p className='mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              odit.
            </p>

            <div className='mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row'>
              <Button className='w-full sm:w-auto text-md' size='lg'>
                Create your first event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
