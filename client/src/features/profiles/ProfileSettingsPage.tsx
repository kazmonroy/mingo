import { UpdateProfileForm } from './updateProfile/UpdateProfileForm';

export const ProfileSettingsPage = () => {
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
          <UpdateProfileForm />
        </section>
      </div>
    </div>
  );
};
