import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const TodoInput = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onAdd(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="relative mb-8 group">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What needs to be done?"
                className="pr-16 py-4 text-lg shadow-inner bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
            />
            <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-2 bottom-2 w-12 h-auto rounded-lg shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
            >
                <Plus size={24} strokeWidth={3} />
            </Button>
        </form>
    );
};
