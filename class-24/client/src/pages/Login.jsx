import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import api from '../lib/axios';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    setError('');
    try {
      await api.post('/auth/login', data);
      // In a real app, you'd dispatch user to global state here
      // dispatch(setCredentials(user))
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full">
        <h2 className="text-3xl font-bold font-display text-[var(--color-primary)] mb-2 text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Please enter your details to sign in.</p>
        
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                    {...register('email')} 
                    placeholder="name@example.com" 
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Password</label>
                    <Link to="/forgot-password" class="text-xs text-[var(--color-primary)] hover:underline">Forgot password?</Link>
                 </div>
                <Input 
                    type="password" 
                    {...register('password')} 
                    placeholder="••••••••" 
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
        </form>

        <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/signup" className="font-bold text-[var(--color-primary)] hover:underline">
                Sign up
            </Link>
        </div>
    </div>
  );
}
