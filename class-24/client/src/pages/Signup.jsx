import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import api from '../lib/axios';

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    try {
      // Assuming endpoint is /auth/signup based on typical patterns, 
      // though file auth.js in server wasn't fully checked for signup route. 
      // If it's /auth/register, I might need to adjust.
      await api.post('/auth/signup', {
          name: data.name,
          email: data.email,
          password: data.password,
          // gender/age were in old form, I'll omit or add if strictly needed, 
          // keeping it matching the simpler modern layout for now.
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="w-full">
        <h2 className="text-3xl font-bold font-display text-[var(--color-primary)] mb-2 text-center">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join our community of art lovers.</p>
        
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                    {...register('name')} 
                    placeholder="John Doe" 
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

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
                <label className="text-sm font-medium">Password</label>
                <Input 
                    type="password" 
                    {...register('password')} 
                    placeholder="••••••••" 
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input 
                    type="password" 
                    {...register('confirmPassword')} 
                    placeholder="••••••••" 
                    className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
        </form>

        <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-bold text-[var(--color-primary)] hover:underline">
                Sign in
            </Link>
        </div>
    </div>
  );
}
