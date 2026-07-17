'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '../schemas/auth.schema';
import { useRegister } from '../hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GoogleLoginButton } from './GoogleLoginButton';

export function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegister();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none">Name</label>
          <Input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            error={!!errors.name}
            disabled={isPending}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
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
            placeholder="Create a password (min 6 chars)"
            {...register('password')}
            error={!!errors.password}
            disabled={isPending}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create account'}
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

      <GoogleLoginButton />
    </div>
  );
}
