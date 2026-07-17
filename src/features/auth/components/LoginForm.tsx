'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../schemas/auth.schema';
import { useLogin } from '../hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GoogleLoginButton } from './GoogleLoginButton';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  const handleDemoLogin = () => {
    setValue('email', 'demo@trendpulse.ai');
    setValue('password', 'demo1234');
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none">Email</label>
          <Input
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            error={!!errors.email}
            disabled={isPending}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={!!errors.password}
            disabled={isPending}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleLoginButton />
        <Button variant="outline" onClick={handleDemoLogin} disabled={isPending}>
          Demo Login
        </Button>
      </div>
    </div>
  );
}
