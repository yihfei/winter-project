import useFetch from "./useFetch";

const TodoList  = () => {

    const {data : tasks, isPending, error} = useFetch('http://localhost:3030/tasks');

    return ( 
        <div className="TodoList">
            <h2>List of Tasks</h2>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    <h3>{task.id}. {task.name}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
     );
}
 
export default TodoList;