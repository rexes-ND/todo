import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios';


function App() {

  // const [list, setList] = useState([{id:1, title:'title1', details:'details1', date:'date1'}, {id:2, title:'title2', details:'details2', date:'date2'}]);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/todos").then((res) =>{
      setList(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div>
      <h1>Todo app</h1>
      <TodoForm setTodos={setList}/>
      <TodoList todos={list} setTodos={setList}/>
    </div>
  );
}

export default App;
