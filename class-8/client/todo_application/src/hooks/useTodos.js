import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3000';

export function useTodos() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(true);

    // Sync to local storage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const fetchTodos = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/getTodos`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            // Merge server data with local data if needed, or just replace.
            // For simplicity and "freshness", we'll replace, but we might lose local reordering if we aren't careful.
            // If we want to keep local order, we need a more complex merge strategy.
            // For this demo, let's assume server is truth but we want to be optimistic.
            // We will just set todos to data, but if we have pending local changes...
            // Let's just set it for now.
            setTodos(data.map(t => ({ ...t, id: String(t.id) }))); 
        } catch (error) {
            console.error(error);
            toast.error('Failed to sync with server');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = async (task) => {
        const tempId = String(Date.now());
        const newTodo = { id: tempId, task, completed: false };
        
        // Optimistic Update
        setTodos(prev => [...prev, newTodo]);

        try {
            const response = await fetch(`${API_URL}/addTodo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, completed: false })
            });
            
            if (!response.ok) throw new Error('Failed to add');
            
            const data = await response.json();
            // Replace temp ID with real ID from server (if server generated one different from ours, 
            // but here server uses Date.now() too so it might collide or be slightly different.
            // The server code uses Date.now() for ID.
            // We should update the ID in our state to match the server's ID to ensure future deletes work.
            setTodos(prev => prev.map(t => t.id === tempId ? { ...data.todo, id: String(data.todo.id) } : t));
            toast.success('Task added!');
        } catch (error) {
            setTodos(prev => prev.filter(t => t.id !== tempId));
            toast.error('Failed to add task');
        }
    };

    const toggleTodo = async (id, completed) => {
        // Optimistic
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed } : t));

        try {
            const response = await fetch(`${API_URL}/updateTodo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });
            if (!response.ok) throw new Error('Failed to update');
        } catch (error) {
            // Revert
            setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
            toast.error('Failed to update task');
        }
    };

    const deleteTodo = async (id) => {
        const prevTodos = [...todos];
        // Optimistic
        setTodos(prev => prev.filter(t => t.id !== id));

        try {
            const response = await fetch(`${API_URL}/deleteTodo/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete');
            toast.success('Task deleted');
        } catch (error) {
            setTodos(prevTodos);
            toast.error('Failed to delete task');
        }
    };

    const updateTodoTask = async (id, task) => {
        const prevTodos = [...todos];
        setTodos(prev => prev.map(t => t.id === id ? { ...t, task } : t));

        try {
            const response = await fetch(`${API_URL}/updateTodo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task })
            });
            if (!response.ok) throw new Error('Failed to update');
            toast.success('Task updated');
        } catch (error) {
            setTodos(prevTodos);
            toast.error('Failed to update task');
        }
    };

    const reorderTodos = (newTodos) => {
        setTodos(newTodos);
        // Since server doesn't support reorder, we just keep it local
    };

    return {
        todos,
        isLoading,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodoTask,
        reorderTodos
    };
}
