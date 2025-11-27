import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/30',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
        danger: 'bg-red-50 text-red-500 hover:bg-red-100',
        success: 'bg-green-50 text-green-600 hover:bg-green-100',
    };

    const sizes = {
        sm: 'p-1.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';
