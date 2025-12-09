const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const todos = [
{
    id: new Date().getTime(),
    task: 'Learn JavaScript',
    completed: false
},
{
    id: new Date().getTime(),
    task: 'Learn Node.js',
    completed: false
},
{
    id: new Date().getTime(),
    task: 'Learn React js',
    completed: false
},
{
    id: new Date().getTime(),
    task: 'Learn MongoDB',
    completed: false
},

]


app.get('/getTodos', (req,res)=>{
    res.json(todos)
})

app.post('/addTodo', (req,res)=>{
    const {task, completed} = req.body

    const newTodo = {
        id: new Date().getTime(),
        task,
        completed
    }

    todos.push(newTodo)

    res.json({message: 'Todo added successfully', todo: newTodo})
})


app.put('/updateTodo/:id', (req,res)=>{
const {id} = req.params;

const {task, completed} = req.body;

const todo = todos.find((item)=> item.id === parseInt(id))

if(!todo){
    res.status(404).json({message: 'Todo not found'})
}else{
    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.json({message: 'Todo updated successfully', todo})
}


})

app.delete('/deleteTodo/:id', (req,res)=>{
    const {id} = req.params;

    const index = todos.findIndex((item)=> item.id === parseInt(id))

    if(index === -1){
        res.status(404).json({message: 'Todo not found'})
    }else{
        todos.splice(index, 1);
        res.json({message: 'Todo deleted successfully'})
    }
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})