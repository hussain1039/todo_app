import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { MdEdit, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showDisTodo, setShowDisTodo] = useState(true);

  // Local storage
  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
    setTodo('');
    saveTodos()
    // console.log(todos);
  }
  const handleEdit = (id) => {
    let t = todos.filter((val) => {
      return val.id === id;
    })
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveTodos()
  }
  const handleDelete = (id) => {
    let result = confirm(`Are you sure you want to delete todo ?`);
    if (result) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      })
      setTodos(newTodos);
    }
    saveTodos()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodos()
    // console.log(newTodos)
  }

  // ShowDisTodo Handler
  const handleShowDisTodo = () => {
    setShowDisTodo(!showDisTodo);
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">

        {/* Heading + Input Field */}
        <div className="mt-8 text-center">
          <h1 className='text-[26px] sm:text-3xl font-bold text-cyan-950 uppercase'>React Todo App</h1>
          <div className='mt-8 flex gap-4 justify-center'>
            <input
              type="text"
              placeholder='Enter Your Task'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className='py-2 px-3 w-full sm:w-[60%] lg:w-[40%] rounded border-b-2 border-gray-100 focus:outline-none focus:border-blue-500 text-slate-400'
            />
            <button
              disabled={todo.length <= 3}
              className='bg-cyan-950 hover:bg-cyan-900 text-white rounded font-semibold py-2 px-4 disabled:bg-cyan-800 transition-all'
              onClick={handleAdd}
            >ADD</button>
          </div>
        </div>

        {/* Todos Data */}
        <div className="todos mt-10 sm:mt-16 sm:max-w-[71%] lg:max-w-[47%] mx-auto">
          <button 
          className='text-white py-2 px-6 rounded bg-cyan-800 hover:bg-cyan-950 transition-all mb-8'
          onClick={handleShowDisTodo}
          >Finished Tasks</button>
          {todos.length === 0 && <div className='text-center text-[18px] sm:text-xl text-gray-500'>Your current todo list is empty...</div>}
          {
            todos.map((item, i) => {
              return (showDisTodo || !item.isCompleted) && <div key={i} className="todo flex justify-between items-center border-b-2 border-gray-100 py-2">
              <div className="text flex gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  name={item.id}
                  checked={item.isCompleted}
                />
                <p className={item.isCompleted ? 'line-through text-slate-500' : ''}>{item.todo}</p>
              </div>
              <div className="btn flex gap-3">
                <button
                  className='bg-yellow-500 text-white font-bold text-[19px] rounded p-2 hover:bg-yellow-600'
                  onClick={() => handleEdit(item.id)}
                ><MdEdit /></button>
                <button
                  className='bg-red-500 text-white font-bold text-[19px] rounded p-2 hover:bg-red-600'
                  onClick={() => handleDelete(item.id)}
                ><MdDelete /></button>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App

