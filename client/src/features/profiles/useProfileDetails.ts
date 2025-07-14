import { useParams } from 'react-router';
import { useUserProfile } from '@/api/apiProfiles';

type UserParams = {
  userId: string;
};

export const useProfileDetails = () => {
  const { userId } = useParams<UserParams>();
  const { userProfile, isLoading } = useUserProfile(userId ?? '');

  return {
    userProfile,
    isLoading,
    userId,
  };
};
