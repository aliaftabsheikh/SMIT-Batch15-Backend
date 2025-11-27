import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                'w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all text-gray-700 placeholder-gray-400',
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'Input';
