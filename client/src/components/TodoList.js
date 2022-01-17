import axios from 'axios';
import React from 'react';

import Todo from './Todo';

const TodoList = (props) => {
    
    const setTodos = props.setTodos;
    const removeIdTodos = async (id) => {
        // const newTodos = todos.filter(todo => todo.id !== id);
        // setTodos(newTodos);
        await axios.delete(`http://localhost:8000/todos/${id}`)
        const newTodos = await axios.get("http://localhost:8000/todos")
        // console.log(newTodos);
        setTodos(newTodos.data);
    }
    const todos = props.todos;
    // console.log(todos);
    const Todos = todos.map(todo => {
        return (<Todo 
        key={todo._id}
        id = {todo._id} 
        title={todo.title} 
        details={todo.details} 
        date={todo.date} 
        removeIdTodos={removeIdTodos}/>)
    });
    return (
        <div>
            {Todos}
        </div>
    )
}

export default TodoList;