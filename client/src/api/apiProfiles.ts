import type { UserProfile } from '@/lib/types';
import agent from './agent';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = (userId: string) => {
  const { data: userProfile, isLoading } = useQuery({
    queryFn: () => getUserProfile(userId),
    queryKey: ['userProfile', userId],
    enabled: !!userId,
  });

  return {
    userProfile,
    isLoading,
  };
};

const getUserProfile = async (userId: string) => {
  const response = await agent.get<UserProfile>(`/profiles/${userId}`);
  console.log('User Profile API response:', response);
  return response.data;
};
