import type { LoginFormSchema } from '@/features/auth/Login/schema';
import agent from './agent';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Handle successful login, e.g., store user data, redirect, etc.
      console.log('Login successful:', data);
    },
    onError: (error) => {
      // Handle login error, e.g., show error message
      console.error('Login failed:', error);
    },
  });

  return {
    login,
    isPending,
  };
};

const loginApi = async (creds: LoginFormSchema) => {
  const response = await agent.post<LoginFormSchema>(
    '/login?useCookies=true',
    creds
  );

  console.log('Login API response:', response);
  const { data } = response;

  return data;
};
