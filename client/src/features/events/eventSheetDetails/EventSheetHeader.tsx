export const EventSheetHeader = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section>
      <div className='border-b pb-2 mb-3 flex items-center justify-between'>
        <h2 className='text-sm font-semibold'>{title}</h2>
      </div>

      {children}
    </section>
  );
};
