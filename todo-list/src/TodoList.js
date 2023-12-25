import useFetch from "./useFetch";
import { Link } from "react-router-dom";

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

    return (
        <div className="TodoList">
            <h2>List of Tasks</h2>
            {tasks && tasks.map((task) => (
                <div className="Todo-preview" key={task.id}>
                    <h3>{task.id}. {task.name}</h3>
                    <p>{task.description}</p>
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