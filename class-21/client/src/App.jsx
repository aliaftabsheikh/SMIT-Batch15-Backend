import { useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { addTodo, deleteTodo } from './features/todoSlice'
import { useGetProductsQuery } from './services/product'

function App() {

  const {data} = useGetProductsQuery()

  console.log("Products Data:", data);

  const [newTodo, setNewTodo] = useState("")

  const state = useSelector((state)=> state.todos.todos)
  const dispatch = useDispatch()

  function handleAddTodo(){
    dispatch(addTodo({
      text: newTodo,
      completed: false,
    }))
  }

  function handleDeleteTodo(id){
    dispatch(deleteTodo({
      id,
    }))
  }

  console.log("Current State:", state);

  return (
    <>

     {/* <div className='mt-8 max-w-lg w-full'>
   
      </div> */}

      {/* ----- */}
  <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10  px-4 sm:px-6 lg:px-8'>
    <div className='w-full max-w-lg bg-white shadow-xl rounded-lg p-6'>
    <h1 className='text-3xl font-bold text-gray-800 text-center mb-6'>Todo App</h1>
    
    {/* Input Area could go here */}

     <div className='flex items-center space-x-2 my-8'>
      <input
      type="text"
      placeholder="Enter a new task..."
      className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
      value={newTodo}
      onChange={(e)=> setNewTodo(e.target.value)}
      />
      <button
      onClick={handleAddTodo}
      className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
      >
      Add
      </button>
    </div>

    <div className='space-y-4'>
      {state.map((todo) => (
      <div key={todo.id} className='flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
        <h3 className='text-lg font-medium text-gray-700 break-all'>{todo.text}</h3>
        <div className='flex space-x-2'>
        <button 
          className='px-3 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out'
        >
          Edit
        </button>
        <button 
        onClick={() => handleDeleteTodo(todo.id)}
          className='px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-150 ease-in-out'
        >
          Delete
        </button>
        </div>
      </div>
      ))}
    </div>
    
    {state.length === 0 && (
      <p className='text-center text-gray-500 mt-6'>No tasks yet. Add a new task to get started!</p>
    )}
    </div>
  </div>
 
      </>
  )
}

export default App
