import type { LoginFormSchema } from '@/features/auth/login/schema';
import agent from './agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CurrentUser } from '@/lib/types';
import type { SignUpFormSchema } from '@/features/auth/signUp/schema';

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

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      await queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
  return {
    logout,
    isPending,
  };
};
export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const { data: currentUser, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['currentUser'],
    enabled: !queryClient.getQueryData(['currentUser']),
  });

  const isAuthenticated = !!currentUser;

  return {
    currentUser,
    isLoading,
    isAuthenticated,
  };
};

export const useSignUp = () => {
  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: signUpApi,

    onError: (error) => {
      console.error('Sign up failed:', error);
    },
  });
  return {
    signUp,
    isPending,
  };
};

const loginApi = async (creds: LoginFormSchema) => {
  return await agent.post<LoginFormSchema>('/login?useCookies=true', creds);
};

const logoutApi = async () => {
  return await agent.post('/account/logout');
};

const getCurrentUser = async () => {
  const response = await agent.get<CurrentUser>('/account/user-info');
  console.log('Current user API response:', response);
  return response.data;
};

const signUpApi = async (creds: SignUpFormSchema) => {
  return await agent.post<SignUpFormSchema>('/account/sign-up', creds);
};
