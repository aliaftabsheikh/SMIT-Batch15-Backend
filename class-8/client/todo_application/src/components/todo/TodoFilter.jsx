import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const filters = ['All', 'Pending', 'Completed'];

export const TodoFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="flex p-1 bg-gray-100/50 rounded-xl mb-6 relative border border-gray-200/50">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={cn(
                        "flex-1 relative py-2 text-sm font-medium rounded-lg transition-colors z-10",
                        currentFilter === filter ? "text-violet-700" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    {filter}
                    {currentFilter === filter && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-white rounded-lg shadow-sm border border-gray-100 z-[-1]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};
