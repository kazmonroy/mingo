import { Separator } from '@/components/ui/separator';
import { ProfileInfoCard } from './ProfileInfoCard';

export const ProfilePage = () => {
  return (
    <div className='container w-full max-w-2xl mx-auto'>
      <div className='mt-12 space-y-8'>
        <ProfileInfoCard />

        <Separator />
      </div>
    </div>
  );
};
