import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Edit2, Check, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.task);
    const inputRef = useRef(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative',
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editValue.trim() !== todo.task) {
            onUpdate(todo.id, editValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(todo.task);
            setIsEditing(false);
        }
    };

    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center justify-between p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300",
                todo.completed && "bg-gray-50/50",
                isDragging && "shadow-xl ring-2 ring-violet-500/20 rotate-2 opacity-90 z-50 scale-105"
            )}
        >
            <div className="flex items-center flex-1 gap-3 overflow-hidden">
                {/* Drag Handle */}
                <div 
                    {...attributes} 
                    {...listeners} 
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors touch-none shrink-0"
                >
                    <GripVertical size={18} />
                </div>

                {/* Checkbox */}
                <button
                    onClick={() => onToggle(todo.id, !todo.completed)}
                    className={cn(
                        "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        todo.completed 
                            ? "bg-green-500 border-green-500 scale-110" 
                            : "border-gray-300 hover:border-violet-500"
                    )}
                >
                    {todo.completed && <Check size={14} className="text-white" strokeWidth={4} />}
                </button>

                {/* Content */}
                {isEditing ? (
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleSave}
                            className="flex-1 px-2 py-1 border-b-2 border-violet-500 focus:outline-none bg-transparent text-gray-700 min-w-0"
                        />
                    </div>
                ) : (
                    <span 
                        className={cn(
                            "text-lg font-medium text-gray-700 transition-all duration-300 truncate cursor-pointer select-none flex-1",
                            todo.completed && "line-through text-gray-400 decoration-2 decoration-gray-300"
                        )}
                        onClick={() => onToggle(todo.id, !todo.completed)}
                    >
                        {todo.task}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 shrink-0">
                {!isEditing && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        disabled={todo.completed}
                        className="hover:text-violet-600 hover:bg-violet-50"
                    >
                        <Edit2 size={16} />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(todo.id)}
                    className="hover:text-red-500 hover:bg-red-50"
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </motion.li>
    );
};
