import React, { useState } from 'react';
import { 
    DndContext, 
    closestCenter, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors 
} from '@dnd-kit/core';
import { 
    arrayMove, 
    SortableContext, 
    sortableKeyboardCoordinates, 
    verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';
import { TodoFilter } from './TodoFilter';
import { TodoInput } from './TodoInput';

export const TodoList = ({ 
    todos, 
    onAdd, 
    onToggle, 
    onDelete, 
    onUpdate, 
    onReorder 
}) => {
    const [filter, setFilter] = useState('All');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = todos.findIndex((t) => t.id === active.id);
            const newIndex = todos.findIndex((t) => t.id === over.id);
            
            onReorder(arrayMove(todos, oldIndex, newIndex));
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Pending') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
    });

    return (
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm opacity-20"></div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-md relative z-10">Task Master</h1>
                <p className="text-indigo-100 opacity-80 relative z-10">Manage your day with style</p>
            </div>

            <div className="p-8">
                <TodoInput onAdd={onAdd} />
                <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

                <DndContext 
                    sensors={sensors} 
                    collisionDetection={closestCenter} 
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={filteredTodos.map(t => t.id)} 
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="space-y-3 min-h-[200px]">
                            <AnimatePresence mode='popLayout'>
                                {filteredTodos.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-center">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-4xl">🎉</span>
                                        </div>
                                        <p className="text-lg font-medium text-gray-500">All caught up!</p>
                                        <p className="text-sm">No tasks found in this category.</p>
                                    </div>
                                ) : (
                                    filteredTodos.map((todo) => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onToggle={onToggle}
                                            onDelete={onDelete}
                                            onUpdate={onUpdate}
                                        />
                                    ))
                                )}
                            </AnimatePresence>
                        </ul>
                    </SortableContext>
                </DndContext>
            </div>
            
            <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
                {todos.filter(t => !t.completed).length} tasks remaining
            </div>
        </div>
    );
};
