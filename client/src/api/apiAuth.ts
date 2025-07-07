import type { LoginFormSchema } from '@/features/auth/Login/schema';
import agent from './agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CurrentUser } from '@/lib/types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      console.log('Login successful:', data);

      await queryClient.invalidateQueries({
        queryKey: ['currentUser'],
      });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return {
    login,
    isPending,
  };
};

export const useCurrentUser = () => {
  const { data: currentUser, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['currentUser'],
  });

  const isAuthenticated = !!currentUser;

  return {
    currentUser,
    isLoading,
    isAuthenticated,
  };
};

const loginApi = async (creds: LoginFormSchema) => {
  return await agent.post<LoginFormSchema>('/login?useCookies=true', creds);
};

const getCurrentUser = async () => {
  const response = await agent.get<CurrentUser>('/account/user-info');
  console.log('Current user API response:', response);
  return response.data;
};
