import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { name, description };

    fetch('http://localhost:3030/tasks/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(() => {
      console.log('new task added');
      navigate('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Task description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Add Task</button>
      </form>
    </div>
  );
}
 
export default Create;