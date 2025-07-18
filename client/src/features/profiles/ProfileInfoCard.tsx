import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';
import { useProfileDetails } from './useProfileDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalize } from '@/lib/utils';

export const ProfileInfoCard = () => {
  const { userProfile, isLoading } = useProfileDetails();

  if (isLoading) {
    return ProfileInfoCard.Skeleton();
  }

  return (
    <div className='flex gap-8'>
      <div>
        <Avatar className='size-28'>
          <AvatarImage
            src={userProfile?.imageUrl || '/avatar_fallback.png'}
            alt={`Profile picture of user ${userProfile?.displayName}`}
          />
          <AvatarFallback className='text-lg'>
            {capitalize(userProfile?.displayName ?? 'User')}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className='flex flex-col items-star space-y-2'>
        <h1 className='text-2xl font-bold'>{userProfile?.displayName}</h1>
        {userProfile?.bio && <p>{userProfile.bio}</p>}
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <CalendarDays size={16} /> Joined November 2024
        </div>

        <div className='text-sm text-muted-foreground'>3 Hosted 1 Attended</div>
      </div>
    </div>
  );
};

ProfileInfoCard.Skeleton = () => {
  return (
    <div className='flex gap-8'>
      <div>
        <Skeleton className='size-28 rounded-full' />
      </div>

      <div className='flex flex-col items-start space-y-2 w-full'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-5 w-36' />
      </div>
    </div>
  );
};
