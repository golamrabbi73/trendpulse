import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      if (res.data) {
        setAuth(res.data.user, res.data.tokens);
        toast.success('Successfully logged in');
        router.push('/dashboard');
      }
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to login');
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (res) => {
      if (res.data) {
        setAuth(res.data.user, res.data.tokens);
        toast.success('Successfully registered');
        router.push('/dashboard');
      }
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to register');
    },
  });
};

export const useGoogleLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.googleLogin,
    onSuccess: (res) => {
      if (res.data) {
        setAuth(res.data.user, res.data.tokens);
        toast.success('Successfully logged in with Google');
        router.push('/dashboard');
      }
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Google login failed');
    },
  });
};

export const useLogout = () => {
  const logoutState = useAuthStore((state) => state.logout);
  const tokens = useAuthStore((state) => state.tokens);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (tokens?.refreshToken) {
        await authApi.logout(tokens.refreshToken);
      }
    },
    onSettled: () => {
      logoutState();
      queryClient.clear();
      toast.success('Successfully logged out');
      router.push('/login');
    },
  });
};
