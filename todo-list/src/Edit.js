import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Priority } from "./Priority"

const Edit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isComplete, setIsComplete] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3030/tasks/${id}`);
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setPriority(data.priority);
                setIsComplete(data.isComplete);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { name, description, priority, isComplete };

        fetch('http://localhost:3030/tasks/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            console.log('task editted');
            navigate('/');
        })
    }

    return (
        <div className="edit">
            <h2>Edit Task</h2>
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
                <select value = {priority} onChange={(e) => setPriority(e.target.value)}>
                    {Object.values(Priority).map((priority) => (
                        <option value={priority}>{priority}</option>
                    ))}
                </select>
                <button>Edit Task</button>
            </form>
        </div>
    );
}

export default Edit;