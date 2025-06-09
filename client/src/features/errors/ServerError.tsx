import { useLocation } from 'react-router';

export const ServerError = () => {
  const { state } = useLocation();

  return (
    <div className='mx-auto mt-4 px-4 lg:px-6 w-full md:w-fit'>
      {state?.error ? (
        <>
          <h1 className='font-display pb-4 mb-4 border-b text-3xl font-medium tracking-tighter sm:text-3xl'>
            {state?.error.message || 'There has been an error'}
          </h1>

          <p className='text-zinc-600 font-mono text-md'>
            {state?.error?.details || 'Internal server error'}
          </p>
        </>
      ) : (
        <h2 className='font-display pb-4 mb-4 border-b text-3xl font-medium tracking-tighter sm:text-3xl'>
          Server Error
        </h2>
      )}
    </div>
  );
};
