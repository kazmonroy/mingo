import type { CurrentUser, Photo, UserProfile } from '@/lib/types';
import agent from './agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateUserProfile, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: ['currentUser'] });

      const previousUser = queryClient.getQueryData<CurrentUser>([
        'currentUser',
      ]);

      queryClient.setQueryData<CurrentUser>(['currentUser'], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          displayName: newProfile.displayName,
          bio: newProfile.bio ?? old.bio,
        };
      });

      return { previousUser };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['currentUser'],
      });
    },
    onError: (error, _, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['currentUser'], context.previousUser);
      }
      console.error('Profile update failed:', error);
    },
  });
  return {
    updateUserProfile,
    isPending,
  };
};
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

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadProfilePhoto, isPending } = useMutation({
    mutationFn: uploadProfilePhotoApi,
    onSuccess: async (photo: Photo) => {
      queryClient.setQueryData<CurrentUser | undefined>(
        ['currentUser'],
        (oldUser) => {
          if (!oldUser) {
            return oldUser;
          }
          return {
            ...oldUser,
            imageUrl: photo.url,
          };
        }
      );

      const currentUser = queryClient.getQueryData<CurrentUser>([
        'currentUser',
      ]);

      if (currentUser?.id) {
        queryClient.setQueryData<UserProfile>(
          ['userProfile', currentUser.id],
          (oldProfile) => {
            if (!oldProfile) {
              return oldProfile;
            }
            return {
              ...oldProfile,
              imageUrl: photo.url,
            };
          }
        );
      }

      await queryClient.invalidateQueries({
        queryKey: ['userProfile', 'currentUser'],
      });
    },
    onError: (error) => {
      console.error('Profile photo upload failed:', error);
    },
  });

  return {
    uploadProfilePhoto,
    isPending,
  };
};

const uploadProfilePhotoApi = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await agent.post<Photo>('/profiles/upload-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const getUserProfile = async (userId: string) => {
  const response = await agent.get<UserProfile>(`/profiles/${userId}`);

  return response.data;
};

const updateUserProfileApi = async (userProfile: UserProfile) => {
  const response = await agent.put<UserProfile>(`/profiles`, userProfile);

  return response.data;
};
