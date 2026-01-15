import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: [
       
    ],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers : {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                text: action.payload.text,
                completed: false,
            }

            state.todos.push(todo)
            console.log("Todo Added:", todo);
        },

        deleteTodo: (state, action)=>{
            const id= action.payload.id;

            state.todos = state.todos.filter((todo)=> todo.id !== id)

            console.log("Todo Deleted with id:", id);
        },

        editTodo: (state, action)=>{
            const {id, newText} = action.payload;

            const todo = state.todos.find((todo)=> todo.id === id);

            if(todo){
                todo.text = newText;
                console.log("Todo Edited:", todo);
            }
        }  
    }

})

export const {addTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer