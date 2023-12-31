import useFetch from "./useFetch";
import { Link } from "react-router-dom";

import { getPriorityColor } from "./Priority"

const TodoList = () => {

    const { data: tasks, isPending, error, setData: setTasks } = useFetch('http://localhost:3030/tasks');

    const handleClick = async (id) => {
        try {
            await fetch('http://localhost:3030/tasks/' + id, {
                method: 'DELETE'
            });

            // Update the task list by refetching the data
            const updatedTasks = await fetch('http://localhost:3030/tasks').then(response => response.json());
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCheckboxChange = (id, e) => {
        e.preventDefault();
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );

        fetch('http://localhost:3030/tasks/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTasks.find(task => task.id === id))
        }).then(() => {
            console.log('Task checked as: ' + !updatedTasks.find(task => task.id === id).isComplete);
            setTasks(updatedTasks);
        });
    }

    // Function to sort tasks by priority
    const sortByPriority = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
        // You can customize the sorting logic based on priority levels
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        setTasks(sortedTasks);
    };

    return (
        <div className="TodoList">
            <h2>List of Tasks</h2>
            <button onClick={() => sortByPriority()} style={{
                            color: 'white',
                            backgroundColor: '#f1356d',
                            borderRadius: '4px',
                        }}>Sort by priority</button>
            {tasks && tasks.map((task) => (
                <div className="Todo-preview" key={task.id}>
                    <div className="task-info" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="title">
                            <h3>{task.id}. {task.name}</h3>
                        </div>
                        <div className="priority-label" style={{ backgroundColor: getPriorityColor(task.priority) }}>{task.priority}</div>
                    </div>
                    <p>{task.description}</p>
                    <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={(e) => handleCheckboxChange(task.id, e)}
                    />
                    <div className="edit-button">
                        <Link to={`/edit/${task.id}`}>
                            <button style={{
                                color: 'white',
                                backgroundColor: '#f1356d',
                                borderRadius: '4px',
                            }}>Edit</button>
                        </Link>
                        <button onClick={() => handleClick(task.id)} style={{
                            color: 'white',
                            backgroundColor: '#f1356d',
                            borderRadius: '4px',
                        }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;