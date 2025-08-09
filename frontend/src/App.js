import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Lấy todo từ server
  useEffect(() => {
    axios.get('http://localhost:3000/todos')
      .then(res => setTodos(res.data));
  }, []);

  // Thêm todo
  const addTodo = () => {
    if (!text.trim()) return;
    axios.post('http://localhost:3000/todos', { text })
      .then(res => setTodos([...todos, res.data]));
    setText('');
  };

  // Xóa todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)));
  };

  // Đánh dấu hoàn thành
  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:3000/todos/${id}`, { completed: !completed })
      .then(res => {
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 To-Do List</h1>
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Nhập công việc..."
      />
      <button onClick={addTodo}>Thêm</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span 
              onClick={() => toggleComplete(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? '' : '' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
