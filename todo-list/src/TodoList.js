import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const TodoList = () => {

    const { data: tasks, isPending, error } = useFetch('http://localhost:3030/tasks');

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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;