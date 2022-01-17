import axios from 'axios';
import React, {useState} from 'react';

const TodoForm = (props) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/todos", {
            title,
            details,
            date
        });
        const newTodos = await axios.get("http://localhost:8000/todos");
        props.setTodos(newTodos.data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>details</label>
                    <input 
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>
                      
                <div>
                    <label>date</label>
                    <input 
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default TodoForm;