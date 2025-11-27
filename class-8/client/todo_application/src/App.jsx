import React from 'react';
import { Toaster } from 'react-hot-toast';
import { TodoList } from './components/todo/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    updateTodoTask, 
    reorderTodos 
  } = useTodos();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100 py-10 px-4 flex justify-center items-start font-sans text-slate-900">
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-white text-slate-900 shadow-xl rounded-xl border border-slate-100',
        duration: 3000,
      }} />
      
      <TodoList 
        todos={todos}
        onAdd={addTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodoTask}
        onReorder={reorderTodos}
      />
    </div>
  );
}

export default App

