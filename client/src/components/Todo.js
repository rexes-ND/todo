import React from 'react';

const Todo = (props) => {
    // console.log(props.id);
    const handleClick = () => {
        props.removeIdTodos(props.id);   
    }
    return (
        <div>
            <button onClick={handleClick}>Remove</button>
            <div>{props.title}</div>
            <div>{props.details}</div>
            <div>{props.date}</div>
        </div>
    )
}

export default Todo